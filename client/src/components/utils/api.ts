import { get } from "https";
import { getLoginCookie } from "./cookie";

const HOST = "http://localhost:3232";

interface Course {
  code: string;
  name: string;
  prof: string;
}

export interface recCourseCall {
  sched_diffic_wanted: string;
  class_amt_wanted: string;
  current_schedule_difficulty: string;
  filter: string
  class_one: string;
  class_two: string;
  class_three: string;
  class_four: string;
  class_five: string;
}

export interface curr_Sched {
  class_one: string;
  class_two: string;
  class_three: string;
  class_four: string;
  class_five: string;
}

async function queryAPI(
  endpoint: string,
  query_params: Record<string, string>
) {
  // query_params is a dictionary of key-value pairs that gets added to the URL as query parameters
  // e.g. { foo: "bar", hell: "o" } becomes "?foo=bar&hell=o"
  const paramsString = new URLSearchParams(query_params).toString();
  const url = `${HOST}/${endpoint}?${paramsString}`;
  const response = await fetch(url);
  if (!response.ok) {
    console.error(response.status, response.statusText);
  }
  console.log(response);
  return response.json();
}

export async function courseRecCall(courseCall: recCourseCall) {
  return await queryAPI("recommend-courses", {
    schedule_diffic_wanted: courseCall.sched_diffic_wanted,
    class_amt_wanted: courseCall.class_amt_wanted,
    current_schedule_difficulty: courseCall.current_schedule_difficulty,
    filter: courseCall.filter,
    class_one: courseCall.class_one,
    class_two: courseCall.class_two,
    class_three: courseCall.class_three,
    class_four: courseCall.class_four,
    class_five: courseCall.class_five,
  });
}

export async function curr_sched_diffic(curr_sched: curr_Sched) {
  return await queryAPI("get-difficulty", {
    class_one: curr_sched.class_one,
    class_two: curr_sched.class_two,
    class_three: curr_sched.class_three,
    class_four: curr_sched.class_four,
    class_five: curr_sched.class_five,
  });
}

export async function getCourse(course: string) {
  return await queryAPI("get-course-object", {
    class_code: course,
  });
}

export async function saveSched(curr_sched: curr_Sched) {
  return await queryAPI("add-courses", {
    uid: getLoginCookie() || "",
    class_one: curr_sched.class_one,
    class_two: curr_sched.class_two,
    class_three: curr_sched.class_three,
    class_four: curr_sched.class_four,
    class_five: curr_sched.class_five,
  });
}

export async function getSavedScheds() {
  return await queryAPI("get-saved-scheds", {
    uid: getLoginCookie() || "",
  });
}
