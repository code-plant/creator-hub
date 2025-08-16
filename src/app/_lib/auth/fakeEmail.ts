export const FAKE_EMAIL_SUFFIX = "@creator-hub.localhost";

export function fakeEmail(userId: string) {
  return `${userId}${FAKE_EMAIL_SUFFIX}`;
}
