import { HealthChecks } from "./healthcheck";

export type DiscordMessage = {
  callbackUrl: string;
  content?: string;
  username?: string;
  avatar_url?: string;
  embeds?: Record<any, any>[];
};

export type CheckData = {
  params: Array<any>,
  type: Checks,
  message?: DiscordMessage
};

export type Checks = "downtime";

export const isCheckRequest = (data: CheckData): data is CheckData => {
  return Boolean(
    data.params && Array.isArray(data.params)
    && data.type
    && HealthChecks[data.type] !== undefined
    && (data.message ? (data.message.callbackUrl && (data.message.content || data.message.embeds)) : true)
  );
}
