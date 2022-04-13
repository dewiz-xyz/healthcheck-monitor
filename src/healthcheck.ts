import fetch from "node-fetch";

import type { Checks } from './types'


export const HealthChecks: Record<Checks, string> = {
  "downtime": "downtime"
}

export const downTimeCheck = async (url: string): Promise<boolean> => {
  return fetch(url).then(res => res.ok).catch(() => false);
}

export const CheckFn: Record<string, (...args: any) => Promise<boolean>> = {
  [HealthChecks.downtime]: downTimeCheck,
}

export default CheckFn;
