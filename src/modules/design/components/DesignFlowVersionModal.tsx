import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
} from "@heroui/react";
import { useDesignClassStore } from "../designSession.store";
import { useState } from "react";
import TableDesainFlowVersion from "./TableDesainFlowVersion";

const DesignFlowVersionModal = () => {
  const { isModalOpen, closeModal } = useDesignClassStore();

  const [formData, setFormData] = useState({
    majorVersion: "",
    minorVersion: "",
    designName: "",
    comment: "",
  });

  const isAllFieldsFilled = Object.values(formData).every((value) => value !== "");
  const isButtonDisabled = !isAllFieldsFilled;
  const handleSelection = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onOpenChange={closeModal}
      size="5xl"
      backdrop="blur"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader>Design Flow Version</ModalHeader>

        <ModalBody className="space-y-6 pb-6">
          <div className="flex flex-col md:flex-row w-full gap-4">
            <Dropdown className="w-full">
              <DropdownTrigger>
                <Button variant="bordered" className="w-full text-left justify-between">
                  {formData.majorVersion}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Major Version"
                onAction={(key) => handleSelection("majorVersion", key.toString())}
              >
                <DropdownItem key="v1">Version 1</DropdownItem>
                <DropdownItem key="v2">Version 2</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Dropdown className="w-full">
              <DropdownTrigger>
                <Button variant="bordered" className="w-full text-left justify-between">
                  {formData.minorVersion}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Minor Version"
                onAction={(key) => handleSelection("minorVersion", key.toString())}
              >
                <DropdownItem key="0.1">0.1</DropdownItem>
                <DropdownItem key="0.2">0.2</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <div className="flex flex-col w-full gap-4">
            <Input
              placeholder="Design Name"
              variant="bordered"
              labelPlacement="outside"
              className="w-full"
              value={formData.designName}
              onChange={(e) => handleSelection("designName", e.target.value)}
              isRequired
            />

            <Textarea
              placeholder="Comment"
              className="w-full"
              fullWidth
              value={formData.comment}
              onChange={(e) => handleSelection("comment", e.target.value)}
              isRequired
            />
          </div>

          <div className="flex flex-col w-full gap-4">
            <Button
              className={`${isButtonDisabled ? "bg-gray-400" : "bg-[#2D68A2]"} text-white`}
              isDisabled={isButtonDisabled}
              onPress={() => console.log("[POST] Data dikirim:", formData)}
            >
              New Flow
            </Button>
          </div>
          <div className="flex flex-col w-full gap-4">
            <TableDesainFlowVersion />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DesignFlowVersionModal;
