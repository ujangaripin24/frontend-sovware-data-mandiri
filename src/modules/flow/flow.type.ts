import type { Node, Edge } from "reactflow";

export type FlowState = {
  nodes: Node[];
  edges: Edge[];
  selectedNodeId?: string;

  addProcessorAtPosition: (x: number, y: number) => void;
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  setSelectedNode: (id?: string) => void;
  deleteSelectedNode: () => void;
};
