import React from 'react'
import { useAuthStore } from '../auth.store';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalContent, ModalFooter } from '@heroui/react';


const AlertModalExpireToken: React.FC = () => {
  const { isTokenExpired, logout, clearTokenExpired } = useAuthStore();
  const navigate = useNavigate();

  const handleClose = () => {
    clearTokenExpired();
    logout();
    navigate("/", { replace: true });
  };
  console.log("Trigger page");
  
  return (
    <>
      <Modal isOpen={isTokenExpired} backdrop="blur" placement="center">
        <ModalContent>
          <ModalBody>
            <p className="font-bold text-lg">Session Expired</p>
            <p className="text-sm text-gray-500">
              Your session has expired. Please login again.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              className="bg-[#2D68A2] text-white"
              onPress={handleClose}
            >
              Login Again
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AlertModalExpireToken