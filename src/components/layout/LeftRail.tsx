import {
  Boxes,
  Database,
  GitBranch,
  Leaf,
  PanelsTopLeft,
  Server,
} from "lucide-react";
import { Button } from "../ui/button";

const items = [
  { icon: GitBranch, label: "GitHub", active: true },
  { icon: Database, label: "Postgres" },
  { icon: Server, label: "Redis" },
  { icon: Leaf, label: "MongoDB" },
  { icon: Boxes, label: "Containers" },
  { icon: PanelsTopLeft, label: "Layouts" },
  { icon: GitBranch, label: "Graph" },
];

export function LeftRail() {
  return (
    <aside className="left-rail" aria-label="Service navigation">
      {items.map(({ icon: Icon, label, active }) => (
        <Button
          aria-label={label}
          className={active ? "rail-button rail-button--active" : "rail-button"}
          key={label}
          size="icon"
          title={label}
          variant="icon"
        >
          <Icon size={22} />
        </Button>
      ))}
    </aside>
  );
}
