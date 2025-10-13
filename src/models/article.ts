import IArticle from "../interfaces/IArticle";
import {model, Schema, Types } from 'mongoose'

const ArticleSchema = new Schema<IArticle>({
    source_article_id: { type: String, required: true },
  website_id: { type: Schema.Types.ObjectId, ref: 'Website', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  image_url: { type: String },
  author: { type: String },
  published_at: { type: Date },
  category: { type: String, required: true },
  raw_content: { type: String, required: true },
  status: { type: String, enum: ['raw', 'processing_ai', 'processed', 'failed_to_process'], default: 'raw' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

ArticleSchema.index({ source_article_id: 1, website_id: 1 }, { unique: true });

export const Article = model<IArticle>('Article', ArticleSchema);
