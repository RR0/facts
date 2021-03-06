import {HTML, HTMLRenderer} from "../../HTMLRenderer";
import {Organization, OrganizationRenderer, OrganizationType} from "../Organization";
import {Company} from "../Company";
import {Army} from "../Army";
import {PlaceRenderer} from "../../place/Place";
import {WithOrgMessages} from "../OrgMessages";
import {School} from "../School";
import {Translation} from "@rr0/lang";
import {ObjectUtils} from "@rr0/common";


export interface OrganizationNameOptions {
  short: boolean
  long: boolean
}


export enum OrganizationDescriptionOptions {
  none = 'none',
  inline = 'inline',
  tooltip = 'tooltip'
}


export interface OrganizationRenderOptions {
  name: OrganizationNameOptions
  description: OrganizationDescriptionOptions
  origin: boolean
  types: {
    [OrganizationType.company]: {
      products: boolean,
    }
    [OrganizationType.army]: {}
  }
}


export class HTMLOrganizationRenderer extends HTMLRenderer implements OrganizationRenderer<HTML> {

  constructor(translation: Translation<WithOrgMessages>, private placeRenderer: PlaceRenderer<HTML>) {
    super(translation);
  }

  render(org: Organization, options: OrganizationRenderOptions): HTML {
    let name = ''
    const values = this.getValues(org, options);
    const keys = Object.keys(values);
    if (keys.length > 0) {
      const nameKey = keys.join('_')
      name += this.translation.translate((this.translation.messages.org as any)[nameKey], values);
    }
    return name
  }

  renderArmy(army: Army, options: OrganizationRenderOptions): HTML {
    const name = this.render(army, options)
    let type = ''
    if (options.description !== OrganizationDescriptionOptions.none) {
      type = this.translation.translate(this.translation.messages.org.type[OrganizationType.army])
    }
    return `${name}${name && type ? ', ' : ''}${type}`
  }

  renderCompany(company: Company, options: OrganizationRenderOptions): HTML {
    let name = ''
    const values = this.getValues(company, options);
    const translator = this.translation;
    if (options.description !== OrganizationDescriptionOptions.none) {
      values.products = company.products.map(p => translator.translate(Object.values(translator.messages.dict[p])[0] as string)).join(', ')
    }
    const keys = Object.keys(values)
    if (keys.length > 0) {
      const key = translator.compoundKey(keys.concat('company'))
      name += translator.translate((translator.messages.org as any)[key], values)
    }
    return name
  }

  renderSchool(school: School, options: OrganizationRenderOptions): HTML {
    let name = ''
    const values = this.getValues(school, options);
    const keys = Object.keys(values)
    const key = this.translation.compoundKey(keys.concat('school'))
    name += this.translation.translateKey(this.translation.messages.org, key, values)
    return name
  }

  private getValues(org: Organization, options: OrganizationRenderOptions): { [key: string]: any } {
    const values: any = {}
    const nameOptions = options.name;
    if (nameOptions.short && ObjectUtils.isSet(org.shortName)) {
      values.short = this.translation.translateKey(this.translation.messages.dict, org.shortName!)
    }
    if (nameOptions.long && ObjectUtils.isSet(org.longName)) {
      values.long = this.translation.translateKey(this.translation.messages.dict, org.longName!)
    }
    if (options.origin) {
      const firstCountry = org.firstCountry
      if (ObjectUtils.isSet(firstCountry)) {
        values.nationality = firstCountry!.renderNationality(this.placeRenderer, this.translation.getGender(this.translation.messages.dict.company))
      }
    }
    return values;
  }
}
