import SiteFrame from '../components/layout/SiteFrame'
import { mountPage } from './mountPage'
import CorePrinciples from '../sections/CorePrinciples'

mountPage(
  <SiteFrame currentPath="principles.html">
    <CorePrinciples />
  </SiteFrame>,
)
