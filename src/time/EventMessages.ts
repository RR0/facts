import {BirthMessage} from "time/people/birth/BirthMessage"
import {FoundationMessage} from "time/org/foundation/FoundationMessage"
import {OccupationMessage} from "time/people/occupation/OccupationMessage"
import {StudyMessage} from "time/people/study/StudyMessage"


export interface EventMessages {
  default: string
  people: {
    born: BirthMessage
    occupation: OccupationMessage
    study: StudyMessage
  },
  org: {
    foundation: FoundationMessage
  }
}


export interface WithEventMessages {
  event: EventMessages
}
