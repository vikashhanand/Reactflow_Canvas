import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type OnInit,
} from "@xyflow/react";
import { AlertTriangle, Loader2 } from "lucide-react";
import type { ServiceNode } from "../../types";
import { useAppStore } from "../../store/useAppStore";
import { ServiceNodeCard } from "./ServiceNodeCard";

const nodeTypes = {
  serviceNode: ServiceNodeCard,
};

type GraphCanvasProps = {
  nodes: ServiceNode[];
  edges: Edge[];
  graphError: string | null;
  graphLoading: boolean;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onFitReady: OnInit<ServiceNode, Edge>;
  onNodesChange: (changes: NodeChange<ServiceNode>[]) => void;
};

export function GraphCanvas({
  edges,
  graphError,
  graphLoading,
  nodes,
  onEdgesChange,
  onFitReady,
  onNodesChange,
}: GraphCanvasProps) {
  const setSelectedNodeId = useAppStore((state) => state.setSelectedNodeId);
  const setMobilePanelOpen = useAppStore((state) => state.setMobilePanelOpen);

  return (
    <main className="canvas-shell">
      {graphLoading ? (
        <div className="canvas-state">
          <Loader2 className="spin" size={22} />
          <span>Loading graph...</span>
        </div>
      ) : null}

      {graphError ? (
        <div className="canvas-state canvas-state--error">
          <AlertTriangle size={22} />
          <span>{graphError}</span>
        </div>
      ) : null}

      <ReactFlow
        deleteKeyCode={["Backspace", "Delete"]}
        edges={edges}
        fitView
        maxZoom={1.2}
        minZoom={0.45}
        nodeTypes={nodeTypes}
        nodes={nodes}
        onEdgesChange={onEdgesChange}
        onInit={onFitReady}
        onNodeClick={(_, node) => {
          setSelectedNodeId(node.id);
          setMobilePanelOpen(true);
        }}
        onNodesChange={onNodesChange}
        onNodesDelete={() => setSelectedNodeId(null)}
        onPaneClick={() => setSelectedNodeId(null)}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          color="#24262b"
          gap={24}
          size={2}
          variant={BackgroundVariant.Dots}
        />
        <Controls className="flow-controls" position="bottom-right" />
      </ReactFlow>
    </main>
  );
}
