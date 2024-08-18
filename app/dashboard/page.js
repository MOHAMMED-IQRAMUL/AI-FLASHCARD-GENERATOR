"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BackButton() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <div className="w-full min-h-screen font-mono bg-gray-900 text-gray-100">
      <nav className="fixed top-0 w-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-teal-400 hover:text-teal-300 transition-colors duration-300">
            <a href="/"><img src="/logo.png" alt="logo" className="w-36" /></a>
            </h1>
            <div className="flex items-center gap-6">
             
              <UserButton />
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-4">
        <h2 className="text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          WELCOME
        </h2>

        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Generate New Flashcard Collection */}
            <div className="bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 flex flex-col justify-between min-h-[300px]">
              <h3 className="text-2xl font-semibold text-teal-300 mb-4">
                GENERATE NEW FLASHCARD COLLECTION
              </h3>
              <Link href="/generate" className="mt-auto">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full font-bold text-lg hover:from-teal-400 hover:to-blue-400 transition-all duration-300 transform hover:scale-105">
                  GENERATE
                </button>
              </Link>
            </div>

            {/* See Your Saved Collections */}
            <div className="bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 flex flex-col justify-between min-h-[300px]">
              <h3 className="text-2xl font-semibold text-teal-300 mb-4">
                See Your Saved Collections
              </h3>
              <Link href="/flashcards" className="mt-auto">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold text-lg hover:from-purple-400 hover:to-pink-400 transition-all duration-300 transform hover:scale-105">
                  COLLECTION
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}