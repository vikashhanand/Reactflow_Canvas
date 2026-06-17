import { Box, ChevronRight, Database, PackagePlus, Search, Server } from "lucide-react";
import { useMemo, useState } from "react";
import type { AppSummary, ServiceKind } from "../../types";
import { useAppStore } from "../../store/useAppStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const iconByKind: Record<ServiceKind, typeof Box> = {
  service: Server,
  database: Database,
  cache: Box,
};

type AppListProps = {
  apps: AppSummary[];
  isLoading: boolean;
  isError: boolean;
};

export function AppList({ apps, isError, isLoading }: AppListProps) {
  const [search, setSearch] = useState("");
  const selectedAppId = useAppStore((state) => state.selectedAppId);
  const setSelectedAppId = useAppStore((state) => state.setSelectedAppId);

  const filteredApps = useMemo(
    () =>
      apps.filter((app) =>
        app.name.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [apps, search],
  );

  return (
    <section className="app-list-panel" aria-label="Applications">
      <div className="panel-heading">
        <h2>Application</h2>
      </div>
      <div className="search-row">
        <div className="search-field">
          <Input
            aria-label="Search applications"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search..."
            value={search}
          />
          <Search size={19} />
        </div>
        <Button aria-label="New app placeholder" size="icon" title="New app" variant="primary">
          <PackagePlus size={18} />
        </Button>
      </div>

      {isLoading ? (
        <div className="skeleton-stack" aria-label="Loading applications">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="skeleton-row" key={index} />
          ))}
        </div>
      ) : null}

      {isError ? (
        <p className="panel-error">Applications could not be loaded.</p>
      ) : null}

      <div className="app-items">
        {filteredApps.map((app) => {
          const Icon = iconByKind[app.kind];
          const isSelected = app.id === selectedAppId;
          return (
            <button
              className={isSelected ? "app-item app-item--active" : "app-item"}
              key={app.id}
              onClick={() => setSelectedAppId(app.id)}
              type="button"
            >
              <span className={`app-item__icon app-item__icon--${app.kind}`}>
                <Icon size={21} />
              </span>
              <span>{app.name}</span>
              <ChevronRight size={19} />
            </button>
          );
        })}
      </div>
    </section>
  );
}
