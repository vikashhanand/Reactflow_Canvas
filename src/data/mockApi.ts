import type { AppSummary, GraphPayload, ServiceNode } from "../types";

const apps: AppSummary[] = [
  { id: "supertokens-golang", name: "supertokens-golang", kind: "service" },
  { id: "supertokens-java", name: "supertokens-java", kind: "service" },
  { id: "supertokens-python", name: "supertokens-python", kind: "service" },
  { id: "supertokens-ruby", name: "supertokens-ruby", kind: "cache" },
  { id: "supertokens-go", name: "supertokens-go", kind: "database" },
];

const baseNodes: ServiceNode[] = [
  {
    id: "postgres",
    type: "serviceNode",
    position: { x: 620, y: 140 },
    data: {
      label: "Postgres",
      description: "Primary relational database for sessions and users.",
      status: "Healthy",
      kind: "database",
      provider: "aws",
      cpu: 0.02,
      memory: 0.05,
      disk: 10,
      region: 1,
      tuning: 82,
    },
  },
  {
    id: "redis",
    type: "serviceNode",
    position: { x: 190, y: 430 },
    data: {
      label: "Redis",
      description: "Cache and token revocation queue.",
      status: "Down",
      kind: "cache",
      provider: "aws",
      cpu: 0.02,
      memory: 0.05,
      disk: 10,
      region: 1,
      tuning: 78,
    },
  },
  {
    id: "mongodb",
    type: "serviceNode",
    position: { x: 700, y: 505 },
    data: {
      label: "Mongodb",
      description: "Document store for audit and app metadata.",
      status: "Degraded",
      kind: "database",
      provider: "aws",
      cpu: 0.02,
      memory: 0.05,
      disk: 10,
      region: 1,
      tuning: 86,
    },
  },
];

const graphByApp: Record<string, GraphPayload> = Object.fromEntries(
  apps.map((app, index) => [
    app.id,
    {
      nodes: baseNodes.map((node, nodeIndex) => ({
        ...node,
        id: `${app.id}-${node.id}`,
        position: {
          x: node.position.x + (index % 2) * 24,
          y: node.position.y + nodeIndex * (index % 3 === 0 ? 0 : 12),
        },
        data: {
          ...node.data,
          tuning: Math.max(10, Math.min(96, node.data.tuning - index * 5)),
          status:
            nodeIndex === 0
              ? "Healthy"
              : index % 2 === 0
                ? node.data.status
                : "Degraded",
        },
      })),
      edges: [
        {
          id: `${app.id}-postgres-redis`,
          source: `${app.id}-postgres`,
          target: `${app.id}-redis`,
          animated: true,
          style: { stroke: "#315ce8", strokeWidth: 2 },
        },
        {
          id: `${app.id}-postgres-mongodb`,
          source: `${app.id}-postgres`,
          target: `${app.id}-mongodb`,
          animated: true,
          style: { stroke: "#315ce8", strokeWidth: 2 },
        },
      ],
    },
  ]),
);

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function cloneGraph(graph: GraphPayload): GraphPayload {
  return {
    nodes: graph.nodes.map((node) => ({
      ...node,
      position: { ...node.position },
      data: { ...node.data },
    })),
    edges: graph.edges.map((edge) => ({
      ...edge,
      style: edge.style ? { ...edge.style } : undefined,
    })),
  };
}

export async function getApps(): Promise<AppSummary[]> {
  await wait(420);
  return apps;
}

export async function getAppGraph(
  appId: string,
  shouldFail: boolean,
): Promise<GraphPayload> {
  await wait(520);
  if (shouldFail) {
    throw new Error("Mock graph endpoint failed for this app.");
  }
  const graph = graphByApp[appId];
  if (!graph) {
    throw new Error("App graph not found.");
  }
  return cloneGraph(graph);
}
