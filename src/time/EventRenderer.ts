import {BirthEventRenderer} from "./people/birth/BirthEvent"
import {OccupationEventRenderer} from "./people/occupation/OccupationEvent"
import {FoundationEventRenderer} from "./org/foundation/FoundationEvent"
import {StudyEventRenderer} from "./people/study/StudyEvent"
import {RR0Event} from "./Event"
import {PeopleRenderOptions} from "../people/render/HTMLPeopleRenderer"
import {TimeRenderOptions} from "./Time"

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
