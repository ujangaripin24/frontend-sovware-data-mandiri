import React, { useState } from "react";
import FlowCanvas from "./components/FlowCanvas";
import { Button, Modal, ModalContent } from "@heroui/react";
import { useFlowStore } from "./flow.store";
import { useNavigate } from "react-router-dom";

const FlowPage: React.FC = () => {
  const publishDesign = useFlowStore((s) => s.publishDesign);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handlePublish = () => {
    const result = publishDesign();

    alert(result.message);

    if (result.success) {
      navigate("/dashboard");
    }

    setOpen(false);
  };
  return (
    <div className="flex h-full gap-4">
      <div className="flex justify-end mb-2">
        <Button color="primary" onClick={() => setOpen(true)}>
          Publish
        </Button>
      </div>
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
      </div>

      <div className="flex-1">
        <FlowCanvas />
      </div>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ModalContent className="p-4">
          <p>Are you sure you want to publish this design?</p>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="light" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" onClick={handlePublish}>
              Confirm Publish
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default FlowPage;
