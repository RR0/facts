import {BirthEventRenderer} from "time/people/birth/BirthEvent"
import {OccupationEventRenderer} from "time/people/occupation/OccupationEvent"
import {FoundationEventRenderer} from "time/org/foundation/FoundationEvent"
import {StudyEventRenderer} from "time/people/study/StudyEvent"
import {RR0Event} from "time/Event"
import {PeopleRenderOptions} from "people/render/HTMLPeopleRenderer"
import {TimeRenderOptions} from "time/Time"

export interface EventRenderOptions {
  who: PeopleRenderOptions
  time: TimeRenderOptions
  verb: boolean
}

export interface EventRenderer<R> extends BirthEventRenderer<R>, OccupationEventRenderer<R>, FoundationEventRenderer<R>, StudyEventRenderer<R> {
  /**
   * Render an event.
   */
  render(event: RR0Event, options: EventRenderOptions): R
}
