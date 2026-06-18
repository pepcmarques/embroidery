import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-admin-key'];
    const expectedKey = process.env.ADMIN_API_KEY;
    if (!expectedKey) {
      // No key set, deny by default
      throw new UnauthorizedException('Admin API key not configured');
    }
    if (apiKey !== expectedKey) {
      throw new UnauthorizedException('Invalid API key');
    }
    return true;
  }
}
