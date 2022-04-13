import fetch from "node-fetch";
import { sendToDiscord } from "./discord";
import { isCheckRequest } from "./types";

import type { Checks } from "./types";


export const HealthChecks: Record<Checks, string> = {
  "downtime": "downtime"
};

export const downTimeCheck = async (url: string): Promise<boolean> => {
  return fetch(url).then(res => res.ok).catch(() => false);
};

export const CheckFn: Record<string, (...args: any) => Promise<boolean>> = {
  [HealthChecks.downtime]: downTimeCheck,
};

export const healthCheck = async (data: any): Promise<boolean> => {
  if (isCheckRequest(data)) {
    const healthy = await CheckFn[data.type](...data.params);
    if (!healthy && data.message) {
      await sendToDiscord(data.message);
    }
    return healthy;
  } else {
    throw new Error("Invalid request data");
  }
}

export default healthCheck;
