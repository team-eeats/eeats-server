import { Inject, Injectable } from "@nestjs/common";
import { UserPort } from "../spi/user.spi";
import { User } from "../user";

@Injectable()
export class UpdateProfileUseCase {
  constructor(
    @Inject(UserPort)
    private readonly userPort: UserPort
  ) {}

  async execute(user: User, profileUrl: string) {
    user.updateProfileUrl(profileUrl);
    await this.userPort.saveUser(user);
  }
}
