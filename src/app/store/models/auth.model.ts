import { User } from "../../shared/models/user";

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: any;
}
