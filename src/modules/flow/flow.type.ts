import type { Node, Edge, Connection } from "reactflow";

export type FlowState = {
  nodes: Node[];
  edges: Edge[];
  selectedNodeId?: string;
  selectedEdgeId?: string;

  addProcessorAtPosition: (x: number, y: number) => void;
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: Connection) => void;

  setSelectedNode: (id?: string) => void;
  setSelectedEdge: (id?: string) => void;
  deleteSelected: () => void;
};
