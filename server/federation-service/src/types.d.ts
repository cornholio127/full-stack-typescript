export interface JwtPayload {
  uid: number;
  sid: string;
  exp?: number;
  iat?: number;
}

export interface AuthContext {
  userId?: number;
  sessionId?: string;
}
