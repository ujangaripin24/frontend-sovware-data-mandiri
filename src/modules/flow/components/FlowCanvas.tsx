import React, { useCallback } from "react";
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
  const addProcessorAtPosition = useFlowStore(
    (s) => s.addProcessorAtPosition
  );
  const setSelectedNode = useFlowStore((s) => s.setSelectedNode);
  const deleteSelectedNode = useFlowStore((s) => s.deleteSelectedNode);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const bounds = event.currentTarget.getBoundingClientRect();

      const position = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };

      addProcessorAtPosition(position.x, position.y);
    },
    [addProcessorAtPosition]
  );

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Delete") {
      deleteSelectedNode();
    }
  };

  return (
    <div
      style={{ height: "100%", width: "100%" }}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={(_, node) => setSelectedNode(node.id)}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;
