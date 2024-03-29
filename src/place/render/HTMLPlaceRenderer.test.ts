import {HTMLPlaceRenderer} from "place/render/HTMLPlaceRenderer"
import {City} from "place/City"
import {messages_fr} from "lang/Messages_fr"
import {States} from "place/state/States"
import {grammar_fr, Translation} from "@rr0/lang"
// jest.mock('lang/Translator');

test('render city', () => {
  const translation = new Translation('fr', grammar_fr, messages_fr);
  const renderer = new HTMLPlaceRenderer(translation);
  const city = new City('Chicago', States.illinois)
  const html = renderer.renderCity(city);
  expect(html).toBe('Chicago (Illinois, États-Unis)')
})


