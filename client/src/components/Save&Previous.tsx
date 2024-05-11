import { curr_Sched, getSavedScheds, saveSched } from "./utils/api";

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

export async function previous() {
  const allSched : curr_Sched[]= await getSavedScheds();
  const mostRecent = allSched[allSched.length - 1];

  const codesArray : string[] = [mostRecent.class_one, mostRecent.class_two, mostRecent.class_three, mostRecent.class_four, mostRecent.class_five]
  return codesArray;
}
