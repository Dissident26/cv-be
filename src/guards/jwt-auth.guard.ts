import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'dev_secret'; // In production, use env vars
// This import will be updated in user.resolver.ts to pass issuedTokens

export class JwtAuthGuard implements CanActivate {
  private issuedTokens: Set<string>;
  constructor(issuedTokens: Set<string>) {
    this.issuedTokens = issuedTokens;
  }
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader || typeof authHeader !== 'string') throw new UnauthorizedException('No auth header');
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) throw new UnauthorizedException('Invalid auth header');
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      if (!this.issuedTokens.has(token)) throw new UnauthorizedException('Token not issued');
      req.user = payload;
      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
} 