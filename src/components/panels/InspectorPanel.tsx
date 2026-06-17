import { Activity, Cpu, Database, HardDrive, ServerCog } from "lucide-react";
import type { ServiceNode, ServiceNodeData, ServiceStatus } from "../../types";
import { useAppStore } from "../../store/useAppStore";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";

type InspectorPanelProps = {
  selectedNode: ServiceNode | null;
  onUpdateNode: (nodeId: string, data: Partial<ServiceNodeData>) => void;
};

const badgeTone: Record<ServiceStatus, "success" | "warning" | "danger"> = {
  Healthy: "success",
  Degraded: "warning",
  Down: "danger",
};

export function InspectorPanel({
  selectedNode,
  onUpdateNode,
}: InspectorPanelProps) {
  const activeInspectorTab = useAppStore((state) => state.activeInspectorTab);
  const setActiveInspectorTab = useAppStore(
    (state) => state.setActiveInspectorTab,
  );

  if (!selectedNode) {
    return (
      <section className="inspector-panel inspector-panel--empty">
        <div className="empty-icon">
          <ServerCog size={26} />
        </div>
        <h2>Service Node</h2>
        <p>Select a node on the canvas to inspect runtime details and edit configuration.</p>
      </section>
    );
  }

  const { data } = selectedNode;

  return (
    <section className="inspector-panel" aria-label="Service node inspector">
      <div className="inspector-title-row">
        <div>
          <span className="eyebrow">Service Node</span>
          <h2>{data.label}</h2>
        </div>
        <Badge tone={badgeTone[data.status]}>{data.status}</Badge>
      </div>

      <Tabs
        onValueChange={(value) =>
          setActiveInspectorTab(value as "config" | "runtime")
        }
        value={activeInspectorTab}
      >
        <TabsList>
          <TabsTrigger value="config">Config</TabsTrigger>
          <TabsTrigger value="runtime">Runtime</TabsTrigger>
        </TabsList>

        <TabsContent value="config">
          <label className="field">
            <span>Node name</span>
            <Input
              onChange={(event) =>
                onUpdateNode(selectedNode.id, { label: event.target.value })
              }
              value={data.label}
            />
          </label>

          <label className="field">
            <span>Description</span>
            <Textarea
              onChange={(event) =>
                onUpdateNode(selectedNode.id, {
                  description: event.target.value,
                })
              }
              rows={4}
              value={data.description}
            />
          </label>

          <div className="field">
            <span>Tuning value</span>
            <div className="slider-input-row">
              <Slider
                max={100}
                min={0}
                onValueChange={([value]) =>
                  onUpdateNode(selectedNode.id, { tuning: value })
                }
                step={1}
                value={[data.tuning]}
              />
              <Input
                max={100}
                min={0}
                onChange={(event) =>
                  onUpdateNode(selectedNode.id, {
                    tuning: Number(event.target.value),
                  })
                }
                type="number"
                value={data.tuning}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="runtime">
          <div className="runtime-grid">
            <Metric icon={Cpu} label="CPU" value={data.cpu.toFixed(2)} />
            <Metric icon={Activity} label="Memory" value={`${data.memory} GB`} />
            <Metric icon={HardDrive} label="Disk" value={`${data.disk} GB`} />
            <Metric icon={Database} label="Region" value={String(data.region)} />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}

type MetricProps = {
  icon: typeof Cpu;
  label: string;
  value: string;
};

function Metric({ icon: Icon, label, value }: MetricProps) {
  return (
    <div className="metric-card">
      <Icon size={18} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
