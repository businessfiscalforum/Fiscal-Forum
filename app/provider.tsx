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
  referCode?: string;
  referrerCode?: string;
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
      const userName = user?.fullName || user?.username;

      if (!userEmail) throw new Error("User email not available");

      // 1️⃣ Try fetching the user first
      const fetchRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users?email=${userEmail}`,
        { method: "GET" }
      );

      if (fetchRes.ok) {
        const data: UsersDetail = await fetchRes.json();
        setUserDetail(data);
        console.log("Fetched user:", data);
        return;
      }

      // 2️⃣ If user not found (404), create one
      if (fetchRes.status === 404) {
        // Check if there's a referral code in localStorage
        const referralCode = localStorage.getItem("referralCode");
        const requestBody: Record<string, any> = {
          email: userEmail,
          name: userName,
        };
        if (referralCode) {
          requestBody.referralCode = referralCode;
        }

        const createRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        if (!createRes.ok) {
          throw new Error(`Failed to create user: ${createRes.statusText}`);
        }

        const newData: UsersDetail = await createRes.json();
        setUserDetail(newData);
        console.log("Created new user:", newData);

        // Clear referralCode from localStorage after success
        if (referralCode) {
          localStorage.removeItem("referralCode");
        }
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
