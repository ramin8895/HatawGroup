// {
//   "titleDefaultIsEn": true,
//   "duplicateEventAllow": true,
//   "titleEnglish": "string",
//   "titleKordish": "string",
//   "startdate": "2025-12-14T06:50:48.549Z",
//   "enddate": "2025-12-14T06:50:48.549Z",
//   "descriptionEnglish": "string",
//   "descriptionKordish": "string",
//   "code": 0,
//   "score": 0
// }

interface EventType {
  id?:number
  titleDefaultIsEn: boolean;
  duplicateEventAllow: boolean;
  titleEnglish: string;
  titleKordish: string;
  startdate: string;
  enddate: string;
  descriptionEnglish: string;
  descriptionKordish: string;
  code: number;
  score: number;
}
