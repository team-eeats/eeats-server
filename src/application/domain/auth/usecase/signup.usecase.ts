import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { UserPort } from "../../user/spi/user.spi";
import { User } from "../../user/user";
import * as bcrypt from "bcrypt";
import { SignupRequest, TokenResponse } from "../dto/auth.dto";
import { JwtPort } from '../spi/auth.spi';
import { Authority } from '../../../../infrastructure/domain/user/persistence/user.entity';

@Injectable()
export class SignupUseCase {
  constructor(
    @Inject(UserPort)
    private readonly userPort: UserPort,
    @Inject(JwtPort)
    private readonly jwtPort: JwtPort
  ) {}

  async execute(req: SignupRequest): Promise<TokenResponse> {
    await this.checkIfUserExists(req.accountId);
    
    const user = await this.createUser(req);
    return this.jwtPort.generateToken(user.id);
  }

  private async checkIfUserExists(accountId: string): Promise<void> {
    const existingUser = await this.userPort.queryUserByAccountId(accountId);
    if (existingUser) {
      throw new ConflictException('Nickname Already In Use');
    }
  }

  private async createUser(req: SignupRequest): Promise<User> {
    const hashedPassword = await bcrypt.hash(req.password, 10);

    const user = new User(
      req.accountId,
      hashedPassword,
      req.nickname,
      req.profileUrl,
      Authority.USER
    );

    const savedUser = await this.userPort.saveUser(user);
    if (!savedUser.id) {
      throw new Error('Failed To Save User');
    }

    return savedUser;
  }
}
