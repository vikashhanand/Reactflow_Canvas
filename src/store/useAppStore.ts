import { create } from "zustand";

type InspectorTab = "config" | "runtime";
type ThemeMode = "dark" | "light";

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "dark";
  }
  return window.localStorage.getItem("reactflow-canvas-theme") === "light"
    ? "light"
    : "dark";
}

type AppState = {
  selectedAppId: string | null;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  isDesktopPanelOpen: boolean;
  activeInspectorTab: InspectorTab;
  simulateGraphError: boolean;
  theme: ThemeMode;
  setSelectedAppId: (appId: string) => void;
  setSelectedNodeId: (nodeId: string | null) => void;
  setMobilePanelOpen: (open: boolean) => void;
  setDesktopPanelOpen: (open: boolean) => void;
  setActiveInspectorTab: (tab: InspectorTab) => void;
  setSimulateGraphError: (enabled: boolean) => void;
  setTheme: (theme: ThemeMode) => void;
};

export const useAppStore = create<AppState>((set) => ({
  selectedAppId: null,
  selectedNodeId: null,
  isMobilePanelOpen: false,
  isDesktopPanelOpen: true,
  activeInspectorTab: "config",
  simulateGraphError: false,
  theme: getInitialTheme(),
  setSelectedAppId: (appId) =>
    set({
      selectedAppId: appId,
      selectedNodeId: null,
      activeInspectorTab: "config",
    }),
  setSelectedNodeId: (nodeId) => set({ selectedNodeId: nodeId }),
  setMobilePanelOpen: (open) => set({ isMobilePanelOpen: open }),
  setDesktopPanelOpen: (open) => set({ isDesktopPanelOpen: open }),
  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),
  setSimulateGraphError: (enabled) => set({ simulateGraphError: enabled }),
  setTheme: (theme) => {
    window.localStorage.setItem("reactflow-canvas-theme", theme);
    set({ theme });
  },
}));
