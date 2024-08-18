"use client";
import Image from 'next/image';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";
import getstripe from "../utils/get-stripe.js";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link.js";

export default function Home() {
  const handleSubmit = async (planType) => {
    const response = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        origin: "http://localhost:3000",
      },
      body: JSON.stringify({ planType }),
    });

    const checkoutSessionJson = await response.json();
    console.log("response", checkoutSessionJson);
    if (response.statusCode === 500) {
      console.error(checkoutSessionJson.error.message);

      return;
    }
    const stripe = await getstripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };
  return (
    <div className="font-sans bg-gray-900 text-gray-100">
      <nav className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg fixed w-full z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-teal-400 hover:text-teal-300 transition-colors duration-300">
              <a href="/"><img src="/logo.png" alt="logo" className="w-36" /></a>
            </h1>
            <div className="flex gap-4">
              <SignedOut>
                <a
                  href="/sign-in"
                  className="px-4 py-2 bg-teal-500 text-black rounded-full hover:bg-teal-400 transition-all duration-300 transform hover:scale-105"
                >
                  Sign In
                </a>
                <a
                  href="/sign-up"
                  className="px-4 py-2 border border-teal-500 text-teal-500 rounded-full hover:bg-teal-500 hover:text-black transition-all duration-300 transform hover:scale-105"
                >
                  Sign Up
                </a>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-24">
        <section className="text-center my-16 animate-fade-in-down">
          <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            Welcome To FlashLearn
          </h1>
          <p className="text-xl mb-8 text-gray-400">
            Create Flashcards Effortlessly from Your Text
          </p>
          <a
            href="/dashboard"
            className="inline-block px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full hover:from-teal-400 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Get Started
          </a>
        </section>

        <section className="my-24">
          <h2 className="text-4xl mb-12 text-center font-bold text-teal-400">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "AI-Powered Creation",
              "Interactive Learning",
              "Progress Tracking",
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-4xl mb-4 text-teal-400">
                  {["🧠", "🔄", "📊"][index]}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-teal-300">
                  {feature}
                </h3>
                <p className="text-gray-400">
                  Experience next-gen learning with our cutting-edge features
                  designed to enhance your study sessions.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="my-24 text-center">
          <h2 className="text-4xl mb-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            Pricing
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Choose Your Learning Journey
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Basic",
                price: "Free",
                color: "from-gray-600 to-gray-700",
                features: ["Limited Storage", "Basic Support"],
              },
              {
                name: "Pro",
                price: "$5/month",
                color: "from-teal-600 to-blue-600",
                features: ["Increased Storage", "Priority Support"],
              },
              {
                name: "Enterprise",
                price: "Custom",
                color: "from-purple-600 to-pink-600",
                features: ["Advanced Security", "Dedicated Account Manager"],
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br ${plan.color}`}
              >
                <h4 className="text-2xl font-bold mb-2">{plan.name}</h4>
                <p className="text-3xl font-bold mb-6">{plan.price}</p>
                <ul className="mb-8 text-left">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="mb-2 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>{" "}
                       {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full px-6 py-3 bg-white text-gray-900 rounded-full font-bold hover:bg-opacity-90 transition-all duration-300" onClick={() => {
                  if (plan.name === 'Basic') {
                    // Navigate to /dashboard
                    window.location.href = '/dashboard';
                  } else if (plan.name === 'Pro') {
                    // Call handleSubmit function with 'pro' argument
                    handleSubmit('pro');
                  }
                }}>
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </section>
        <section className="my-24">
  <h2 className="text-4xl mb-12 text-center font-bold text-teal-400">
    Our Team
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {[
      {
        name: "Ayyan Akbar",
        role: "Software Engineer",
        image: "/ayyan.png",
        github: "https://github.com/raoayyan",
        linkedin: "http://linkedin.com/in/ayyan-akbar-a13ba4225",
      },
      {
        name: "MOHAMMED IQRAMUL",
        role: "Full Stack Developer",
        image: "/Iq.jfif",
        github: "https://github.com/MOHAMMED-IQRAMUL",
        linkedin: "https://www.linkedin.com/in/mohammed-iqramul/",
      },
      {
        name: "Hamza Anwar",
        role: "Security",
        image: "/avatar-1.png",
        github: "https://github.com/",
        linkedin: "https://www.linkedin.com/in/m-hamza-anwar/",
      },
      {
        name: "Emily Davis",
        role: "Product Manager",
        image: "/avatar-1.png",
        github: "https://github.com/",
        linkedin: "https://linkedin.com/",
      },
    ].map((member, index) => (
      <div
        key={index}
        className="p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center"
      >
        <img
          src={member.image}
          alt={member.name}
          className="w-24 h-24 rounded-xl mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold mb-2 text-teal-300">
          {member.name}
        </h3>
        <p className="text-gray-400 mb-4">{member.role}</p>
        <div className="flex justify-center space-x-4">
          <a
            href={member.github}
            className="text-gray-400 hover:text-teal-300 transition-colors duration-300"
          >
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.867 8.166 6.839 9.489.5.092.682-.217.682-.483v-1.691c-2.782.605-3.369-1.342-3.369-1.342-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.03 1.53 1.03.892 1.528 2.341 1.087 2.91.832.092-.647.35-1.086.637-1.337-2.22-.253-4.555-1.11-4.555-4.942 0-1.091.39-1.984 1.03-2.683-.103-.253-.447-1.27.098-2.646 0 0 .841-.27 2.75 1.027a9.577 9.577 0 012.503-.338 9.563 9.563 0 012.503.338c1.908-1.297 2.75-1.027 2.75-1.027.546 1.376.202 2.393.1 2.646.64.699 1.03 1.592 1.03 2.683 0 3.842-2.337 4.685-4.563 4.933.36.31.683.92.683 1.856v2.75c0 .268.182.578.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href={member.linkedin}
            className="text-gray-400 hover:text-teal-300 transition-colors duration-300"
          >
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M19 3A2.997 2.997 0 0116 6a2.997 2.997 0 013 3v12a2.997 2.997 0 01-3 3H5a2.997 2.997 0 01-3-3V9c0-1.657 1.343-3 3-3h11v3H5v12h11V9h2V6h-2a2.997 2.997 0 013-3zm-7 7v10H7V10h5zm-2.5 0c-.828 0-1.5.672-1.5 1.5S8.672 13 9.5 13s1.5-.672 1.5-1.5S10.328 10 9.5 10zM17 10v10h-5V10h5zm-2.5 0c-.828 0-1.5.672-1.5 1.5S13.672 13 14.5 13s1.5-.672 1.5-1.5S15.328 10 14.5 10z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    ))}
  </div>
</section>

      </main>

      <footer className="bg-black bg-opacity-50 py-12 mt-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h5 className="text-lg font-semibold mb-4 text-teal-400">
                About Us
              </h5>
              <p className="text-gray-400">
                Revolutionizing learning through AI-powered flashcards.
              </p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4 text-teal-400">
                Quick Links
              </h5>
              <ul className="space-y-2">
                {["Home", "Features", "Pricing", "Contact"].map(
                  (link, index) => (
                    <li key={index}>
                      <a
                        href={`/${link.toLowerCase()}`}
                        className="text-gray-400 hover:text-teal-300 transition-colors duration-300"
                      >
                        {link}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4 text-teal-400">
                Connect
              </h5>
              <div className="flex justify-center md:justify-start space-x-4">
                {["twitter", "facebook", "instagram", "github"].map(
                  (social) => (
                    <a
                      key={social}
                      href={`https://${social}.com`}
                      className="text-gray-400 hover:text-teal-300 transition-colors duration-300"
                    >
                      <span className="sr-only">{social}</span>
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} FlashLearn AI. Empowering minds, one
              card at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
