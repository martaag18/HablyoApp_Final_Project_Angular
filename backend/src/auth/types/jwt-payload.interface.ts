export interface JwtPayload {
  sub: string; // userId
  email: string; // email
  iat?: number; // issued at (opcional)
  exp?: number; // expiration (opcional)
}
