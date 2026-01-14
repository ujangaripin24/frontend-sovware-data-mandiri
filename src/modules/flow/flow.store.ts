import { create } from "zustand";
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type Node,
  type Edge,
  type Connection,
} from "reactflow";
import { v4 as uuid } from "uuid";
import type { FlowState } from "./flow.type";

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: undefined,
  selectedEdgeId: undefined,

  addProcessorAtPosition: (x, y) =>
    set((state) => ({
      nodes: [
        ...state.nodes,
        {
          id: uuid(),
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

  onConnect: (connection) =>
    set((state) => {
      // ❌ Prevent self connection
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
}));
