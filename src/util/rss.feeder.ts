import Parser from 'rss-parser';
import IWebsite from '../interfaces/IWebsite';
import IArticle, { CreateIArticleInput } from '../interfaces/IArticle';
import {Article} from '../models/article';
import Website from '../models/website';
import { publishArticleForProcessing, IArticleJob} from '../services/queue.service';



const parser = new Parser();

function titleSanitize(title: string): string {
    return title.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase().slice(0, 50);
}

const fetchRSS = async(webinfo: IWebsite) =>{
    const url = webinfo.url

    try{
    const fetchedData = await parser.parseURL(url)
    let article  =  fetchedData.items.map((item)=> ({
       source_article_id: item?.guid || item?.link || '',
         website_id: webinfo._id,
         title: titleSanitize(item[`${webinfo.selectors?.title}`]),
         content: item[`${webinfo.selectors?.content}`],
         image_url: item[`${webinfo.selectors?.image}`],
         author: item.author,
         published_at: item[`${webinfo.selectors?.pubDate}`] || new Date(),
         category: webinfo.category,
         raw_content: item[`${webinfo.selectors?.raw_content}`],
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