import { unwrapNonNullable } from "../../../../../../common/utils/unwrapNonNullable";
import { PrismaSession } from "../../../../../framework/infrastructure/PrismaSession";
import { I18nString } from "../../../../shared/domain/models/I18nString";
import { Locale } from "../../../../shared/domain/models/Locale";
import { UserId } from "../../../../shared/domain/models/UserId";
import { AuthAll } from "../../../AuthAll";
import { UserEmailRcRepository } from "../../../shared/domain/repositories/UserEmailRcRepository";
import { User } from "../models/User";
import { AuthenticationRepository } from "../repositories/AuthenticationRepository";

const defaultName: Record<Locale, string> = {
  en: "New User",
  ko: "새 사용자",
};

export class AuthenticationDomainService {
  private readonly authenticationRepository: AuthenticationRepository;
  private readonly userEmailRcRepository: UserEmailRcRepository;

  constructor({
    authenticationRepository,
    userEmailRcRepository,
  }: Pick<AuthAll, "authenticationRepository" | "userEmailRcRepository">) {
    this.authenticationRepository = authenticationRepository;
    this.userEmailRcRepository = userEmailRcRepository;
  }

  async createUser(locale: Locale): Promise<User> {
    return await this.authenticationRepository.create(
      I18nString.fromInput({
        original: locale,
        translations: { [locale]: defaultName[locale] },
      })
    );
  }

  async updateEmailAsVerified(
    session: PrismaSession,
    id: UserId,
    email: string,
    emailVerified: Date
  ): Promise<User> {
    const userEmailRc = unwrapNonNullable(
      await this.userEmailRcRepository.get(email)
    );
    if (userEmailRc.userId !== id) {
      throw new Error("Email is not owned by the user");
    }
    userEmailRc.verifiedAt = emailVerified;
    await this.userEmailRcRepository.save(session, userEmailRc);
    return unwrapNonNullable(await this.authenticationRepository.find(id));
  }
}
