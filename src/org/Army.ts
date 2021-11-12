import {Organization, OrganizationRenderer, OrganizationType} from "org/Organization"
import {OrganizationRenderOptions} from "org/render/HTMLOrganizationRenderer"


export class Army extends Organization {

  constructor(longName?: string, shortName?: string) {
    super(OrganizationType.army, longName, shortName);
  }

  render<R>(renderer: OrganizationRenderer<R>, options: OrganizationRenderOptions): R {
    return renderer.renderArmy(this, options);
  }
}
