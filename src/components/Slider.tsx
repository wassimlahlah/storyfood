"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const data=[
    {
    id:1,
    title:"THE BEST FOOD IN THE CITY",
    image:"/slide1.png"
    },{
    id:2,
    title:"THE BEST SWEET IN THE CITY",
    image:"/slide2.png"
    }
    
]

function Slider() {
    const [currentSlide,setCurrentSlide]=useState(0)
    useEffect(()=>{
        const interval=setInterval(
            ()=>setCurrentSlide((prev)=>(prev===data.length -1?0:prev +1)),2000)
        return()=>clearInterval(interval)
    },[])
  return (
    <div className='flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-fuchsia-50'>
        {/*text container*/}
        <div className='flex-1 flex items-center justify-center flex-col gap-8 text-red-500 font-bold'>
            <h1 className='text-5xl text-center uppercase p-4 md:p-10 md:text-6xl xl:text-7xl'>
             {data[currentSlide].title}
            </h1>
            
        </div>
        {/*image container*/}
        <div className='w-full flex-1 relative '>
            <Image src={data[currentSlide].image} alt='' fill className='object-cover'/>
        </div>
    </div>
  )
}

export default Slider