import SiteFrame from '../components/layout/SiteFrame'
import { mountPage } from './mountPage'
import SupplyChainSecurity from '../sections/SupplyChainSecurity'

mountPage(
  <SiteFrame currentPath="supply-chain.html">
    <SupplyChainSecurity />
  </SiteFrame>,
)
