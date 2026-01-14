import React from "react";
import ReactFlow, {
  Background,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";

import { useFlowStore } from "../flow.store";

const FlowCanvas: React.FC = () => {
  const nodes = useFlowStore((s) => s.nodes);
  const edges = useFlowStore((s) => s.edges);
  const onNodesChange = useFlowStore((s) => s.onNodesChange);
  const onEdgesChange = useFlowStore((s) => s.onEdgesChange);
  const deleteNode = useFlowStore((s) => s.deleteNode);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        onNodeClick={(_, node) => deleteNode(node.id)}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;
