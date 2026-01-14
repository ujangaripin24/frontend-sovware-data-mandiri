import { Button, Checkbox, Form, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import React, { useCallback, useEffect, useState } from 'react'
import Logo from "../../assets/assets-s2re.svg"
import { AlertDanger, EyeFilledIcon, EyeSlashFilledIcon } from '../../components/Icons'
import Image1 from './../../assets/carousel/carousel-1.png'
import type { EmblaCarouselType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from './auth.store'
import { useSplashStore } from './auth.type'

const IMAGES = [
  Image1,
  Image1,
  Image1,
];

const AuthPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false })
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const isLoading = useAuthStore((s) => s.isLoading)
  const err = useAuthStore((s) => s.error);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const startSplash = useSplashStore((s) => s.startSplash);

  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const clearFieldError = (field: "email" | "password") => {
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const success = await login(email, password);

    if (success) {
      startSplash();
      setTimeout(() => {
        navigate("/dashboard");
      }, 5000);
    } else {
      setFieldErrors({
        email: "Email atau password salah",
        password: "Email atau password salah",
      });
      setIsErrorOpen(true);
    }
  };

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-screen bg-[#2D68A2]">
      <div className="bg-[#fff] flex items-center justify-center lg:col-span-5 lg:rounded-r-[16px] z-10">
        <div className='flex w-full flex-col items-center gap-y-4'>
          <Image alt="Icon Logo" src={Logo} width={42} />
          <div className="text-center text-[#2D68A2] mb-2">
            <div className="text-lg">Welcome to <span className="font-black">S.2.R.E ADMIN</span></div>
            <div className="text-sm">Please login with your registered account.</div>
          </div>
          <Form
            className="w-full max-w-xs flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <Input
              isRequired
              labelPlacement="outside"
              name="email"
              placeholder="email"
              type="email"
              variant="bordered"
              isInvalid={!!fieldErrors.email}
              errorMessage={fieldErrors.email}
              onChange={() => clearFieldError("email")}
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


            <Checkbox>Remember me</Checkbox>
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
        </div>
      </div>

      <div className="bg-[#2D68A2] hidden lg:flex items-center lg:col-span-7 justify-center">
        <div className="flex flex-col items-center justify-center w-full px-8 gap-y-4">
          <div className='flex flex-col items-center w-full gap-y-6'>
            <div className="w-full overflow-hidden rounded-xl" ref={emblaRef}>

              <div className="flex">
                {IMAGES.map((src, index) => (
                  <div
                    key={index}
                    className="relative flex-[0_0_100%] min-w-0 h-64 md:h-[400px]"
                  >
                    <Image
                      src={src}
                      alt={`Slide ${index + 1}`}
                      className="object-contain w-full h-full"
                      radius="none"
                      removeWrapper
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center space-x-3 mt-4">
              {IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi && emblaApi.scrollTo(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${selectedIndex === index ? "bg-black/50 scale-125" : "bg-white/50"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>


            <div className="text-center text-white">
              <h2 className="text-[24px] font-semibold">Building Happiness, Shaping Futures</h2>
              <p className="text-sm opacity-90">Where joy meets learning, and dreams take flight...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage