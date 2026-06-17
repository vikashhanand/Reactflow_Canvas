import type { AppSummary, ServiceNode, ServiceNodeData } from "../../types";
import { AppList } from "./AppList";
import { InspectorPanel } from "./InspectorPanel";

type SidePanelProps = {
  apps: AppSummary[];
  appsError: boolean;
  appsLoading: boolean;
  selectedNode: ServiceNode | null;
  onUpdateNode: (nodeId: string, data: Partial<ServiceNodeData>) => void;
};

export function SidePanel({
  apps,
  appsError,
  appsLoading,
  onUpdateNode,
  selectedNode,
}: SidePanelProps) {
  return (
    <div className="side-panel">
      <AppList apps={apps} isError={appsError} isLoading={appsLoading} />
      <InspectorPanel onUpdateNode={onUpdateNode} selectedNode={selectedNode} />
    </div>
  );
}
