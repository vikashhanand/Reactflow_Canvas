import {
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  type Edge,
  type ReactFlowInstance,
} from "@xyflow/react";
import { useEffect, useMemo, useRef } from "react";
import { GraphCanvas } from "./components/graph/GraphCanvas";
import { LeftRail } from "./components/layout/LeftRail";
import { TopBar } from "./components/layout/TopBar";
import { SidePanel } from "./components/panels/SidePanel";
import { Sheet } from "./components/ui/sheet";
import { useAppsQuery, useGraphQuery } from "./hooks/useAppQueries";
import { useAppStore } from "./store/useAppStore";
import type { ServiceNode, ServiceNodeData } from "./types";

function App() {
  const appsQuery = useAppsQuery();
  const selectedAppId = useAppStore((state) => state.selectedAppId);
  const selectedNodeId = useAppStore((state) => state.selectedNodeId);
  const isMobilePanelOpen = useAppStore((state) => state.isMobilePanelOpen);
  const isDesktopPanelOpen = useAppStore((state) => state.isDesktopPanelOpen);
  const simulateGraphError = useAppStore((state) => state.simulateGraphError);
  const theme = useAppStore((state) => state.theme);
  const setSelectedAppId = useAppStore((state) => state.setSelectedAppId);
  const setSelectedNodeId = useAppStore((state) => state.setSelectedNodeId);
  const setMobilePanelOpen = useAppStore((state) => state.setMobilePanelOpen);
  const setDesktopPanelOpen = useAppStore((state) => state.setDesktopPanelOpen);
  const graphQuery = useGraphQuery(selectedAppId, simulateGraphError);
  const [nodes, setNodes, onNodesChange] = useNodesState<ServiceNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const flowRef = useRef<ReactFlowInstance<ServiceNode, Edge> | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    const firstApp = appsQuery.data?.[0];
    if (!selectedAppId && firstApp) {
      setSelectedAppId(firstApp.id);
    }
  }, [appsQuery.data, selectedAppId, setSelectedAppId]);

  useEffect(() => {
    if (graphQuery.data) {
      setNodes(graphQuery.data.nodes);
      setEdges(graphQuery.data.edges);
      setSelectedNodeId(null);
      window.setTimeout(() => flowRef.current?.fitView({ padding: 0.2 }), 40);
    }
  }, [graphQuery.data, setEdges, setNodes, setSelectedNodeId]);

  const currentApp = appsQuery.data?.find((app) => app.id === selectedAppId);
  const selectedNode = useMemo(
    () => nodes.find((node) => node.id === selectedNodeId) ?? null,
    [nodes, selectedNodeId],
  );

  function handleUpdateNode(nodeId: string, data: Partial<ServiceNodeData>) {
    setNodes((currentNodes) =>
      currentNodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...data } }
          : node,
      ),
    );
  }

  const sidePanel = (
    <SidePanel
      apps={appsQuery.data ?? []}
      appsError={appsQuery.isError}
      appsLoading={appsQuery.isLoading}
      onUpdateNode={handleUpdateNode}
      selectedNode={selectedNode}
    />
  );

  return (
    <ReactFlowProvider>
      <div className="app-shell">
        <TopBar
          currentApp={currentApp}
          isPanelOpen={isDesktopPanelOpen}
          onFitView={() => flowRef.current?.fitView({ padding: 0.2 })}
          onTogglePanel={() => setDesktopPanelOpen(!isDesktopPanelOpen)}
        />
        <LeftRail />
        <div
          className={
            isDesktopPanelOpen
              ? "desktop-panel"
              : "desktop-panel desktop-panel--closed"
          }
        >
          {sidePanel}
        </div>
        <Sheet open={isMobilePanelOpen} onOpenChange={setMobilePanelOpen}>
          {sidePanel}
        </Sheet>
        <GraphCanvas
          edges={edges}
          graphError={
            graphQuery.isError
              ? graphQuery.error.message
              : selectedAppId
                ? null
                : "Choose an app to load its graph."
          }
          graphLoading={graphQuery.isLoading || appsQuery.isLoading}
          nodes={nodes}
          onEdgesChange={onEdgesChange}
          onFitReady={(instance) => {
            flowRef.current = instance;
            instance.fitView({ padding: 0.2 });
          }}
          onNodesChange={onNodesChange}
        />
      </div>
    </ReactFlowProvider>
  );
}

export default App;
