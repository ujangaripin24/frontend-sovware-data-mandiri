import type { Node, Edge, Connection } from "reactflow";

export type FlowState = {
  nodes: Node[];
  edges: Edge[];
  selectedNodeId?: string;
  selectedEdgeId?: string;
  processors: ProcessorDef[];
  selectedCategory: string;
  selectedProcessor?: ProcessorDef;

  selectProcessor: (proc: ProcessorDef) => void;
  selectedProcessors: ProcessorDef[];
  clearSelectedProcessor: () => void;
  addSelectedProcessorToCanvas: () => void;
  toggleProcessorSelection: (proc: ProcessorDef) => void;
  clearSelectedProcessors: () => void;
  addSelectedProcessorsToCanvas: () => void;

  addProcessorAtPosition: (x: number, y: number) => void;
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: Connection) => void;

  setSelectedNode: (id?: string) => void;
  setSelectedEdge: (id?: string) => void;
  deleteSelected: () => void;

  loadProcessors: () => void;
  setCategory: (cat: string) => void;
  getFilteredProcessors: () => ProcessorDef[];

  addProcessorToCanvas: (proc: ProcessorDef, x?: number, y?: number) => void;

  publishDesign: () => {
    success: boolean;
    message: string;
    payload?: {
      nodes: Node[];
      connections: Edge[];
    };
  }
};

export type ProcessorDef = {
  id: number;
  name: string;
  desc: string;
  category: string;
}