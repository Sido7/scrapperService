import { Document, Schema, Types } from "mongoose";

interface IArticle extends Document{
  _id: Types.ObjectId;
  source_article_id: string;
  website_id: Types.ObjectId;
  title: string;
  content: string;
  image_url?: string;
  author?: string;
  published_at?: Date;
  category: string;
  raw_content: string;
  status: 'raw' | 'processing_ai' | 'processed' | 'failed_to_process';
}


export default IArticle

//export type createIArticleInput = Omit<IArticle, keyof Document>  //Donot use, it removes some of the necessary propeties



export type CreateIArticleInput = Pick<
  IArticle,
  | "source_article_id"
  | "website_id"
  | "title"
  | "content"
  | "image_url"
  | "author"
  | "published_at"
  | "category"
  | "raw_content"
  | "status"
>;