import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input
} from '@heroui/react'
import React from 'react'
import { useDesignClassStore } from '../designSession.store'
import { BackArrow } from '../../../components/Icons';
import FlowCanvas from '../../flow/components/FlowCanvas';

const DesainFlowVersionForm: React.FC = () => {
  const { isModalFlowOpen, closeModalFlow, selectedFlow } = useDesignClassStore();

  return (
    <Modal
      isOpen={isModalFlowOpen}
      onOpenChange={(open) => {
        if (!open) closeModalFlow();
      }}
      size="full"
      scrollBehavior="inside"
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      hideCloseButton
    >
      <ModalContent>
        <>
          <ModalHeader className="space-y-6 pb-6">
            <div className="flex flex-col md:flex-row w-full gap-4 items-center">
              <div>
                <Button
                  className="bg-[#2D68A2] text-white"
                  size='sm'
                  onPress={closeModalFlow}
                >
                  <BackArrow />
                </Button>
              </div>
              <div>
                <Input
                  isReadOnly
                  className="max-w-sm"
                  defaultValue="junior@heroui.com"
                  type="email"
                  variant="underlined"
                  value={selectedFlow?.desainName}
                />
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <FlowCanvas />
          </ModalBody>
          <ModalFooter>
            <div className='flex w-full justify-end border-t-1 bg-white border-[#999999]'>
              <div className='font-bold text-[#999999] text-sm'>
                Last Update: {selectedFlow?.last_updated}
              </div>
            </div>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  )
}

export default DesainFlowVersionForm
