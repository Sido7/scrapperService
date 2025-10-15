import cron, {ScheduledTask,schedule} from 'node-cron';
import IWebsite from '../interfaces/IWebsite';
import Website  from '../models/website';
import fetchService from './fetcher.service';

class SchedulerService{
    public static instance: SchedulerService
    private ScheduledJob: Map<string, ScheduledTask> = new Map()


    public static getInstance(): SchedulerService {
        if(!SchedulerService.instance){
            SchedulerService.instance = new SchedulerService()
            return SchedulerService.instance
        }
        return SchedulerService.instance
    }

    public async initJob(): Promise<void>{
      this.endAllJob()
      const activeWebsites: IWebsite[] = await Website.find({is_active: true})
      for (const website of activeWebsites){
        await this.scheduleJob(website)
      }
      console.log(`total jobs scheduled are ${activeWebsites.length}`)
    }

   private getCronExpression(website: IWebsite): string {
          return `29 17 * * 03`//`0 */${website.frequency} * * *`
   }

    public async scheduleJob(website: IWebsite): Promise<void>{
        const jobId: string = String(website._id)
        const cronExpression = this.getCronExpression(website)

        if(this.ScheduledJob.get(jobId)){

            this.ScheduledJob.get(jobId)?.stop()
            this.ScheduledJob.delete(jobId)
        }
      //   await fetchService(website);
     const job =  cron.schedule(cronExpression, async () => {
      console.log(`➡️ Running job for: ${website.name} (${website.url})`);
      await fetchService(website); // Start the actual scraping job
    }, {
      // schedule: true,
      // Prevents the job from running again if the previous run is still active
      // This helps with long-running scrapes.
      name: jobId, 
    });

   this.ScheduledJob.set(jobId, job);
    console.log(`   - Scheduled ${website.name}: ${cronExpression}`);
  }


    public  endAllJob(): void{
    this.ScheduledJob.forEach((job) => job.stop())
    this.ScheduledJob.clear()
    }

}

export default SchedulerService


