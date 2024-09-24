import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '@/domain/dtos/token-dto';

export class TokenAdapter {
  async generateToken(
    timeToExpire: number,
    payload: TokenPayload,
  ): Promise<string> {
    const secret = process.env.ATTENDANCE_TOKEN_SECRET;
    const expiresIn = timeToExpire;

    return await new JwtService().signAsync(payload, {
      secret: secret,
      expiresIn: `${expiresIn}m`,
    });
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      const secret = process.env.ATTENDANCE_TOKEN_SECRET;

      await new JwtService().verifyAsync(token, {
        secret: secret,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  decodeToken(token: string): TokenPayload {
    return new JwtService().decode(token) as TokenPayload;
  }
}
