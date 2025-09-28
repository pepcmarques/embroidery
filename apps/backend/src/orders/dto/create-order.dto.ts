import { IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  @IsString()
  sessionId?: string; // For guest checkout (will require login)
}
