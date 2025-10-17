import { Queue } from 'bullmq';
import  IArticle  from '../interfaces/IArticle';
import dotenv from 'dotenv';

dotenv.config();
const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
};


const AI_PROCESSING_QUEUE_NAME = 'test-queue';

const articleQueue = new Queue(AI_PROCESSING_QUEUE_NAME, { connection });

export interface IArticleJob {
    articleId: string;
    websiteId: string;
}

export const publishArticleForProcessing = async (article: IArticleJob): Promise<void> => {
    try {
        await articleQueue.add(
            'process-article', 
           article, 
            {
                // Options: Disable retries for the initial publish, relying on the
                // AI service's worker for retries (separation of concerns)
                 attempts: 1, // Retry up to 5 times if job fails
                backoff: {
                  type: 'exponential',
                  delay: 5000
  }
            }
        );
    } catch (error) {
        console.error('❌ Failed to publish job to queue:', error);
        // CRITICAL: You might log this to a monitoring service (like Sentry)
    }
};