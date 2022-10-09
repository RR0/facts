import {Translation} from "@rr0/lang"
import {KeyValue} from "@rr0/common"


export abstract class Renderer<M extends KeyValue<any> = KeyValue<any>> {

  protected constructor(protected readonly translation: Translation<M>) {
  }

  protected sentence(str: string) {
    return str.charAt(0).toLocaleUpperCase(this.translation.locale) + str.substring(1) + "."
  }
}
