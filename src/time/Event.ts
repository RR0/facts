import {Place} from '../place/Place'
import {RR0Time} from "./Time"
import {EventRenderer, EventRenderOptions} from "./EventRenderer"


export enum RR0EventType {
  birth = 'birth',
  occupation = 'occupation',
  foundation = 'foundation',
  study = 'study',
}

/**
 * Something that occurred.
 */
export abstract class RR0Event {

  protected constructor(readonly type: RR0EventType, readonly when?: RR0Time, readonly where?: Place) {
  }

  /**
   * Delegate the event rendering to a renderer.
   *
   * @param R the rendering result type.
   * @param renderer
   * @param options
   */
  abstract render<R>(renderer: EventRenderer<R>, options: EventRenderOptions): R

  /**
   * If an event is chronologically before another.
   *
   * @return null if not known.
   */
  isBefore(otherEvent: RR0Event): Boolean | null {
    return this.when ? this.when.isBefore(otherEvent.when) : null
  }

  isAfter(otherEvent: RR0Event) {
    return this.when ? this.when.isAfter(otherEvent.when) : null
  }
}
