# Healthcheck-monitor

Simple node.js server for monitoring.

## API

```
POST /
{
 params: Array<any>, // Params for check function (in case of type "downtime" this will be the URL)
 type: Checks, // now we are supporting only one type which is `downtime`
 message?: DiscordMessage & { callbackUrl: string } // discord message object see: https://discord.com/developers/docs/resources/webhook#execute-webhook-jsonform-params
}
```

## Usage

```
curl -X POST \
  https://HEALTH_CHECK_MONITOR_URL/ \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
  "params": ["https://google.com"],
  "type": "downtime",
  "message": {
	"callbackUrl": "DISCORD_WEBHOOK_URL"
  	"username": "Health Monitor",
	 "embeds": [
		{
		    "title": "Google is down!"
		}	
     ]	
  }
}'
```
