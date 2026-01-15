import { Modal, ModalContent, ModalBody, Input, ModalFooter, Button } from "@heroui/react";
import type React from "react";
import { useState } from "react";
import { useFlowStore } from "../flow.store";

interface RelationNameModalProps {
  isOpen: boolean;
}

const RelationNameModal: React.FC<RelationNameModalProps> = ({ isOpen }) => {
  const [name, setName] = useState("");
  const saveConnection = useFlowStore((s) => s.saveConnection);

  return (
    <Modal isOpen={isOpen} backdrop="blur">
      <ModalContent>
        <ModalBody>
          <Input
            label="Relation Name"
            placeholder="success / failure / output"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            onPress={() => {
              saveConnection(name);
              setName("");
            }}
          >
            Save Relation
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RelationNameModal;