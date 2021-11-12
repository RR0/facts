import {Organization, OrganizationRenderer, OrganizationType} from "org/Organization"
import {OrganizationRenderOptions} from "org/render/HTMLOrganizationRenderer"


export enum SchoolType {
  primary = 'primarySchool',
  highSchool = 'highSchool',
  university = 'university'
}


export class School extends Organization {

  constructor(readonly schoolType: SchoolType, longName?: string, shortName?: string) {
    super(OrganizationType.school, longName, shortName);
  }

  render<R>(renderer: OrganizationRenderer<R>, options: OrganizationRenderOptions): R {
    return renderer.renderSchool(this, options);
  }
}
