import { createContext } from "react";
import { UsersDetail } from "../app/provider";

export const UserDetailContext = createContext<{
  userDetail: UsersDetail | null;
  setUserDetail: React.Dispatch<React.SetStateAction<UsersDetail | null>>;
}>({
  userDetail: null,
  setUserDetail: () => {}, // no-op default
});
