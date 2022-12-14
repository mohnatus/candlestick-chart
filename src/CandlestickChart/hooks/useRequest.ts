import { useState, useRef, useCallback } from "react";

import { RequestParams } from "../types";

function getParamsString(params: RequestParams = {}) {
  return Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}

export function useRequest<T>(endpoint: string) {
  const abortController = useRef<AbortController | null>(null);

  const abort = useCallback(() => {
    if (abortController.current) {
      abortController.current.abort();
      abortController.current = null;
    }
  }, []);

  const send = useCallback(
    async (params?: RequestParams): Promise<T> => {
      abort();

      const controller = new AbortController();
      abortController.current = controller;

      const response = await fetch(`${endpoint}?${getParamsString(params)}`, {
        signal: controller.signal,
      });
      const json = await response.json();

      return json;
    },
    [endpoint, abort],
  );

  return { send, abort };
}
