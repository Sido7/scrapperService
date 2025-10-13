import express from 'express';
import { Request, Response } from 'express';
import logger from './util/logger.js';
import dotenv from 'dotenv'
import connectDb from './config/mongo.config.js';
import schedulerService from './services/scheduler.service.js';

dotenv.config()

const Port  = process.env.port || 4000
const app = express();
logger.info('Health check ok!!!', {  })

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Content Aggregation Service is running.', dbStatus: 'Pending' });
});

app.get('/health', (req, res) => {
    res.send('Hello from Aggregator Service!');
});

 function main(){
app.listen(Port, async () => {
    await connectDb()
    console.log(`⚡ Server listening on port ${Port}`);
    console.log(`Access the service at http://localhost:${Port}`);
   
    const instance  = schedulerService.getInstance()
    await instance.initJob()
   
});

}

main()