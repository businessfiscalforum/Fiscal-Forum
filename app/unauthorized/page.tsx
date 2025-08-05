// app/unauthorized/page.tsx
export default function UnauthorizedPage() {
  return <div className="text-red-600 text-2xl p-6">🚫 Access Denied: You are not an admin.</div>
}


//app
//   /admin
//     /page.tsx              → Admin landing (public)
//     /dashboard/page.tsx    → Admin dashboard (admin only)
//     /post
//       /story/page.tsx      → Admin-only: Post story
//       /news/page.tsx       → Admin-only: Post news
//       /research/page.tsx   → Admin-only: Post research

//   /user
//     /page.tsx              → User landing (public)
//     /dashboard/page.tsx    → Authenticated users only

//   /unauthorized/page.tsx   → Common access denied page

//   /sign-in/[[...sign-in]]/page.tsx → Clerk auth
//   /sign-up/[[...sign-up]]/page.tsx → Clerk auth

// /middleware.ts
