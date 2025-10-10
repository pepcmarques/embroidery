export interface User {
  id: string;
  email: string;
  name?: string;
  password: string;
  is_admin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Export product types
export * from './product.types';

export interface CreateUserDto {
  email: string;
  name?: string;
  password: string;
  is_admin?: boolean;
}
