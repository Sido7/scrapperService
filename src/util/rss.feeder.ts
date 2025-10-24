import Parser from 'rss-parser';
import IWebsite from '../interfaces/IWebsite';
import IArticle, { CreateIArticleInput } from '../interfaces/IArticle';
import {Article} from '../models/article';
import Website from '../models/website';
import { publishArticleForProcessing, IArticleJob} from '../services/queue.service';
import * as cheerio from 'cheerio';



const parser = new Parser();

function titleSanitize(title: string): string {
    return title.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase().slice(0, 50);
}

function contentSanitize(raw_content: string): string {
   const $ = cheerio.load(raw_content);
   const content = $.text().replace(/\s+/g, " ").trim();
   return content;
}

function extractImageUrls(html: string): string[] {
    const $ = cheerio.load(html);
    const imageUrls: string[] = [];
    $('img').each((index, element) => {
      const imageUrl = $(element).attr('src');
      if (imageUrl) {
        imageUrls.push(imageUrl);
      }
    });
    return imageUrls;
  }

const fetchRSS = async(webinfo: IWebsite) =>{
    const url = webinfo.url
    try{
    const fetchedData = await parser.parseURL(url)
    let article  =  fetchedData.items.slice(0,10).map((item)=> ({    //for testing just using 2 articles
       source_article_id: item?.guid || item?.link || '',
         website_id: webinfo._id,
         title: titleSanitize(item[`${webinfo.selectors?.title}`]),
        raw_content: item[`${webinfo.selectors?.raw_content}`],
         content: contentSanitize(item[`${webinfo.selectors?.raw_content}`]),
         image_url: item["media:thumbnail"]?.$?.url || item["media:content"]?.$?.url || null,
         author: item.author,
         published_at: item[`${webinfo.selectors?.pubDate}`] || new Date(),
         category: webinfo.category,
        
         status: 'raw'
    })
)
const result =await Article.insertMany(article)
if(result){
  result.forEach( async (article) => {
    const jobPayload: IArticleJob = {
        articleId: article._id.toString(),
        websiteId: article.website_id.toString(),
    }
     publishArticleForProcessing(jobPayload)
})
}


await Website.updateOne({_id:webinfo._id},{last_fetched_at: new Date(), last_successful_fetch: new Date()})

    }catch(error){
        console.log(error)
        await Website.updateOne({_id:webinfo._id},{last_fetched_at:new Date(), failure_count: webinfo.failure_count+1})
        throw error
    }
}

export default fetchRSS