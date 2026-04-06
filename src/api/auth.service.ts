import { api } from "./http";
import type {
  RegisterRequest,
  LoginRequest,
  AuthResponse,
} from "@/types/auth.types";

export const authService = {
  register: (payload: RegisterRequest): Promise<AuthResponse> => {
    return api.post<AuthResponse>("auth/register", payload);
  },

  login: (payload: LoginRequest): Promise<AuthResponse> => {
    return api.post<AuthResponse>("auth/login", payload);
  },
};
