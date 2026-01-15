import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  ModalHeader,
  RadioGroup,
  Radio,
  Card,
  CardBody
} from "@heroui/react";
import type React from "react";
import { useState } from "react";
import { useFlowStore } from "../flow.store";

interface RelationNameModalProps {
  isOpen: boolean;
}

const RelationNameModal: React.FC<RelationNameModalProps> = ({ isOpen }) => {
  const [name, setName] = useState("success");
  const saveConnection = useFlowStore((s) => s.saveConnection);

  return (
    <Modal isOpen={isOpen} backdrop="blur" isDismissable={false} hideCloseButton>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Create Connection</ModalHeader>
        <ModalBody>
          <RadioGroup
            label="Select Relation Name"
            value={name}
            onValueChange={setName}
          >
            <Card>
              <CardBody>
                <Radio description="Success" value="success">Database is successfully updated</Radio>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Radio description="Failure" value="failure">Database is failed to be updated</Radio>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Radio description="Output" value="output">Database show data output</Radio>
              </CardBody>
            </Card>
          </RadioGroup>
        </ModalBody>

        <ModalFooter>
          <Button
            className="bg-[#2D68A2] text-white"
            onPress={() => {
              saveConnection(name);
              setName("success");
            }}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RelationNameModal;