import SiteFrame from '../components/layout/SiteFrame'
import { mountPage } from './mountPage'
import ImplementationLab from '../sections/ImplementationLab'

mountPage(
  <SiteFrame currentPath="implementation-lab.html">
    <ImplementationLab />
  </SiteFrame>,
)
