import {CountryCode} from "place/country/CountryCode"
import {Messages} from "./Messages"
import {PlaceMessages} from "place/PlaceMessages"
import {TimeMessages} from "time/TimeMessages"
import {EventMessages} from "time/EventMessages"
import {OrgMessages} from "org/OrgMessages"
import {PeopleMessages} from "people/PeopleMessages"
import {KeyValue} from "@rr0/common"

class FrenchMessages implements Messages {
  people: PeopleMessages = {
    pronoun: {
      male: 'il',
      female: 'elle',
      neutral: 'ça'
    }
  }
  org: OrgMessages = {
    short: '${short}',
    long: '${long}',
    short_long: '<abbr title="${long}">${short}</abbr>',
    company_products: 'une société produisant des ${products:plural}',
    company_nationality: 'une société ${nationality}',
    company_nationality_products: 'une société ${nationality} produisant des ${products:plural}',
    long_school: '${long}',
    school: 'école',
    army: 'armée',
  }
  place: PlaceMessages = {
    country: {
      [CountryCode.cz]: {
        name: 'Tchéquie',
        nationality: {
          male: "tchèque",
          neutral: "tchèque",
          female: "tchèque"
        },
        state: {}
      },
      [CountryCode.cs]: {
        name: 'Tchécoslovaquie',
        nationality: {
          male: "tchécoslovaque",
          neutral: "tchécoslovaque",
          female: "tchécoslovaque"
        },
        state: {}
      },
      [CountryCode.fr]: {
        name: 'France',
        nationality: {
          male: "français",
          neutral: "français",
          female: "française"
        },
        state: {
          idf: {short: 'IDF', long: 'Île de France'}
        }
      },
      [CountryCode.sk]: {
        name: 'Slovaquie',
        nationality: {
          male: "slovaque",
          neutral: "slovaque",
          female: "slovaque"
        },
        state: {}
      },
      [CountryCode.us]: {
        name: 'États-Unis',
        nationality: {
          male: "américain",
          neutral: "américain",
          female: "américaine"
        },
        state: {
          il: {short: 'IL', long: 'Illinois'}
        }
      },
    }
  }
  event: EventMessages = {
    default: '${when} à ${where} ${type}',
    people: {
      born: {
        label: '${who} naît le ${when} à ${where}',
        child: {
          male: ", fils de ",
          female: ", fille de "
        },
        father: {
          anonymous: {
            nationality: " d'un père ${nationality}"
          }
        },
        mother: {
          anonymous: {
            nationality: " d'une mère ${nationality}"
          }
        },
        parents: {
          and: " et ",
          anonymous: {
            nationality: " de parents ${nationality}s",
            nationalities: " d'un père ${fatherNationality} et d'une mère ${motherNationality}"
          }
        }
      },
      occupation: {
        org_role_verb: "${who} travaille comme ${role} pour ${org}",
        org_verb: "$travaille pour ${org}",
        org_verb_who: "${who} travaille pour ${org}",
        org_role: "${role} pour ${org}",
        org_role_who: "${who} est ${role} chez ${org}",
      },
      study: {
        at_school_verb: "étudie ${at}${school}",
        at_school_verb_who: "${who} étudie ${at}${school}",
      }
    },
    org: {
      foundation: {
        label: '${org} est fondée le ${when} à ${where}',
        org: {
          short: '${short}',
          long: '${long}',
          short_long: '<abbr title="${long}">${short}</abbr>',
          company_products: '(une société vendant des ${products:plural})',
          company_nationality: '(une société ${nationality})',
          company_nationality_products: '(une société ${nationality} vendant des ${products:plural})',
          school: '(une école)',
          long_school: '($long)',
          army: 'armée',
        },
        founder: {
          anonymous: {
            nationality: ' par un ${nationality}'
          }
        },
        founders: {
          and: " et ",
          anonymous: {
            nationality: " par des fondateurs ${nationality}",
            nationalities: " par un fondateur ${nationality}"
          }
        }
      }
    }
  }
  time: TimeMessages = {
    before: 'avant le ${date}'
  }
  dict: KeyValue = {
    cigar: {
      male: 'cigare',
    },
    company: {
      female: 'société',
    },
    general: {
      male: 'général',
      female: 'générale'
    },
    highSchool: {
      male: 'lycée'
    },
    primarySchool: {
      female: 'école'
    },
    worker: {
      male: 'ouvrier',
      female: 'ouvrière'
    }
  }
}

export const messages_fr = new FrenchMessages()
