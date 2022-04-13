# Healthcheck-monitor

Simple node.js server for monitoring.

## Configuration

You just need to have `DISCORD_WEBHOOK` url in your `env`

## API

```
POST /
{
 params: Array<any>, // Params for check function (in case of type "downtime" this will be the URL)
 type: Checks, // now we are supporting only one type which is `downtime`
 message?: DiscordMessage // discord message object see: https://discord.com/developers/docs/resources/webhook#execute-webhook-jsonform-params
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
  	"username": "Health Monitor",
	   "embeds": [
		   {
		   	"title": "Google is down!"
		   }	
     ]	
  }
}'
```
