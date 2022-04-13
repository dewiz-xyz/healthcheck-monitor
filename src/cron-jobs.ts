import healthCheck from "./healthcheck";

const JOBS = [
  {
    'name': 'DIIS Group UI Goerli',
    'type': 'downtime',
    'params': ['https://diis-group-ui-goerli.vercel.app'],
    'interval': 1000*60*60*2, // every 2 hours
    'message': {
      'callbackUrl': process.env.DISCORD_WEBHOOK,
      'embeds': [
        {
          'title': 'DIIS Group Mainnet UI is down!',
          'description': 'https://diis3-group-ui-goerli.vercel.app'
        }
      ]
    }
  },
  {
    'name': 'Test Cron Job',
    'type': 'downtime',
    'params': ['https://diis123-group-ui-goerli.vercel.app'],
    'interval': 10000,
    'message': {
      'callbackUrl': process.env.DISCORD_WEBHOOK || "https://discord.com/api/webhooks/963758659173752842/mtCjOGzIYzmXVH1CLx9snh1FxrNOCXMxEjPZL128FJ-8kAW8SzHsStBvzvgPFp4WT6yG",
      'embeds': [
        {
          'title': 'Something went wrong!',
          'description': 'TEST TEST TEST'
        }
      ]
    }
  }
]

export default () => {
  for (const job of JOBS) {
    try {
      setInterval(async () => {
        const healthy = await healthCheck(job).catch(e => {
          console.error({ message: `Job '${job.name}' error`, error: e.message });
        })
        console.log(`Job "${job.name}" result: ${healthy}`);
      }, job.interval)
    } catch (e) {
      console.error({ message: `Can't run job ${job.name}`, error: e.message });
    }
  }
}
