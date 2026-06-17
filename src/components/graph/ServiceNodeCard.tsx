import { Cpu, Database, HardDrive, Server, Settings } from "lucide-react";
import type { NodeProps } from "@xyflow/react";
import { Handle, Position } from "@xyflow/react";
import type { ServiceNode } from "../../types";
import { Badge } from "../ui/badge";

export function ServiceNodeCard({ data, selected }: NodeProps<ServiceNode>) {
  const tone =
    data.status === "Healthy"
      ? "success"
      : data.status === "Degraded"
        ? "warning"
        : "danger";

  return (
    <article className={selected ? "service-node selected" : "service-node"}>
      <Handle className="node-handle" type="target" position={Position.Top} />
      <div className="node-header">
        <div className={`node-logo node-logo--${data.kind}`}>
          {data.kind === "cache" ? <Server size={18} /> : <Database size={18} />}
        </div>
        <strong>{data.label}</strong>
        <span className="price-pill">$0.03/HR</span>
        <button className="node-settings" aria-label={`${data.label} settings`} type="button">
          <Settings size={18} />
        </button>
      </div>

      <div className="node-values" aria-hidden="true">
        <span>{data.cpu.toFixed(2)}</span>
        <span>{data.memory.toFixed(2)} GB</span>
        <span>{data.disk.toFixed(2)} GB</span>
        <span>{data.region}</span>
      </div>

      <div className="node-tabs" aria-hidden="true">
        <span className="node-tab active">
          <Cpu size={16} />
          CPU
        </span>
        <span className="node-tab">Memory</span>
        <span className="node-tab">
          <HardDrive size={16} />
          Disk
        </span>
        <span className="node-tab">
          <Database size={16} />
          Region
        </span>
      </div>

      <div className="node-slider-row">
        <div className="node-slider">
          <span style={{ width: `${data.tuning}%` }} />
        </div>
        <div className="node-input">{(data.cpu || 0.02).toFixed(2)}</div>
      </div>

      <div className="node-footer">
        <Badge tone={tone}>{data.status === "Healthy" ? "Success" : data.status}</Badge>
        <span className="aws-mark">aws</span>
      </div>
      <Handle className="node-handle" type="source" position={Position.Bottom} />
    </article>
  );
}
