import { create } from "zustand";
import {
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
} from "reactflow";
import { v4 as uuid } from "uuid";
import type { FlowState } from "./flow.type";

export const useFlowStore = create<FlowState>((set) => ({
  nodes: [],
  edges: [],

  addProcessor: () =>
    set((state) => ({
      nodes: [
        ...state.nodes,
        {
          id: uuid(),
          type: "default",
          position: { x: 100, y: 100 },
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

  deleteNode: (nodeId) =>
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== nodeId),
    })),
}));
