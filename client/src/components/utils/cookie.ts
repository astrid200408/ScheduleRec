import Cookies from "js-cookie";

/**This file holds functions that allow access to user tokens or "cookies" */
export function addLoginCookie(uid: string): void {
  Cookies.set("uid", uid);
}

export function removeLoginCookie(): void {
  Cookies.remove("uid");
}

export function getLoginCookie(): string | undefined {
  return Cookies.get("uid");
}
