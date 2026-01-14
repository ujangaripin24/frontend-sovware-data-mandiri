import { Image } from '@heroui/react'
import React, {  } from 'react'
import Logo from "../../assets/assets-s2re.svg"
import LoginForm from './components/LoginForm'
import LoginCarousel from './components/LoginCarousel'

const AuthPage: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-screen bg-[#2D68A2]">
      <div className="bg-[#fff] flex items-center justify-center lg:col-span-5 lg:rounded-r-[16px] z-10">
        <div className='flex w-full flex-col items-center gap-y-4'>
          <Image alt="Icon Logo" src={Logo} width={42} />
          <div className="text-center text-[#2D68A2] mb-2">
            <div className="text-lg">Welcome to <span className="font-black">S.2.R.E ADMIN</span></div>
            <div className="text-sm">Please login with your registered account.</div>
          </div>
          <LoginForm/>
        </div>
      </div>

      <div className="bg-[#2D68A2] hidden lg:flex items-center lg:col-span-7 justify-center">
        <div className="flex flex-col items-center justify-center w-full px-8 gap-y-4">
          <LoginCarousel/>
        </div>
      </div>
    </div>
  )
}

export default AuthPage