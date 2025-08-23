"use client";

import React, { useEffect, useState } from "react";
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        method: "POST",
        credentials: "include", 
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch user: ${res.statusText}`);
      }

      const data: UsersDetail = await res.json();
      setUserDetail(data);
      console.log("Fetched/Created user:", data);
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
