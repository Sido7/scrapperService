import { Document, Types } from "mongoose";

interface IWebsite extends Document {
  _id: Types.ObjectId;
  name: string;
  url: string;
  category: string;
  frequency: number; 
  selectors: { [key: string]: string };
  is_active: boolean;
  last_fetched_at?: Date;
  last_successful_fetch?: Date;
  failure_count: number;
  type: string
}

export default IWebsite


export type WebsiteCreateInput = Omit<IWebsite, keyof Document>;
