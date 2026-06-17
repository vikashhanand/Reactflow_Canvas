import { useQuery } from "@tanstack/react-query";
import { getAppGraph, getApps } from "../data/mockApi";

export function useAppsQuery() {
  return useQuery({
    queryKey: ["apps"],
    queryFn: getApps,
  });
}

export function useGraphQuery(appId: string | null, shouldFail: boolean) {
  return useQuery({
    queryKey: ["app-graph", appId, shouldFail],
    queryFn: () => getAppGraph(appId!, shouldFail),
    enabled: Boolean(appId),
  });
}
