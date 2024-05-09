import { getSavedScheds, saveSched } from "./utils/api";

export function save(courseCodes: string[]) {
  try {
    saveSched({
      class_one: courseCodes[0],
      class_two: courseCodes[1],
      class_three: courseCodes[2],
      class_four: courseCodes[3],
      class_five: courseCodes[4],
    });
  } catch (err) {
    console.log("sched not saved");
  }
}

export function previous() {
  return getSavedScheds();
}
