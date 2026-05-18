import SiteFrame from '../components/layout/SiteFrame'
import { mountPage } from './mountPage'
import FivePillars from '../sections/FivePillars'

mountPage(
  <SiteFrame currentPath="pillars.html">
    <FivePillars />
  </SiteFrame>,
)
