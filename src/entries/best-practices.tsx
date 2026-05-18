import SiteFrame from '../components/layout/SiteFrame'
import { mountPage } from './mountPage'
import BestPractices from '../sections/BestPractices'

mountPage(
  <SiteFrame currentPath="best-practices.html">
    <BestPractices />
  </SiteFrame>,
)
