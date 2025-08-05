export {};
export type Roles = "ADMIN" | "USER" | "AGENT" | "PARTNER" | "NULL";
declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
