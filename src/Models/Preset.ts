import Phrase from "./Phrase";

export default interface Preset {
  index?: number,
  topic?: string,
  chapter?: number,
  page?: number,
  list: Phrase[],
}
