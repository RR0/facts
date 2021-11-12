import {RR0Event} from "time/Event"
import {PlaceRenderer} from "place/Place"
import {TimeRenderer} from "time/Time"
import {OccupationEvent, OccupationEventRenderer, OccupationRenderOptions} from "time/people/occupation/OccupationEvent"
import {BirthEvent, BirthEventRenderer, BirthEventRenderOptions} from "time/people/birth/BirthEvent"
import {WithEventMessages} from "time/EventMessages"
import {FoundationEvent, FoundationEventRenderer, FoundationEventRenderOptions} from "../org/foundation/FoundationEvent"
import {StudyEvent, StudyEventRenderer, StudyRenderOptions} from "time/people/study/StudyEvent"
import {Translation} from "@rr0/lang"
import {EventRenderer, EventRenderOptions} from "time/EventRenderer"
import {HTML, HTMLRenderer} from "HTMLRenderer"


/**
 * Renders events as HTML.
 */
export class HTMLEventRenderer extends HTMLRenderer implements EventRenderer<HTML> {
  constructor(
    translation: Translation<WithEventMessages>,
    private placeRenderer: PlaceRenderer<HTML>,
    private timeRenderer: TimeRenderer<HTML>,
    private occupationRenderer: OccupationEventRenderer<HTML>,
    private birthEventRenderer: BirthEventRenderer<HTML>,
    private foundationRenderer: FoundationEventRenderer<HTML>,
    private studyRenderer: StudyEventRenderer<HTML>,
  ) {
    super(translation)
  }

  render(event: RR0Event, options: EventRenderOptions): HTML {
    return this.translation.translate(this.translation.messages.event.default, {
      when: event.when ? event.when.render(this.timeRenderer, options.time) : '',
      where: event.where ? event.where.render(this.placeRenderer) : '',
      type: event.type
    })
  }

  renderBirth(birth: BirthEvent, options: BirthEventRenderOptions): HTML {
    return this.birthEventRenderer.renderBirth(birth, options)
  }

  renderOccupation(event: OccupationEvent, options: OccupationRenderOptions): HTML {
    return this.occupationRenderer.renderOccupation(event, options)
  }

  renderFoundation(event: FoundationEvent, options: FoundationEventRenderOptions): HTML {
    return this.foundationRenderer.renderFoundation(event, options);
  }

  renderStudy(event: StudyEvent, options: StudyRenderOptions): HTML {
    return this.studyRenderer.renderStudy(event, options);
  }
}
