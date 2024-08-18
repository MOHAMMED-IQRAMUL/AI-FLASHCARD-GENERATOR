"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { db } from "../../firebase.js";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { useSearchParams } from "next/navigation.js";
import Link from "next/link.js";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);

  const SearchParams = useSearchParams();
  const search = SearchParams.get("id");

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;
      const colRef = collection(doc(collection(db, "users"), user.id), search);
      const docs = await getDocs(colRef);
      const flashcards = [];

      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() });
      });

      setFlashcards(flashcards);
    }
    getFlashcard();
  }, [user, search]);

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gray-900 text-gray-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 text-gray-100">
      <header className="static top-0 w-full min-h-[100px] flex justify-between items-center px-8 py-4 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg z-10">
        <div>
          <Link href="/dashboard" passHref>
            <h1 className="text-2xl font-bold text-teal-400 hover:text-teal-300 transition-colors duration-300">
            <a href="/dashboard"><img src="/logo.png" alt="logo" className="w-36" /></a>
            </h1>
          </Link>
        </div>
        <div className="flex gap-10 font-mono">
          <Link href="/dashboard">
            <button className="text-gray-300 hover:text-teal-300 transition-colors duration-300">
              Dashboard
            </button>
          </Link>
          <Link href="/generate">
            <button className="text-gray-300 hover:text-teal-300 transition-colors duration-300">
              Generate
            </button>
          </Link>
          <Link href="/flashcards">
            <button className="text-gray-300 hover:text-teal-300 transition-colors duration-300">
              Collection
            </button>
          </Link>
        </div>
        <UserButton />
      </header>

      <main className="container mx-auto px-4 py-8">
        
          {flashcards.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Flashcards Preview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {flashcards.map((flashcard, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                  onClick={() => handleCardClick(index)}
                >
                  <div className="relative w-full h-48" style={{ perspective: '1000px' }}>
                    <div
                      className={`absolute inset-0 w-full h-full transition-transform duration-500 transform-gpu ${flipped[index] ? "rotate-y-180" : ""}`}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Front Side */}
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl flex items-center justify-center p-4" style={{ backfaceVisibility: 'hidden' }}>
                        <p className="text-lg font-bold">{flashcard.front}</p>
                      </div>
        
                      {/* Back Side */}
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center p-4 rotate-y-180" style={{ backfaceVisibility: 'hidden' }}>
                        <p className="text-lg">{flashcard.back}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
           
          </div>
        )}
       
      </main>
    </div>
  );
}
