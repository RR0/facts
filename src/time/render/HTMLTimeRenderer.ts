import {RR0Time, TimeRenderer, TimeRenderOptions} from "time/Time"
import {DateTime} from "time/DateTime"
import {HTML, HTMLRenderer} from "HTMLRenderer"
import {BeforeTime} from "time/BeforeTime"
import {WithTimeMessages} from "time/TimeMessages"
import {Translation} from "@rr0/lang"
import {KeyValue} from "@rr0/common"


export class HTMLTimeRenderer extends HTMLRenderer<KeyValue<any>> implements TimeRenderer<HTML> {

  constructor(translation: Translation<WithTimeMessages>) {
    super(translation)
  }

  render(time: RR0Time, options: TimeRenderOptions): HTML {
    return time.toString()
  }

  renderDate(time: DateTime, options: TimeRenderOptions): HTML {
    const nativeOptions: any = {}
    for (const option in options) {
      if (options.hasOwnProperty(option)) {
        const value = (options as any)[option]
        if (value != 'none') {
          nativeOptions[option] = value
        }
      }
    }
    return Object.keys(nativeOptions).length > 0 ? time.date.toLocaleDateString(this.translation.locale, nativeOptions) : '';
  }

  renderBefore(time: BeforeTime, options: TimeRenderOptions): HTML {
    const date = time.aboveTime.render(this, options);
    return date ? this.translation.translate(this.translation.messages.time.before, {date}) : '';
  }
}
