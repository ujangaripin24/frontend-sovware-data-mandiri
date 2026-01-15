import React from 'react';
import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button
} from "@heroui/react";

interface PanelCanvasModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  type: string;
}

const PanelCanvasModal: React.FC<PanelCanvasModalProps> = ({ isOpen, onOpenChange, type }) => {
  
  const renderContent = () => {
    switch (type) {
      case "Parameter":
        return <p>Konfigurasi Parameter Sistem di sini.</p>;
      case "Funnel":
        return <p>Pengaturan alur data (Funneling).</p>;
      case "Processor":
        return <p>List komponen Processor yang tersedia.</p>;
      case "Publish":
        return <p>Apakah Anda yakin ingin mempublish desain ini?</p>;
      default:
        return <p>Detail informasi untuk {type}.</p>;
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      backdrop="blur"
      placement="center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 border-b">
              {type} Configuration
            </ModalHeader>
            <ModalBody className="py-6">
              {renderContent()}
            </ModalBody>
            <ModalFooter className="border-t">
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button className="bg-[#2D68A2] text-white" onPress={onClose}>
                Save Changes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PanelCanvasModal;