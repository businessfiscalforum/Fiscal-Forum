// "use server";
// import { auth, clerkClient } from "@clerk/nextjs/server";
// import { Roles } from "../../../types/globals";
// import { revalidatePath } from "next/cache";

// export async function setRole (formData:FormData){
//     const { sessionClaims } = await auth();
//     if (sessionClaims?.metadata?.role !== 'ADMIN') {
//         throw new Error("Unauthorized");
//     }
//     const client = await clerkClient();
//     const userId = formData.get("userId") as string;
//     const role = formData.get("role") as Roles;

//     try {
//         await client.users.updateUser(userId, {
//             publicMetadata: {
//                 role
//             },
//         });
//     }
//     catch (error) {
//         console.error("Error updating user role:", error);
//         throw new Error("Failed to update user role");
//     }
// }

// export async function removeRole(formData: FormData) {
//     const { sessionClaims } = await auth();
//     if (sessionClaims?.metadata?.role !== 'ADMIN') {
//         throw new Error("Unauthorized");
//     }
//     const client = await clerkClient();
//     const userId = formData.get("userId") as string;

//     try {
//         await client.users.updateUser(userId, {
//             publicMetadata: {
//                 role: "NULL"
//             },
//         });
//         revalidatePath("/admin");
//     }
//     catch (error) {
//         console.error("Error removing user role:", error);
//         throw new Error("Failed to remove user role");
//     }
// }