import {People} from "people/People"
import {City} from "place/City"
import {DateTime} from "time/DateTime"
import {HTMLEventRenderer} from "time/render/HTMLEventRenderer"
import {HTMLPeopleRenderer, PeopleNameFormat} from "people/render/HTMLPeopleRenderer"
import {HTMLTimeRenderer} from "time/render/HTMLTimeRenderer"
import {HTMLPlaceRenderer} from "place/render/HTMLPlaceRenderer"
import {HTMLOrganizationRenderer} from "org/render/HTMLOrganizationRenderer"
import {messages_fr} from "lang/Messages_fr"
import {TimeRenderFormat} from "time/Time"
import {HTMLOccupationRenderer} from "time/people/occupation/HTMLOccupationRenderer"
import {BirthEvent, BirthEventRenderOptions, OccupationFormat} from "time/people/birth/BirthEvent"
import {HTMLBirthEventRenderer} from "time/people/birth/HTMLBirthEventRenderer"
import {HTMLFoundationEventRenderer} from "time/org/foundation/HTMLFoundationEventRenderer"
import {HTMLStudyRenderer} from "time/people/study/HTMLStudyRenderer"
import {Countries} from "place/country/Countries"
import {States} from "place/state/States"
import {grammar_fr, Translation} from "@rr0/lang"
import {Gender} from "@rr0/common"


const hynek = new People(Gender.male, 'Josef', 'Hynek', `Allen`)
const chicago = new City('Chicago', States.illinois)

const translation = new Translation('fr', grammar_fr, messages_fr)
const peopleRenderer = new HTMLPeopleRenderer(translation)
const placeRenderer = new HTMLPlaceRenderer(translation)
const timeRenderer = new HTMLTimeRenderer(translation)
const orgRenderer = new HTMLOrganizationRenderer(translation, placeRenderer)
const occupationRenderer = new HTMLOccupationRenderer(translation, orgRenderer, peopleRenderer);
const birthEventRenderer = new HTMLBirthEventRenderer(translation, peopleRenderer, timeRenderer, placeRenderer, occupationRenderer);
const foundationRenderer = new HTMLFoundationEventRenderer(translation, peopleRenderer, orgRenderer, timeRenderer, placeRenderer, occupationRenderer);
const studyRenderer = new HTMLStudyRenderer(translation, orgRenderer, peopleRenderer);
const renderer = new HTMLEventRenderer(translation, placeRenderer, timeRenderer, occupationRenderer, birthEventRenderer, foundationRenderer, studyRenderer);


test('renders anonymous parents of same nationality', () => {
  const father = new People(Gender.male);
  father.events.add(new BirthEvent(father, undefined, Countries.cs))
  const mother = new People(Gender.female);
  mother.events.add(new BirthEvent(mother, undefined, Countries.cs))
  const birthEvent: BirthEvent = new BirthEvent(hynek, new DateTime(new Date(1910, 4, 1)), chicago, father, mother)
  const renderOptions: BirthEventRenderOptions = {
    verb: true,
    who: PeopleNameFormat.full,
    time: TimeRenderFormat.fullDate,
    people: PeopleNameFormat.middleAbbreviated,
    parent: {
      people: PeopleNameFormat.full,
      occupation: OccupationFormat.none
    }
  };
  const found = birthEvent.render(renderer, renderOptions)
  expect(found).toBe('Josef A. Hynek naît le dimanche 1 mai 1910 à Chicago (Illinois, États-Unis) de parents tchécoslovaques')
})


test('renders anonymous parents of different nationality', () => {
  const father = new People(Gender.male);
  father.events.add(new BirthEvent(father, undefined, Countries.cs))
  const mother = new People(Gender.female);
  mother.events.add(new BirthEvent(mother, undefined, Countries.us))
  const birthEvent: BirthEvent = new BirthEvent(hynek, new DateTime(new Date(1910, 4, 1)), chicago, father, mother)
  const renderOptions: BirthEventRenderOptions = {
    verb: true,
    who: PeopleNameFormat.full,
    time: TimeRenderFormat.fullDate,
    people: PeopleNameFormat.middleAbbreviated,
    parent: {
      people: PeopleNameFormat.full,
      occupation: OccupationFormat.none
    }
  };
  const found = birthEvent.render(renderer, renderOptions)
  expect(found).toBe("Josef A. Hynek naît le dimanche 1 mai 1910 à Chicago (Illinois, États-Unis) d'un père tchécoslovaque et d'une mère américaine")
})


test('renders parents of different nationality', () => {
  const father = new People(Gender.male, 'Joseph');
  father.events.add(new BirthEvent(father, undefined, Countries.us))
  const mother = new People(Gender.female, 'Bertha');
  mother.events.add(new BirthEvent(mother, undefined, Countries.cs))
  const bornEvent: BirthEvent = new BirthEvent(hynek, new DateTime(new Date(1910, 4, 1)), chicago, father, mother)
  const renderOptions: BirthEventRenderOptions = {
    verb: true,
    who: PeopleNameFormat.full,
    time: TimeRenderFormat.fullDate,
    people: PeopleNameFormat.middleAbbreviated,
    parent: {
      people: PeopleNameFormat.full,
      occupation: OccupationFormat.none
    }
  };
  const found = bornEvent.render(renderer, renderOptions)
  expect(found).toBe("Josef A. Hynek naît le dimanche 1 mai 1910 à Chicago (Illinois, États-Unis), fils de Joseph" +
    " (américain) et Bertha (tchécoslovaque)")
})


