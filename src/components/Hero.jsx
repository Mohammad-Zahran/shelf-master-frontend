import React from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
    useGSAP(() => {
        gsap.to('#hero', {opacity: 1})
    }, [])
  return (
    <section className='w-full nav-height relative'>
        <div className='h-5/6 w-full flex-center flex-col'>
        <p id='hero' className='hero-title'>Heavy Duty Shelf</p>
        </div>
    </section>
  )
}

export default Hero