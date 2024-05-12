import { writable } from "svelte/store";
import type { Report, Session } from "$lib/types/report-types";

export const currentSession = writable<Session>();
export const subTitle = writable<string>();
export const latestReport = writable<Report>();
