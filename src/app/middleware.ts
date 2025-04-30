import { NextResponse } from "next/server";
import { getAuth } from "firebase/auth";
import { auth } from "@/firebase/firebase"; // Adjust path if necessary

export function middleware(request: Request) {
  const url = new URL(request.url);
  const isAuthenticated = getAuth().currentUser; // Directly use getAuth() without passing auth

  // Define protected routes
  const protectedRoutes = ["/home", "/dashboard", "/profile"]; // Add your protected routes here

  // If the route is protected and the user is not authenticated, redirect to login
  if (protectedRoutes.includes(url.pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next(); // Allow the request to proceed if authenticated
}

// The middleware will be applied only to the following paths:
export const config = {
  matcher: ["/home", "/logout"], // Add routes to protect here
};
