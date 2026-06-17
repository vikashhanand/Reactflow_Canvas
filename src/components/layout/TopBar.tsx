import {
  ChevronDown,
  ChevronUp,
  Moon,
  PanelRightOpen,
  RotateCcw,
  Share2,
  Sparkles,
  Sun,
} from "lucide-react";
import type { AppSummary } from "../../types";
import { useAppStore } from "../../store/useAppStore";
import { Button } from "../ui/button";

type TopBarProps = {
  currentApp?: AppSummary;
  isPanelOpen: boolean;
  onFitView: () => void;
  onTogglePanel: () => void;
};

export function TopBar({
  currentApp,
  isPanelOpen,
  onFitView,
  onTogglePanel,
}: TopBarProps) {
  const simulateGraphError = useAppStore((state) => state.simulateGraphError);
  const setSimulateGraphError = useAppStore(
    (state) => state.setSimulateGraphError,
  );
  const setMobilePanelOpen = useAppStore((state) => state.setMobilePanelOpen);
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);

  return (
    <header className="topbar">
      <div className="project-switcher">
        <div className="brand-mark" aria-hidden="true">
          <span />
        </div>
        <div className="project-icon" aria-hidden="true">
          <Sparkles size={20} />
        </div>
        <strong>{currentApp?.name ?? "ReactFlow Canvas"}</strong>
        <Button
          aria-label={isPanelOpen ? "Close application panel" : "Open application panel"}
          className="project-toggle"
          onClick={onTogglePanel}
          size="icon"
          title={isPanelOpen ? "Close application panel" : "Open application panel"}
          variant="ghost"
        >
          {isPanelOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </Button>
      </div>

      <div className="top-actions" aria-label="Canvas actions">
        <Button
          aria-label="Fit view"
          onClick={onFitView}
          size="icon"
          title="Fit view"
          variant="icon"
        >
          <RotateCcw size={18} />
        </Button>
        <Button
          aria-label="Toggle mock graph error"
          className={simulateGraphError ? "button--active-error" : undefined}
          onClick={() => setSimulateGraphError(!simulateGraphError)}
          size="sm"
          title="Toggle mock graph error"
          variant={simulateGraphError ? "danger" : "secondary"}
        >
          Error
        </Button>
        <Button aria-label="Share" size="icon" title="Share" variant="icon">
          <Share2 size={18} />
        </Button>
        <div className="theme-group" aria-label="Theme mode">
          <Button
            aria-label="Use dark mode"
            aria-pressed={theme === "dark"}
            className={theme === "dark" ? "theme-button theme-button--active" : "theme-button"}
            onClick={() => setTheme("dark")}
            size="icon"
            title="Dark mode"
            variant="icon"
          >
            <Moon size={18} />
          </Button>
          <Button
            aria-label="Use light mode"
            aria-pressed={theme === "light"}
            className={theme === "light" ? "theme-button theme-button--active" : "theme-button"}
            onClick={() => setTheme("light")}
            size="icon"
            title="Light mode"
            variant="icon"
          >
            <Sun size={18} />
          </Button>
        </div>
        <Button
          aria-label="Open application panel"
          className="mobile-panel-trigger"
          onClick={() => setMobilePanelOpen(true)}
          size="icon"
          title="Open application panel"
          variant="icon"
        >
          <PanelRightOpen size={18} />
        </Button>
        <div className="avatar" aria-label="User avatar" role="img">
          RF
        </div>
      </div>
    </header>
  );
}
