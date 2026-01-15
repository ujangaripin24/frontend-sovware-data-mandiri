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
  selectedNodeId: undefined,
  selectedEdgeId: undefined,
  processors: [],
  selectedCategory: "All",

  selectedProcessor: undefined,

  selectedProcessors: [],

  toggleProcessorSelection: (proc) => {
    const selected = get().selectedProcessors;
    const exists = selected.some((p) => p.id === proc.id);

    if (exists) {
      set({
        selectedProcessors: selected.filter((p) => p.id !== proc.id),
      });
      console.log("UNSELECT:", proc.name);
    } else {
      set({
        selectedProcessors: [...selected, proc],
      });
      console.log("SELECT:", proc.name);
    }
  },

  clearSelectedProcessors: () => {
    set({ selectedProcessors: [] });
  },

  addSelectedProcessorsToCanvas: () => {
    const processors = get().selectedProcessors;
    if (processors.length === 0) return;

    set((state) => ({
      nodes: [
        ...state.nodes,
        ...processors.map((proc, index) => ({
          id: crypto.randomUUID(),
          position: {
            x: 150 + index * 40,
            y: 150 + index * 40,
          },
          data: { label: proc.name },
        })),
      ],
    }));

    console.log(
      "ADD MULTIPLE:",
      processors.map((p) => p.name)
    );

    set({ selectedProcessors: [] });
  },

  selectProcessor: (proc: any) => {
    set({ selectedProcessor: proc });
    console.log("SELECT PROCESSOR:", proc.name);
  },

  clearSelectedProcessor: () => {
    set({ selectedProcessor: undefined });
  },

  addSelectedProcessorToCanvas: () => {
    const proc = get().selectedProcessor;
    if (!proc) return;

    set((state) => ({
      nodes: [
        ...state.nodes,
        {
          id: crypto.randomUUID(),
          position: { x: 150, y: 150 },
          data: { label: proc.name },
        },
      ],
    }));

    console.log("ADD TO CANVAS:", proc.name);

    set({ selectedProcessor: undefined });
  },
  loadProcessors: () => {
    set({
      processors: [
        { id: 1, name: "AppendHostInfo", desc: "Appends host information", category: "Standart" },
        { id: 2, name: "AttributesToJSON", desc: "Generates JSON", category: "Standart" },
        { id: 3, name: "FetchFile", desc: "Reads file content", category: "Standart" },
        { id: 4, name: "QueryDatabase", desc: "Run SQL query", category: "SQL" },
      ],
    });
  },

  setCategory: (cat: any) => set({ selectedCategory: cat }),

  getFilteredProcessors: () => {
    const { processors, selectedCategory } = get();

    if (selectedCategory === "All") return processors;

    return processors.filter((p: { category: any; }) => p.category === selectedCategory);
  },

  addProcessorToCanvas: (proc: { name: any; }, x = 100, y = 100) => {
    set((state) => ({
      nodes: [
        ...state.nodes,
        {
          id: crypto.randomUUID(),
          position: { x, y },
          data: { label: proc.name },
        },
      ],
    }));

    console.log("ADD PROCESSOR:", proc.name);
  },

  addProcessorAtPosition: (x, y) =>
    set((state) => {
      console.log("tambah prosesor di", x, y);
      return {
        nodes: [
          ...state.nodes,
          {
            id: uuid(),
            position: { x, y },
            data: { label: "Processor" },
          },
        ],
      };
    }),

  onNodesChange: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    })),

  onEdgesChange: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),

  onConnect: (connection) =>
    set((state) => {
      console.log("buat koneksi", connection.source, "->", connection.target)
      if (connection.source === connection.target) {
        return state;
      }

      return {
        edges: addEdge(
          {
            ...connection,
            id: uuid(),
            animated: false,
          },
          state.edges
        ),
      };
    }),

  setSelectedNode: (id) =>
    set({ selectedNodeId: id, selectedEdgeId: undefined }),

  setSelectedEdge: (id) =>
    set({ selectedEdgeId: id, selectedNodeId: undefined }),

  deleteSelected: () =>
    set((state) => {
      console.log("hapus Edge ID: " + state.selectedEdgeId + "hapus Node ID: " + state.selectedNodeId);
      if (state.selectedEdgeId) {
        return {
          edges: state.edges.filter((e) => e.id !== state.selectedEdgeId),
          selectedEdgeId: undefined,
        };
      }

      if (state.selectedNodeId) {
        return {
          nodes: state.nodes.filter((n) => n.id !== state.selectedNodeId),
          edges: state.edges.filter(
            (e) =>
              e.source !== state.selectedNodeId &&
              e.target !== state.selectedNodeId
          ),
          selectedNodeId: undefined,
        };
      }

      return state;
    }),

  publishDesign: () => {
    const { nodes, edges } = get();

    if (nodes.length === 0) {
      return {
        success: false,
        message: "Canvas is empty. Nothing to publish."
      }
    }

    if (edges.length === 0) {
      return {
        success: false,
        message: "Please check your design. Some processors are not connected."
      }
    }

    const connectiodNodeIds = new Set<string>();
    edges.forEach((e: any) => {
      connectiodNodeIds.add(e.source);
      connectiodNodeIds.add(e.target);
    });

    const hasUnconnectedNode = nodes.some(
      (n: any) => !connectiodNodeIds.has(n.id)
    );

    if (hasUnconnectedNode) {
      return {
        success: false,
        message: "Please check your design. Some processors are not connected.",
      };
    }
    const payload = {
      nodes,
      connections: edges,
    };

    console.log("[POST] PUBLISH DESIGN PAYLOAD", payload);

    return {
      success: true,
      message: "Design published successfully",
      payload,
    };
  }
}));
