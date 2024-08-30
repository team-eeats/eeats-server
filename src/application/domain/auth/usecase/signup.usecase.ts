import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { UserPort } from "../../user/spi/user.spi";
import { User } from "../../user/user";
import { Authority } from "../../user/enum/authority";
import * as bcrypt from "bcrypt";
import { SignupRequest, TokenResponse } from "../dto/auth.dto";
import { JwtPort } from '../spi/auth.spi';

@Injectable()
export class SignupUseCase {
  constructor(
    @Inject(UserPort)
    private readonly userPort: UserPort,
    @Inject(JwtPort)
    private readonly jwtPort: JwtPort
  ) {}

  async execute(req: SignupRequest): Promise<TokenResponse> {
    const existingUser = await this.userPort.queryUserByNickname(req.nickname);
    if (existingUser) {
      throw new ConflictException("Nickname Already In Use");
    }

    const hashedPassword = await bcrypt.hash(req.password, 10);

    const user = new User(
      req.accountId,
      hashedPassword,
      req.nickname,
      null,
      Authority.user
    );

    await this.userPort.saveUser(user);

    return this.jwtPort.generateToken(user.id);
  }
}
