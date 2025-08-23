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
      const userEmail = user?.emailAddresses[0]?.emailAddress;
      const userName = user?.fullName || "Anonymous";

      if (!userEmail) throw new Error("User email not available");

      // First, try fetching the user
      const fetchRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users?email=${userEmail}`, {
        method: "GET",
      });

      if (fetchRes.ok) {
        const data: UsersDetail = await fetchRes.json();
        setUserDetail(data);
        console.log("Fetched user:", data);
        return;
      }

      // If user not found, create a new one
      if (fetchRes.status === 404) {
        const createRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail, name: userName }),
        });

        if (!createRes.ok) {
          throw new Error(`Failed to create user: ${createRes.statusText}`);
        }

        const newData: UsersDetail = await createRes.json();
        setUserDetail(newData);
        console.log("Created new user:", newData);
        return;
      }

      throw new Error(`Failed to fetch user: ${fetchRes.statusText}`);
    } catch (error) {
      console.error("Error fetching or creating user:", error);
    }
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export default Provider;
