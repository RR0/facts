import {Renderer} from "Renderer"
import {KeyValue} from "@rr0/common"


export type HTML = string


export class HTMLRenderer<M extends KeyValue<any> = KeyValue<any>> extends Renderer<M> {

  protected paragraph(content: HTML): HTML {
    return this.tag("p", content)
  }

  protected heading(content: HTML, level: number): HTML {
    return this.tag(`h${level}`, content)
  }

  protected h1(content: HTML): HTML {
    return this.heading(content, 1);
  }

  private tag(tag: string, content: HTML): HTML {
    return `<${tag}>${content}</${tag}>`
  }
}
