"use client";

import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "./globals.css";

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  // If signed in, immediately go to dashboard
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/dashboard");
    }
  }, [isSignedIn, isLoaded, router]);

  // Avoid showing anything until Clerk finishes loading
  if (!isLoaded || isSignedIn) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('https://i.postimg.cc/zG86y6jz/workout-collage-bigger-text.png')] bg-contain bg-no-repeat bg-center">
      <SignInButton afterSignInUrl="/dashboard">
        <button className="text-white font-medium cursor-pointer absolute top-90 left-170">
          Login
        </button>
      </SignInButton>

      <SignUpButton afterSignUpUrl="/dashboard">
        <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base sm:h-12 sm:px-5 cursor-pointer absolute top-130 left-170">
          Sign Up
        </button>
      </SignUpButton>
    </div>
  );
}
