import SiteFrame from '../components/layout/SiteFrame'
import { mountPage } from './mountPage'
import CaseStudies from '../sections/CaseStudies'

mountPage(
  <SiteFrame currentPath="case-studies.html">
    <CaseStudies />
  </SiteFrame>,
)
