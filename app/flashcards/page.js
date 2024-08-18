"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { db } from "../../firebase.js";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Flashcard() {
  const [flashcards, setFlashcards] = useState([]);
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      const docRef = doc(collection(db, "users"), user.id);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { setFlashcards: [] });
      }
    }
    getFlashcards();
  }, [user]);

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-gray-900 text-gray-100">
        <div className="text-2xl font-bold animate-pulse">Loading...</div>
      </div>
    );
  }

  const handleCardClick = (id) => {
    router.push(`/flashcard/?id=${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-mono">
      <nav className="fixed top-0 w-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-teal-400 hover:text-teal-300 transition-colors duration-300">
          <a href="/dashboard"><img src="/logo.png" alt="logo" className="w-36" /></a>
          </h1>
          <div className="flex items-center space-x-6">
            <Link href="/dashboard" className="text-gray-300 hover:text-teal-300 transition-colors duration-300">
              Dashboard
            </Link>
            <Link href="/generate" className="text-gray-300 hover:text-teal-300 transition-colors duration-300">
              Generate
            </Link>
            <UserButton />
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-24 pb-12">
        <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          Choose a flashcard set
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashcards.map((flashcard, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(flashcard.name)}
              className="bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-teal-300 mb-2">{flashcard.name}</h3>
                <p className="text-gray-400">Click to view flashcards</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
