import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  ScrollShadow,
  Card,
  CardBody,
  Code,
} from "@heroui/react";
import { ProcessorIcon } from '../../../components/Icons';
import { useFlowStore } from '../flow.store';
// import { useNavigate } from 'react-router-dom';
import RelationNameModal from './RelationModalName';

interface PanelCanvasModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  type: string;
}

const PanelCanvasModal: React.FC<PanelCanvasModalProps> = ({ isOpen, onOpenChange, type }) => {
  const [openPublishModal, setPublishModal] = useState(false);
  const pendingConnection = useFlowStore((s) => s.pendingConnection);
  const openRelationModal = Boolean(pendingConnection)
  // const navigate = useNavigate();
  const {
    loadProcessors,
    setCategory,
    getFilteredProcessors,
    toggleProcessorSelection,
    selectedProcessors,
    addSelectedProcessorsToCanvas,
    clearSelectedProcessors,
    publishDesign,
    designStatus,
    generatedCode,
    validateDesign
  } = useFlowStore();

  const handlePublish = () => {
    const result = publishDesign()
    alert(result.message)
    if (result.success) {
      window.location.reload()
      // navigate("/dashboard/design");
    }
    setPublishModal(false);
  }

  useEffect(() => {
    loadProcessors()
  }, []);

  const renderContent = () => {
    switch (type) {
      case "Parameter":
        return <>
          <div>Hallo Parameter</div>
          <ModalFooter>
            <Button
              onPress={onOpenChange}
              color='danger'
            >
              Tutup
            </Button>
          </ModalFooter>
        </>;
      case "Funnel":
        return <>
          <div>Hallo Funnel</div>
          <ModalFooter>
            <Button
              onPress={onOpenChange}
              color='danger'
            >
              Tutup
            </Button>
          </ModalFooter>
        </>;
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
                    const isSelected = selectedProcessors.some(
                      (p) => p.id === proc.id
                    );

                    return (
                      <div
                        key={proc.id}
                        onClick={() => toggleProcessorSelection(proc)}
                        className={`flex items-start gap-3 p-4 border-0 rounded-xl cursor-pointer transition
                          ${isSelected
                            ? "border-blue-500 bg-[#2D68A2] text-[#fff]"
                            : "hover:border-blue-300"
                          }
                        `}
                      >
                        <ProcessorIcon />
                        <div>
                          <p className="font-bold text-sm">{proc.name}</p>
                          <p className="text-xs">{proc.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollShadow>
            </div>
          </div>
          <ModalFooter>
            <Button
              onPress={onOpenChange}
              color='danger'
            >
              Tutup
            </Button>
            <Button
              className="bg-[#2D68A2] text-white"
              isDisabled={selectedProcessors.length === 0}
              onPress={() => {
                addSelectedProcessorsToCanvas();
                onOpenChange();
              }}
            >
              Add ({selectedProcessors.length})
            </Button>
          </ModalFooter>
        </>);
      case "Publish":
        return (<>
          <h1>Publish Design Flow</h1>
          <Card>
            <CardBody>
              <div className="flex flex-row justify-between">
                <div className="flex font-bold gap-2 bg-white  align-top">
                  Design Status
                </div>
                <div className="flex gap-2">
                  <Button size="sm"
                    className={
                      designStatus === "VALIDATED"
                        ? "bg-green-500 text-white"
                        : "bg-amber-400 text-white"
                    }
                  >
                    {designStatus === "VALIDATED" ? "Validated" : "Not Validated"}
                  </Button>

                </div>
              </div>
            </CardBody>
          </Card>
          <Code>
            {generatedCode}
          </Code>
          <ModalFooter>
            <Button
              color={designStatus === "VALIDATED" ? "primary" : "warning"}
              onClick={() => {
                if (designStatus === "NOT_VALIDATED") {
                  validateDesign();
                } else {
                  handlePublish();
                }
              }}
            >
              {designStatus === "NOT_VALIDATED" ? "Validate" : "Publish"}
            </Button>
          </ModalFooter>
        </>);
      default:
        return <>
          <div>Hallo Export</div>
          <ModalFooter>
            <Button
              onPress={onOpenChange}
              color='danger'
            >
              Tutup
            </Button>
          </ModalFooter>
        </>;
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={(open) => {
          if (!open) onOpenChange()
          clearSelectedProcessors()
        }}
        backdrop="blur"
        placement="center"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size='5xl'
        hideCloseButton
      >
        <ModalContent>
          <>
            <ModalBody className="py-6">
              {renderContent()}
            </ModalBody>
          </>
        </ModalContent>
      </Modal>

      <Modal isOpen={openPublishModal} onClose={() => setPublishModal(false)}>
        <ModalContent className="p-4">
          <p>Are you sure you want to publish this design?</p>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="light" onClick={() => setPublishModal(false)}>
              Cancel
            </Button>
            <Button color="primary" onClick={handlePublish}>
              Publish
            </Button>
          </div>
        </ModalContent>
      </Modal>
      <RelationNameModal
        isOpen={openRelationModal}
      />
    </>
  );
};

export default PanelCanvasModal;