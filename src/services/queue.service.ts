import { Queue } from 'bullmq';
import  IArticle  from '../interfaces/IArticle';
import dotenv from 'dotenv';

dotenv.config();

// Configuration for the Redis server
const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
};

// Define the name of the queue that the AI Processing Service will listen to
const AI_PROCESSING_QUEUE_NAME = 'test-queue';

// Instantiate the BullMQ Queue
const articleQueue = new Queue(AI_PROCESSING_QUEUE_NAME, { connection });

// The payload interface for the job (what data we send)
export interface IArticleJob {
    articleId: string;
    websiteId: string;
}

/**
 * Publishes a new job to the queue for the AI Processing Service.
 */
export const publishArticleForProcessing = async (article: IArticleJob): Promise<void> => {
    try {
        await articleQueue.add(
            'process-article', 
           article, 
            {
                // Options: Disable retries for the initial publish, relying on the
                // AI service's worker for retries (separation of concerns)
                attempts: 1, 
            }
        );
    } catch (error) {
        console.error('❌ Failed to publish job to queue:', error);
        // CRITICAL: You might log this to a monitoring service (like Sentry)
    }
};