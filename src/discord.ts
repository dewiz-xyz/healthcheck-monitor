import fetch from "node-fetch";

import { DiscordMessage } from "./types";

export const sendToDiscord = async (message: DiscordMessage) => {
  message.username = message.username || "Health Check Monitor";
  await fetch(message.callbackUrl, {
    method: "POST",
    body: JSON.stringify(message),
    headers: { 'Content-Type': 'application/json' }
  }).catch(console.error);
}
