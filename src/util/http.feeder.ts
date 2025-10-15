import axios from 'axios'
import  * as cheerio from 'cheerio'
import path from 'path';
import fs from 'fs/promises'
import IWebsite from '../interfaces/IWebsite';
import { CreateIArticleInput } from '../interfaces/IArticle';
import { Article } from '../models/article';
import Website from '../models/website';
import { Types } from 'mongoose';
import { fetchWithRetry } from './fetchWithRetry';
import { IArticleJob, publishArticleForProcessing } from '../services/queue.service';


async function fetchHTML(webinfo: IWebsite): Promise<void>{
  try{
    const url = webinfo.url
  const selectors = webinfo.selectors
const fetchedData  = await fetchWithRetry(url)

const $ = cheerio.load((fetchedData).toString())

 const listContainer = $(selectors.listContainer);
let links: string[] = []
  listContainer.find(selectors.listItem).each((i, el) => {
    const link: string = $(el).find(selectors.articleLink).attr('href') || '';
    links.push(link);
  });

  for (const link of links) {
     await scrapeArticle(link,webinfo._id,webinfo.category,selectors);
  };

  }
  catch(error){
console.log(error)
        await Website.updateOne({_id:webinfo._id},{last_fetched_at:new Date(), failure_count: webinfo.failure_count+1})
        throw error
  }
}

async function scrapeArticle(url: string,website_id: Types.ObjectId, category: string, selectors: any) {
  try{
  const  data  = await fetchWithRetry(url);
  const $ = cheerio.load(data);
  const image =  $(selectors.image).attr('srcset') || [""]
const article: CreateIArticleInput = {
  source_article_id: url,
   website_id: website_id,
   title : $(selectors.title).text().trim(),
   image_url :image[0] || "",
   author : $(selectors.author).text().trim(),
   content : $(selectors.content).text().trim(),
   published_at :  new Date(),
    category: category,
    raw_content: data,
         status: 'raw'
}

const result = await Article.insertOne(article)
if(result){
  const jobPayload: IArticleJob = {
          articleId: result._id.toString(),
          websiteId:  result.website_id.toString(),
      }
  await Website.updateOne({_id:website_id},{last_fetched_at: new Date(), last_successful_fetch: new Date()})
  await publishArticleForProcessing(jobPayload)
}
  }catch(error){
    console.log(error)
    throw error
  }
}

export default fetchHTML