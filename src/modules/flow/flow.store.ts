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

    console.log("PUBLISH DESIGN PAYLOAD", payload);

    return {
      success: true,
      message: "Design published successfully",
      payload,
    };
  }
}));
