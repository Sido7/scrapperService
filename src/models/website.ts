import IWebsite from "../interfaces/IWebsite";
import { Schema, model } from "mongoose";

const WebsiteSchema = new Schema<IWebsite>({
    name: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  frequency: { type: Number, required: true, default: 24 },
  selectors: { type: Schema.Types.Mixed, required: true },
  is_active: { type: Boolean, default: true },
  last_fetched_at: { type: Date, default: null },
  last_successful_fetch: { type: Date,default: null },
  failure_count: { type: Number, default: 0 },
   type: { 
    type: String, 
    enum: ["rss", "html"], // 👈 distinguish feed vs HTML 
    required: true,
    default: "rss",
  },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

 const Website = model<IWebsite>('Website', WebsiteSchema);

export default Website