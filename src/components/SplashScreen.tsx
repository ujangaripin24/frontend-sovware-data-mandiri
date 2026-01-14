import { Image, Spinner } from '@heroui/react'
import React from 'react'
import Logo from "../assets/assets-s2re.svg"

const SplashScreen: React.FC = () => {
  return (
    <div className="grid gap-0 min-h-screen w-screen">
      <div className='bg-white flex flex-col items-center justify-center gap-6'>
        <div className='flex items-center gap-4'>
          <Image alt="Icon Logo" src={Logo} width={42} />
          <div className='leading-tight'>
            <div className='font-extrabold text-xl'>SOVWARE</div>
            <div className='text-sm tracking-widest'>EDGE SYSTEM</div>
          </div>
        </div>
        <Spinner />
      </div>
    </div>

  )
}

export default SplashScreen