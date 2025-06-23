// src/auth/auth.controller.ts
import { Controller, Post, Body, Session, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
    @Session() session: any,
  ): Promise<Partial<User>> {
    const user = await this.authService.validateUser(body.username, body.password);
    session.user = { _id: user._id, username: user.username, role: user.role };
    return { _id: user._id, username: user.username, role: user.role };
  }

  @Post('logout')
  logout(@Session() session: any) {
    session.destroy();
    return { message: 'Sessão terminada' };
  }

  @Get('session')
  getSession(@Session() session: any): { user: Partial<User> | null } {
    return { user: session.user ?? null };
  }
}
