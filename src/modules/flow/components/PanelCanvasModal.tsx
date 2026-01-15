import React, { useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  ScrollShadow
} from "@heroui/react";
import { ProcessorIcon } from '../../../components/Icons';
import { useFlowStore } from '../flow.store';

interface PanelCanvasModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  type: string;
}

const PanelCanvasModal: React.FC<PanelCanvasModalProps> = ({ isOpen, onOpenChange, type }) => {
  const {
    loadProcessors,
    setCategory,
    getFilteredProcessors,
    toggleProcessorSelection,
    selectedProcessors,
    addSelectedProcessorsToCanvas,
  } = useFlowStore();
  useEffect(() => {
    loadProcessors()
  }, []);
  const renderContent = () => {
    switch (type) {
      case "Parameter":
        return <p>test 1</p>;
      case "Funnel":
        return <p>test 2</p>;
      case "Processor":
        return (<>
          <div className="flex flex-row w-full">
            <div className="w-1/4 bg-gray-50/50 p-4 flex flex-col gap-2">
              <Button onClick={() => setCategory("All")}>All</Button>
              <Button onClick={() => setCategory("Standart")}>
                <ProcessorIcon />
                <span>Processor Standard</span>
              </Button>
              <Button onClick={() => setCategory("SQL")}>
                <ProcessorIcon />
                <span>Processor SQL</span>
              </Button>
            </div>

            <div className="w-3/4 flex flex-col">
              <ScrollShadow className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {getFilteredProcessors().map((proc) => {
                    const isSelected = selectedProcessor?.id === proc.id;

                    return (
                      <div
                        key={proc.id}
                        onClick={() => selectProcessor(proc)}
                        className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition
                          ${isSelected ? "border-blue-500 bg-blue-50" : "hover:border-blue-300"}
                        `}
                      >
                        <ProcessorIcon />
                        <div>
                          <p className="font-bold text-sm">{proc.name}</p>
                          <p className="text-xs text-gray-400">{proc.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollShadow>
            </div>
          </div>
        </>);
      case "Publish":
        return <p>test 3</p>;
      default:
        return <p>test 4</p>;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      placement="center"
      size='5xl'
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="py-6">
              {renderContent()}
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-[#2D68A2] text-white"
                isDisabled={!selectedProcessor}
                onPress={() => {
                  addSelectedProcessorToCanvas();
                  onOpenChange();
                }}
              >
                Add (0)
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PanelCanvasModal;