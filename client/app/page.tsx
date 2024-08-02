import { Button } from '@/components/ui/button'
import Navbar from '@/components/navbar'
import React from 'react'
import Hero from '@/components/hero'

const Home = () => {
    return (
        <>
            <section>
                <Navbar />

                <Hero />
            </section>
        </>
    )
}

export default Home