import React from 'react'
import Hero from '../sections/Hero'
import Banner from '@/src/api/Banner/Banner'

const Carousel = () => {
  return (
    <div>
        <section><Hero/></section>
        <section><Banner/></section>
    </div>
  )
}

export default Carousel