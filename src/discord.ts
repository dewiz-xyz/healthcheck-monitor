import fetch from "node-fetch";
import { DiscordMessage } from './types'

export const sendToDiscord = async (message: DiscordMessage) => {
  await fetch(process.env.DISCORD_WEBHOOK, {
    method: "POST",
    body: JSON.stringify(message),
    headers: { 'Content-Type': 'application/json' }
  }).catch(console.error)
}
