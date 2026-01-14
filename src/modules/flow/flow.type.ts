import type { Node, Edge } from "reactflow";

export type FlowState = {
  nodes: Node[];
  edges: Edge[];
  addProcessor: () => void;
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  deleteNode: (nodeId: string) => void;
};