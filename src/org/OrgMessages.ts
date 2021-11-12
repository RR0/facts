import {OrganizationType} from "org/Organization"


export interface OrgMessages {
  short: string
  long: string
  short_long: string
  company_products: string
  company_nationality: string
  company_nationality_products: string
  school: string
  long_school: string
  [OrganizationType.army]: string
}


export interface WithOrgMessages {
  org: OrgMessages
}
