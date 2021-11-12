import {City, CityRenderer} from "place/City"
import {Place, PlaceRenderer} from "place/Place"
import {Country} from "place/country/Country"
import {State} from "place/state/State"
import {HTML, HTMLRenderer} from "HTMLRenderer"
import {WithPlaceMessages} from "place/PlaceMessages"
import {Translation} from "@rr0/lang"
import {Gender} from "@rr0/common"


export class HTMLPlaceRenderer extends HTMLRenderer implements PlaceRenderer<HTML>, CityRenderer<HTML> {

  constructor(translation: Translation<WithPlaceMessages>) {
    super(translation)
  }

  render(place: Place): HTML {
    return place.name
  }

  renderCity(city: City): HTML {
    return `${city.name} (${this.renderState(city.state)})`;
  }

  renderCountry(country: Country): HTML {
    return this.translation.translate(this.translation.messages.place.country[country.name].name);
  }

  renderNationality(country: Country, gender: Gender): HTML {
    return this.translation.translate(this.translation.messages.place.country[country.name].nationality[gender]);
  }

  renderState(state: State): HTML {
    return `${state.name}, ${this.renderCountry(state.country)}`;
  }
}
