import React from "react";
import { Button } from "@heroui/react";
import FlowCanvas from "./components/FlowCanvas";
import { useFlowStore } from "./flow.store";

const FlowPage: React.FC = () => {
  const addProcessor = useFlowStore((s) => s.addProcessor);

  return (
    <div className="h-full flex flex-col gap-4">
      <div>
        <Button color="primary" onClick={addProcessor}>
          Add Processor
        </Button>
      </div>

      <div className="flex-1 border rounded-md">
        <FlowCanvas />
      </div>
    </div>
  );
};

export default FlowPage;
