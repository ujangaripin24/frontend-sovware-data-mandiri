import type { Node, Edge } from "reactflow";

export type ProcessorDef = {
  id: number;
  name: string;
  desc: string;
  category: string;
};

export type Connection = {
  id: string;
  sourceId: string;
  targetId: string;
  relationName: string;
};

export type DesignStatus = "NOT_VALIDATED" | "VALIDATED";

export type FlowState = {
  nodes: Node[];
  edges: Edge[];

  connections: Connection[];

  processors: ProcessorDef[];
  selectedProcessors: ProcessorDef[];
  selectedProcessor?: ProcessorDef;
  selectedCategory: string;

  selectedNodeId?: string;
  selectedEdgeId?: string;

  pendingConnection?: {
    sourceId: string;
    targetId: string;
  };

  designStatus: DesignStatus;
  generatedCode: string;

  loadProcessors: () => void;
  setCategory: (cat: string) => void;
  getFilteredProcessors: () => ProcessorDef[];

  toggleProcessorSelection: (proc: ProcessorDef) => void;
  clearSelectedProcessors: () => void;
  addSelectedProcessorsToCanvas: () => void;

  selectProcessor: (proc: ProcessorDef) => void;
  clearSelectedProcessor: () => void;
  addSelectedProcessorToCanvas: () => void;

  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (params: any) => void;

  startConnect: (sourceId: string, targetId: string) => void;
  saveConnection: (relationName: string) => void;

  setSelectedNode: (id?: string) => void;
  setSelectedEdge: (id?: string) => void;
  deleteSelected: () => void;

  generateCode: () => void;
  validateDesign: () => { success: boolean; errors?: string };
  publishDesign: () => {
    success: boolean;
    message: string;
    payload?: {
      nodes: Node[];
      connections: Connection[];
    };
  };
};
