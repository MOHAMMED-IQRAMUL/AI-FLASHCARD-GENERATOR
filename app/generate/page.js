"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { db } from "../../firebase.js";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
} from "firebase/firestore";
import Image from "next/image.js";

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  const handleSubmit = async () => {
    setIsFetching(true);
    fetch("api/generate", {
      method: "POST",
      body: text,
    })
      .then((res) => res.json())
      .then((data) => {
        setFlashcards(data);
        setIsFetching(false);
      });
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const saveFlashcards = async () => {
    if (!name) {
      alert("Please enter a name ");
      return;
    }
    setSaving(true);
    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, "users"), user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      if (collections.includes(name)) {
        alert("Collection with this name already exists");
        return;
      } else {
        collections.push({ name });
        batch.set(userDocRef, { flashcards: collections });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }

    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });

    await batch.commit();
    setSaving(false);
    handleClose();
    setOpenAlert(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-mono">
      <nav className="fixed top-0 w-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-teal-400 hover:text-teal-300 transition-colors duration-300">
          <a href="/dashboard"><img src="/logo.png" alt="logo" className="w-36" /></a>
          </h1>
          <UserButton />
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-24 pb-12">
        <h2 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          Generate Flashcards
        </h2>

        <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter Text"
            className="w-full p-3 mb-4 bg-gray-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            rows="4"
          />
          <button
            onClick={handleSubmit}
            disabled={isFetching}
            className="w-1/3 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full font-bold text-lg hover:from-teal-400 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
          {isFetching && (
            <div className="mt-4 w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-teal-400 animate-pulse"></div>
            </div>
          )}
        </div>

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
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleOpen}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full font-bold text-lg hover:from-green-400 hover:to-teal-400 transition-all duration-300 transform hover:scale-105"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {open && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl p-6 w-96">
              <h4 className="text-2xl font-bold mb-4">Save Flashcards</h4>
              <p className="mb-4">
                Please enter a name for your flashcards collection
              </p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Collection Name"
                className="w-full p-3 mb-4 bg-gray-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={saveFlashcards}
                  disabled={saving}
                  className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-400 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {openAlert && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg">
            Flashcards saved successfully, Redirecting to Dashboard
          </div>
        )}
      </main>
    </div>
  );
}
