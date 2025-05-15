import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildPath(path: string, query: Record<string, any>): string {
  const params = new URLSearchParams();

  for (const key in query) {
    const value = query[key];
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, value);
    }
  }

  const queryString = params.toString();
  return queryString ? `${path}?${queryString}` : path;
}
