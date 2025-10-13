import axios from 'axios'
import cheerio from 'cheerio'
import Parser from 'rss-parser'
import IWebsite from '../interfaces/IWebsite'
import IArticle,{CreateIArticleInput} from '../interfaces/IArticle'
import Website from '../models/website'
import {Article} from '../models/article'
import path from 'path';
import fs from 'fs/promises'
import { ObjectId } from 'mongodb'
import { Types } from 'mongoose'
import fetchRSS from '../util/rss.feeder'
import fetchHTML from '../util/http.feeder'

const parse = new Parser()
const fetchService = async (webInfo: IWebsite):Promise<void> => {
    try{
if(webInfo.type = "rss"){
        await fetchRSS(webInfo)
}else{
    await fetchHTML(webInfo)
}

    }catch(err){
        console.log(err)
    }
}
    



export default fetchService