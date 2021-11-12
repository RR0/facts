import {RR0Event, RR0EventType} from "time/Event"
import {BirthEventRenderOptions} from "time/people/birth/BirthEvent"
import {OccupationRenderOptions} from "time/people/occupation/OccupationEvent"
import {FoundationEventRenderOptions} from "time/org/foundation/FoundationEvent"
import {StudyRenderOptions} from "time/people/study/StudyEvent"


export interface TimelineRenderOptions {
  [RR0EventType.birth]: BirthEventRenderOptions
  [RR0EventType.occupation]: OccupationRenderOptions
  [RR0EventType.foundation]: FoundationEventRenderOptions
  [RR0EventType.study]: StudyRenderOptions
}


export interface TimelineRenderer<R> {
  render(timeline: Timeline, options: TimelineRenderOptions): R
}


export class Timeline implements Iterable<RR0Event> {

  private readonly events: RR0Event[] = []

  constructor(events: RR0Event[] = []) {
    for (const event of events) {
      this.add(event)
    }
  }

  get length(): number {
    return this.events.length
  }

  get(index: number): RR0Event {
    return this.events[index]
  }

  add(event: RR0Event) {
    this.events.push(event)
    this.events.sort((oc1, oc2) => oc1.isBefore(oc2) ? -1 : oc1.isAfter(oc2) ? 1 : 0)
  }

  [Symbol.iterator](): Iterator<RR0Event> {
    return this.events[Symbol.iterator]();
  }

  render<R>(renderer: TimelineRenderer<R>, options: TimelineRenderOptions): R {
    return renderer.render(this, options)
  }

  findOfType(type: any): Timeline {
    return new Timeline(this.events.filter(event => event instanceof type))
  }
}
