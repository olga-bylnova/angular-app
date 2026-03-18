import { User } from "../../shared/models/user";

export interface UserState {
  users: User[];
  loading: boolean;
  error: any;
}
