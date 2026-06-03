import Scene from './components/three/Scene'
import StaticBackdrop from './components/StaticBackdrop'
import CanvasErrorBoundary from './components/CanvasErrorBoundary'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Hero from './components/sections/Hero'
import Metrics from './components/sections/Metrics'
import Company from './components/sections/Company'
import Technology from './components/sections/Technology'
import Structure from './components/sections/Structure'
import Training from './components/sections/Training'
import Compliance from './components/sections/Compliance'
import Contact from './components/sections/Contact'
import Footer from './components/sections/Footer'
import useSmoothScroll from './hooks/useSmoothScroll'
import useWebGLSupport from './hooks/useWebGLSupport'

export default function App() {
  const scrollProgress = useSmoothScroll()
  const webgl = useWebGLSupport()

  return (
    <>
      <Preloader />

      {webgl === false ? (
        <StaticBackdrop />
      ) : webgl === true ? (
        <CanvasErrorBoundary fallback={<StaticBackdrop />}>
          <Scene scrollRef={scrollProgress} />
        </CanvasErrorBoundary>
      ) : null /* still detecting */}

      <Nav />

      <main className="content">
        <Hero />
        <Metrics />
        <Company />
        <Technology />
        <Structure />
        <Training />
        <Compliance />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
