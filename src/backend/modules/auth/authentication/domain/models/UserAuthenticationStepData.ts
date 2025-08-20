export interface UserAuthenticationStepDataEmail {
  type: "email";
  email: string;
}

export interface UserAuthenticationStepDataPassword {
  type: "password";
  passwordHashAndSalt: string;
}

export interface UserAuthenticationStepDataOauth2 {
  type: "oauth2";
  provider: string;
  providerAccountId: string;
}

export type UserAuthenticationStepData =
  | UserAuthenticationStepDataEmail
  | UserAuthenticationStepDataPassword
  | UserAuthenticationStepDataOauth2;
