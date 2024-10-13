type Role = "admin" | "user" | "server";

export interface JwtToken {
  userId: string;
  userName: string;
  roles: Role[];
}
