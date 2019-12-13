export interface JwtPayload {
  uid: number;
  sid: string;
  exp?: number;
  iat?: number;
}
