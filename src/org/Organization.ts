import {Company} from "org/Company"
import {Army} from "org/Army"
import {OrganizationRenderOptions} from "org/render/HTMLOrganizationRenderer"
import {Timeline} from "time/Timeline"
import {Country} from "place/country/Country"
import {School} from "org/School"


export interface OrganizationRenderer<R> {

  render(org: Organization, options: OrganizationRenderOptions): R

  renderCompany(company: Company, options: OrganizationRenderOptions): R;

  renderArmy(army: Army, options: OrganizationRenderOptions): R;

  renderSchool(school: School, options: OrganizationRenderOptions): R;
}


export enum OrganizationType {
  company = 'company',
  army = 'army',
  school = 'school',
}


export abstract class Organization {

  readonly events = new Timeline()

  protected constructor(readonly type: OrganizationType, readonly longName?: string, readonly shortName?: string) {
  }

  get firstCountry(): Country | undefined {
    return this.events.get(0)?.where?.country
  }

  abstract render<R>(renderer: OrganizationRenderer<R>, options: OrganizationRenderOptions): R
}
