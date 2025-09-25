export {};
export type Roles = "ADMIN" | "USER" | "AGENT" | "PARTNER" | "NULL";

declare module '*.css';

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}