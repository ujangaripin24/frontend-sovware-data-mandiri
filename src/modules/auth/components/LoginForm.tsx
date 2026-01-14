import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../auth.store';
import { useSplashStore } from '../../../hooks/splash.hook';
import { Button, Checkbox, Form, Input, Modal, ModalBody, ModalContent, ModalFooter } from '@heroui/react';
import { AlertDanger, EyeFilledIcon, EyeSlashFilledIcon } from '../../../components/Icons';
import { Navigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const login = useAuthStore((s) => s.login);
  const startSplash = useSplashStore((s) => s.startSplash);
  const isLoading = useAuthStore((s) => s.isLoading);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const clearFieldError = (field: "email" | "password") => {
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFieldErrors({});
    setIsErrorOpen(false);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const success = await login(email, password);

    if (success) {
      startSplash();
    } else {
      setFieldErrors({
        email: "Email atau password salah",
        password: "Email atau password salah",
      });
      setIsErrorOpen(true);
    }
  }

  useEffect(() => {
    const savedEmail = localStorage.getItem("remembered_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <>
      <Form
        className="w-full max-w-xs flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <Input
          isRequired
          labelPlacement='outside'
          name='email'
          placeholder='email'
          type='email'
          variant='bordered'
          value={email}
          onValueChange={setEmail}
          isInvalid={!!fieldErrors.email}
          errorMessage={fieldErrors.email}
          onChange={() => clearFieldError('email')}
        />

        <Input
          isRequired
          labelPlacement="outside"
          name="password"
          placeholder="password"
          variant="bordered"
          type={isVisible ? "text" : "password"}
          isInvalid={!!fieldErrors.password}
          errorMessage={fieldErrors.password}
          onChange={() => clearFieldError("password")}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400" />
              )}
            </button>
          }
        />

        <Checkbox
          isSelected={rememberMe}
          onValueChange={setRememberM}
        >
          Remember me
        </Checkbox>
        <Button
          type="submit"
          isLoading={isLoading}
          isDisabled={isLoading}
          className="w-full bg-[#2D68A2] text-white"
        >
          Login
        </Button>
      </Form>
      <Modal isOpen={isErrorOpen} onOpenChange={setIsErrorOpen} placement="center" backdrop='blur' size='sm'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <AlertDanger />
                <p className='font-bold'>Error</p>
                <p className="text-sm text-gray-500">
                  You must confirm your email address first before performing this action.
                </p>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="primary"
                  className="bg-[#2D68A2] text-white"
                  onPress={onClose}
                >
                  Got It
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default LoginForm