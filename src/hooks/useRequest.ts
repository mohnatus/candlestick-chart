import { useState, useRef, useCallback } from "react";

function getParamsString(params: RequestParams = {}) {
  return Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}

export function useRequest<T>(endpoint: string, handler?: (data: any) => T) {
  const [pending, setPending] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const abortController = useRef<AbortController | null>(null);

  const abort = useCallback(() => {
    if (abortController.current) {
      abortController.current.abort();
      abortController.current = null;
    }
  }, []);

  const send = useCallback(
    async (params?: RequestParams) => {
      console.log("send request");
      setPending(true);

      abort();

      const controller = new AbortController();
      abortController.current = controller;

      const response = await fetch(`${endpoint}?${getParamsString(params)}`, {
        signal: controller.signal,
      });
      const json = await response.json();

      if (typeof handler === "function") {
        setData(handler(json));
      } else {
        setData(json);
      }

      setPending(false);
    },
    [endpoint, abort, handler]
  );

  return { pending, data, send, abort };
}
