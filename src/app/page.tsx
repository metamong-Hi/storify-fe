import Image from 'next/image'
import Header from './components/Header'
import ThreeScene from './components/ThreeScene'
export default function Home() {
  return (
    <div className="flex flex-col h-screen">
     <Header/>
     <ThreeScene/>
    </div>
  )
}
