import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav/nav'
import HomepageContent from '@/components/HomepageContent/homepageContent'


export default function Home() {
  return (
    <>
     <Nav/>
     <HomepageContent/>
    </>
  )
}
