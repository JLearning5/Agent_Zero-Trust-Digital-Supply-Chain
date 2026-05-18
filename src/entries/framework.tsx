import SiteFrame from '../components/layout/SiteFrame'
import { mountPage } from './mountPage'
import ImplementationFramework from '../sections/ImplementationFramework'

mountPage(
  <SiteFrame currentPath="framework.html">
    <ImplementationFramework />
  </SiteFrame>,
)
