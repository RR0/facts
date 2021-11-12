import {CountriesMessage} from "place/country/CountriesMessage"


export interface PlaceMessages {
  country: CountriesMessage
}


export interface WithPlaceMessages {
  place: PlaceMessages
}
