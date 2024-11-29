export interface UserDto {
  exp: boolean;
  id: `${string}-${string}-${string}-${string}-${string}`; // UUID format
  sub: string;
  email: string;
  username: string;
  permissions: string[];
}
