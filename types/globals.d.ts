export {};
export type Roles = "ADMIN" | "USER" | "AGENT" | "PARTNER" | "NULL";
declare global {
  interface CustomJwtSessionClaim {
    metadata: {
      role?: Roles;
    };
  }
}
