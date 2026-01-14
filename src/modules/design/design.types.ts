export type FlowVersion = {
  version: string;
  name: string;
  status: "Draft" | "Published";
  comment: string;
  updatedAt: string;

  nodes: any[];
  edges: any[];
};

export type DesignClass = {
  id: string;
  agentCount: number;
  flows: FlowVersion[];
};
