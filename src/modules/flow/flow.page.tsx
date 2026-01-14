import React from "react";
import FlowCanvas from "./components/FlowCanvas";

const FlowPage: React.FC = () => {
  return (
    <div className="flex h-full gap-4">
      <div className="w-64 border-r p-4">
        <h3 className="mb-2 font-semibold">Components</h3>
        <div
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData("application/reactflow", "processor")
          }
          className="p-2 border rounded cursor-grab bg-white"
        >
          Processor
        </div>
        <div
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData("application/reactflow", "network")
          }
          className="p-2 border rounded cursor-grab bg-white"
        >
          Network
        </div>
      </div>

      <div className="flex-1">
        <FlowCanvas />
      </div>
    </div>
  );
};

export default FlowPage;
