import { create } from "zustand";
import {
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
} from "reactflow";
import { v4 as uuid } from "uuid";
import type { FlowState } from "./flow.type";

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: undefined,

  addProcessorAtPosition: (x, y) =>
    set((state) => ({
      nodes: [
        ...state.nodes,
        {
          id: uuid(),
          type: "default",
          position: { x, y },
          data: { label: "Processor" },
        },
      ],
    })),

  onNodesChange: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    })),

  onEdgesChange: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),

  setSelectedNode: (id) => set({ selectedNodeId: id }),

  deleteSelectedNode: () =>
    set((state) => {
      if (!state.selectedNodeId) return state;

      return {
        nodes: state.nodes.filter((n) => n.id !== state.selectedNodeId),
        edges: state.edges.filter(
          (e) =>
            e.source !== state.selectedNodeId &&
            e.target !== state.selectedNodeId
        ),
        selectedNodeId: undefined,
      };
    }),
}));
