import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Panel,
  type Connection,
  type ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";

import { useFlowStore } from "../flow.store";
import { Button, ButtonGroup, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@heroui/react";
import { useDesignClassStore } from "../../design/designSession.store";
import { ChevronDownIcon, ExportDownIcon, FlagIcon, FunnelIcon, ParameterIcon, ProcessorIcon, PublishDownIcon } from "../../../components/Icons";
import PanelCanvasModal from "./PanelCanvasModal";

const iconMap: Record<string, React.ReactNode> = {
  Parameter: <ParameterIcon />,
  Funnel: <FunnelIcon />,
  RPG: <PublishDownIcon />,
  Processor: <ProcessorIcon />,
  Export: <ExportDownIcon />,
  Publish: <PublishDownIcon />,
};

const FlowCanvas: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalType, setModalType] = useState<string>("");

  const handleOpenModal = (type: string) => {
    setModalType(type);
    onOpen();
    console.log(`Membuka modal: ${type}`);
  };

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNode,
    setSelectedEdge,
    deleteSelected,
    addProcessorAtPosition,
  } = useFlowStore();

  const { selectedFlow } = useDesignClassStore();

  const isValidConnection = useCallback(
    (connection: Connection) => {
      return connection.source !== connection.target;
    },
    []
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type || !reactFlowWrapper.current || !reactFlowInstance.current) {
        return;
      }

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.current.screenToFlowPosition({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      addProcessorAtPosition(position.x, position.y);
    },
    [addProcessorAtPosition]
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Delete") {
      deleteSelected();
    }
  };

  return (
    <div
      ref={reactFlowWrapper}
      style={{ height: "100%", width: "100%" }}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onInit={(instance) => (reactFlowInstance.current = instance)}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
        onNodeClick={(_, node) => setSelectedNode(node.id)}
        onEdgeClick={(_, edge) => setSelectedEdge(edge.id)}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
        <Background />
        <Controls />

        <Panel position="top-left" className="w-[calc(100%-40px)]">
          <div className="flex flex-row justify-between">
            <div className="flex font-bold gap-2 bg-white  align-top">
              <ButtonGroup size="sm" variant="flat">
                <Button className=" bg-white text-[#2e2e2e] border-1 border-gray-100 shadow-md">{selectedFlow?.version}</Button>
                <Dropdown placement="bottom-end" className="shadow-xl border-1">
                  <DropdownTrigger>
                    <Button isIconOnly>
                      <ChevronDownIcon />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Merge options"
                    className="max-w-[300px]"
                    selectionMode="single"
                  >
                    <DropdownItem key="version1">
                      Version 1
                    </DropdownItem>
                    <DropdownItem key="version2">
                      Version 2
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Button className="ml-4 bg-white text-[#2e2e2e] border-1 border-gray-100 shadow-md" size="sm">
                  <span><FlagIcon /></span>
                </Button>
              </ButtonGroup>
            </div>
            <div className="flex gap-2">
              {["Parameter", "Funnel", "RPG", "Processor", "Export", "Publish"].map((item) => (
                <Button
                  key={item}
                  onPress={() => handleOpenModal(item)}
                  className="flex flex-col h-auto py-2 bg-white text-[#2D68A2] border-1 border-gray-100 shadow-sm hover:shadow-md transition-shadow min-w-[70px]"
                  size="md"
                >
                  <div className="text-xl">
                    {iconMap[item]}
                  </div>

                  <span className="text-[10px] font-bold mt-1 uppercase">{item}</span>
                </Button>
              ))}
            </div>
          </div>
        </Panel>
      </ReactFlow>
      <PanelCanvasModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        type={modalType}
      />
    </div>
  );
};

export default FlowCanvas;
