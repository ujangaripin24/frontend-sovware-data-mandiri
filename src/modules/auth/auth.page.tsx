import { Button, Checkbox, Form, Image, Input } from '@heroui/react'
import React, { useState } from 'react'
import Logo from "../../assets/assets-s2re.svg"
import { EyeFilledIcon, EyeSlashFilledIcon } from '../../components/Icons'

const AuthPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
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
          >
            <Input
              isRequired
              labelPlacement="outside"
              name="email"
              placeholder="email"
              type="email"
              variant='bordered'
            />

            <Input
              isRequired
              className="max-w-xs"
              labelPlacement="outside"
              name="password"
              placeholder="password"
              variant="bordered"
              type={isVisible ? "text" : "password"}
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />

            <Checkbox>Remember me</Checkbox>
            <Button type="submit" className='w-full bg-[#2D68A2] text-white'>
              Login
            </Button>
          </Form>
        </div>
      </div>

      <div className="bg-[#2D68A2] hidden lg:flex items-center lg:col-span-7 justify-center">
        <div className="flex flex-col items-center justify-center w-full px-8 gap-y-4">
          Crousel
        </div>
      </div>
    </div>
  )
}

export default AuthPage