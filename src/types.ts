import type { Edge, Node } from "@xyflow/react";

export type ServiceStatus = "Healthy" | "Degraded" | "Down";
export type ServiceKind = "service" | "database" | "cache";

export type AppSummary = {
  id: string;
  name: string;
  kind: ServiceKind;
};

export type ServiceNodeData = {
  label: string;
  description: string;
  status: ServiceStatus;
  kind: ServiceKind;
  provider: "aws" | "gcp" | "azure";
  cpu: number;
  memory: number;
  disk: number;
  region: number;
  tuning: number;
};

export type ServiceNode = Node<ServiceNodeData, "serviceNode">;
export type GraphPayload = {
  nodes: ServiceNode[];
  edges: Edge[];
};
