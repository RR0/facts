import {BirthEvent, BirthEventRenderer, BirthEventRenderOptions} from "./BirthEvent"
import {TimeRenderer} from "../../Time"
import {People, PeopleRenderer} from "../../../people/People"
import {OccupationEvent, OccupationEventRenderer} from "../occupation/OccupationEvent"
import {Country} from "../../../place/country/Country"
import {HTML, HTMLRenderer} from "../../../HTMLRenderer"
import {Place, PlaceRenderer} from "../../../place/Place"
import {WithEventMessages} from "../../EventMessages"
import {Translation} from "@rr0/lang"
import {Gender} from "@rr0/common"

export class HTMLBirthEventRenderer extends HTMLRenderer implements BirthEventRenderer<HTML> {

  constructor(
    translation: Translation<WithEventMessages>,
    private peopleRenderer: PeopleRenderer<HTML>,
    private timeRenderer: TimeRenderer<HTML>,
    private placeRenderer: PlaceRenderer<HTML>,
    private occupationRenderer: OccupationEventRenderer<HTML>
  ) {
    super(translation);
  }

  renderBirth(birth: BirthEvent, options: BirthEventRenderOptions): HTML {
    const birthPlace = birth.where
    const birthTime = birth.when
    const baby = birth.who
    const bornMsg = this.translation.messages.event.people.born
    const born = this.translation.translate(bornMsg.label, {
      who: this.peopleRenderer.render(baby, options.people),
      when: birthTime ? birthTime.render(this.timeRenderer, options.time) : '',
      where: birthPlace ? birthPlace.render(this.placeRenderer) : '',
    })
    const parents = this.parents(birth, options, baby, birthPlace);
    return born + parents
  }

  private parents<R>(birth: BirthEvent, options: BirthEventRenderOptions, baby: People, birthPlace?: Place) {
    const birthCountry = birthPlace?.country
    let fatherName = '', fatherNationality
    const father = birth.father
    {
      if (father) {
        fatherName = this.peopleRenderer.render(father, options.parent.people)
        fatherNationality = this.nationality(father, birthCountry)
      }
    }
    let motherName = '', motherNationality
    const mother = birth.mother
    {
      if (mother) {
        motherName = this.peopleRenderer.render(mother, options.parent.people)
        motherNationality = this.nationality(mother, birthCountry)
      }
    }
    const bornMsg = this.translation.messages.event.people.born
    let parents = ''
    if (fatherName || motherName) {
      parents += this.translation.translate(bornMsg.child[baby.gender])
      parents += this.parentNationality(fatherName, fatherNationality, father?.gender)
      const occupations = father!.events.findOfType(OccupationEvent);
      if (occupations.length > 0) {
        let occupationAtBirth: OccupationEvent | undefined = undefined
        for (const occupation of occupations) {
          occupationAtBirth = occupation as OccupationEvent
          if (occupation.isAfter(birth)) {
            break;
          }
        }
        if (occupationAtBirth) {
          parents += occupationAtBirth.render(this.occupationRenderer, options.parent.occupation)
        }
      }
      if (fatherName && motherName) {
        parents += this.translation.translate(bornMsg.parents.and)
      }
      parents += this.parentNationality(motherName, motherNationality, mother?.gender)
    } else {
      const anonParentsMsg = bornMsg.parents.anonymous
      if (fatherNationality === motherNationality) {
        parents += this.translation.translate(anonParentsMsg.nationality, {nationality: fatherNationality})
      } else {
        parents += this.translation.translate(anonParentsMsg.nationalities, {fatherNationality, motherNationality})
      }
    }
    return parents;
  }

  private parentNationality(fatherName?: string, nationality?: string, gender?: Gender) {
    let parentNationality = ''
    if (fatherName) {
      parentNationality += fatherName
      if (nationality) {
        parentNationality += ` (${nationality})`
      }
    } else if (nationality) {
      parentNationality += this.translation.translate(this.translation.messages.event.born[gender === Gender.male ? 'father' : 'mother'].anonymous.nationality, {nationality})
    }
    return parentNationality
  }

  private nationality<R>(parent: People, birthCountry?: Country): HTML {
    const fatherBirthCountry = parent.birthCountry
    let nationality = ''
    if (birthCountry !== fatherBirthCountry) {
      nationality += fatherBirthCountry?.renderNationality(this.placeRenderer, parent.gender)
    }
    return nationality
  }
}
