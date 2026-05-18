import SiteFrame from './components/layout/SiteFrame'
import PageDirectory from './components/PageDirectory'
import Hero from './sections/Hero'

function App() {
  return (
    <SiteFrame currentPath="index.html">
      <>
        <Hero />
        <PageDirectory />
      </>
    </SiteFrame>
  )
}

export default App
