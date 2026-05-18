import SiteFrame from '../components/layout/SiteFrame'
import { mountPage } from './mountPage'
import ArchitectureComponents from '../sections/ArchitectureComponents'

mountPage(
  <SiteFrame currentPath="architecture.html">
    <ArchitectureComponents />
  </SiteFrame>,
)
