"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "../context/UserDetailContext";

// Match with your DB schema
export type UsersDetail = {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  role: "USER" | "ADMIN" | "AGENT" | "PARTNER";
  status: "PENDING" | "APPROVED" | "REJECTED" | "BANNED";
};

function Provider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const [userDetail, setUserDetail] = useState<UsersDetail | null>(null);

  useEffect(() => {
    if (user && isLoaded) {
      createNewUser();
    }
  }, [user, isLoaded]);

  const createNewUser = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);
      setUserDetail(res.data); 
      console.log(res.data);
    } catch (error) {
      console.error("Error creating or fetching user:", error);
    }
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export default Provider;
