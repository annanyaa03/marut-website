import Nav from '@/components/Nav'
import Hero from '@/components/sections/Hero'
import FeatureCards from '@/components/sections/FeatureCards'
import Technology from '@/components/sections/Technology'
import OpenSource from '@/components/sections/OpenSource'
import Community from '@/components/sections/Community'
import Roadmap from '@/components/sections/Roadmap'
import Blog from '@/components/sections/Blog'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <FeatureCards />
      <Technology />
      <OpenSource />
      <Community />
      <Roadmap />
      <Blog />
      <Footer />
    </main>
  )
}
