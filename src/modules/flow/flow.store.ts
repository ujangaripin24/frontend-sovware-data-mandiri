import { create } from "zustand";
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "reactflow";
import { v4 as uuid } from "uuid";
import type { FlowState } from "./flow.type";

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  connections: [],

  processors: [],
  selectedProcessors: [],
  selectedProcessor: undefined,
  selectedCategory: "All",

  selectedNodeId: undefined,
  selectedEdgeId: undefined,

  pendingConnection: undefined,

  designStatus: "NOT_VALIDATED",
  generatedCode: "",

  loadProcessors: () => {
    set({
      processors: [
        { id: 1, name: "AppendHostInfo", desc: "Appends host information", category: "Standart" },
        { id: 2, name: "AttributesToJSON", desc: "Generate JSON", category: "Standart" },
        { id: 3, name: "FetchFile", desc: "Read file", category: "Standart" },
        { id: 4, name: "QueryDatabase", desc: "Execute SQL", category: "SQL" },
      ],
    });
  },

  setCategory: (cat) => set({ selectedCategory: cat }),

  getFilteredProcessors: () => {
    const { processors, selectedCategory } = get();
    if (selectedCategory === "All") return processors;
    return processors.filter(p => p.category === selectedCategory);
  },

  toggleProcessorSelection: (proc) => {
    const selected = get().selectedProcessors;
    const exists = selected.some(p => p.id === proc.id);

    set({
      selectedProcessors: exists
        ? selected.filter(p => p.id !== proc.id)
        : [...selected, proc],
    });
  },

  clearSelectedProcessors: () => set({ selectedProcessors: [] }),

  addSelectedProcessorsToCanvas: () => {
    const processors = get().selectedProcessors;
    if (!processors.length) return;

    set(state => ({
      nodes: [
        ...state.nodes,
        ...processors.map((p, i) => ({
          id: uuid(),
          position: { x: 150 + i * 40, y: 150 + i * 40 },
          data: { label: p.name },
        })),
      ],
      selectedProcessors: [],
      designStatus: "NOT_VALIDATED",
    }));
  },

  selectProcessor: (proc) => set({ selectedProcessor: proc }),
  clearSelectedProcessor: () => set({ selectedProcessor: undefined }),

  addSelectedProcessorToCanvas: () => {
    const proc = get().selectedProcessor;
    if (!proc) return;

    set(state => ({
      nodes: [
        ...state.nodes,
        {
          id: uuid(),
          position: { x: 150, y: 150 },
          data: { label: proc.name },
        },
      ],
      selectedProcessor: undefined,
      designStatus: "NOT_VALIDATED",
    }));
  },

  onNodesChange: (changes) =>
    set(state => ({
      nodes: applyNodeChanges(changes, state.nodes),
    })),

  onEdgesChange: (changes) =>
    set(state => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),

  onConnect: (params) => {
    if (!params.source || !params.target) return;
    get().startConnect(params.source, params.target);
  },

  startConnect: (sourceId, targetId) => {
    set({
      pendingConnection: { sourceId, targetId },
    });
  },

  saveConnection: (relationName) => {
    const { pendingConnection, edges, connections } = get();
    if (!pendingConnection) return;

    const id = uuid();

    set({
      connections: [
        ...connections,
        {
          id,
          sourceId: pendingConnection.sourceId,
          targetId: pendingConnection.targetId,
          relationName,
        },
      ],
      edges: addEdge(
        {
          id,
          source: pendingConnection.sourceId,
          target: pendingConnection.targetId,
        },
        edges
      ),
      pendingConnection: undefined,
      designStatus: "NOT_VALIDATED",
    });
  },

  setSelectedNode: (id) =>
    set({ selectedNodeId: id, selectedEdgeId: undefined }),

  setSelectedEdge: (id) =>
    set({ selectedEdgeId: id, selectedNodeId: undefined }),

  deleteSelected: () =>
    set(state => {
      if (state.selectedEdgeId) {
        return {
          edges: state.edges.filter(e => e.id !== state.selectedEdgeId),
          connections: state.connections.filter(c => c.id !== state.selectedEdgeId),
          selectedEdgeId: undefined,
          designStatus: "NOT_VALIDATED",
        };
      }

      if (state.selectedNodeId) {
        return {
          nodes: state.nodes.filter(n => n.id !== state.selectedNodeId),
          edges: state.edges.filter(
            e => e.source !== state.selectedNodeId && e.target !== state.selectedNodeId
          ),
          connections: state.connections.filter(
            c => c.sourceId !== state.selectedNodeId && c.targetId !== state.selectedNodeId
          ),
          selectedNodeId: undefined,
          designStatus: "NOT_VALIDATED",
        };
      }

      return state;
    }),

  generateCode: () => {
    const { connections } = get();
    const code = connections
      .map(c => `${c.sourceId} -> ${c.targetId} [${c.relationName}]`)
      .join("\n");

    set({ generatedCode: code });
  },

  validateDesign: () => {
    const { nodes, connections } = get();

    if (!nodes.length)
      return { success: false, errors: "Canvas is empty" };

    if (!connections.length)
      return { success: false, errors: "No connections defined" };

    const connected = new Set<string>();
    connections.forEach(c => {
      connected.add(c.sourceId);
      connected.add(c.targetId);
    });

    const invalid = nodes.some(n => !connected.has(n.id));
    if (invalid)
      return { success: false, errors: "Unconnected processor detected" };

    set({ designStatus: "VALIDATED" });
    return { success: true };
  },

  publishDesign: () => {
    const { designStatus, nodes, connections } = get();

    if (designStatus !== "VALIDATED") {
      return {
        success: false,
        message: "Design must be validated first",
      };
    }

    const payload = { nodes, connections };
    console.log("[PUBLISH DESIGN]", payload);

    return {
      success: true,
      message: "Design published successfully",
      payload,
    };
  },
}));
