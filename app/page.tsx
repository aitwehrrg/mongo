"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");

  const submitFeedback = async () => {
    if (!feedback.trim() || !name.trim()) return;
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, feedback }),
    });
    setName("");
    setFeedback("");
  };

  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <header className="bg-gray-900 text-white text-center py-16">
        <h1 className="text-4xl font-bold">
          Welcome to Our Professional Website
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero.
        </p>
      </header>

      {/* Content Section */}
      <section className="py-12 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold">About Us</h2>
        <p className="mt-4 text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique. Duis cursus, mi quis viverra
          ornare, eros dolor interdum nulla.
        </p>
      </section>

      {/* Services Section */}
      <section className="py-12 bg-gray-100 px-6 text-center">
        <h2 className="text-3xl font-bold">Our Services</h2>
        <p className="mt-4 text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus
          erat at ligula vestibulum, eu posuere nisl tempor.
        </p>
      </section>

      {/* Feedback Section */}
      <section className="py-12 px-6 bg-gray-800 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Submit Anonymous Feedback</h2>
        <Card className="w-full max-w-lg mx-auto p-6 bg-gray-900 border-gray-700 shadow-lg rounded-xl">
          <CardContent className="space-y-4">
            <Input
              type="text"
              placeholder="Your name (Optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring focus:ring-gray-500"
            />
            <Textarea
              placeholder="Write your feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring focus:ring-gray-500 min-h-[100px] max-h-[300px]"
              rows={3}
            />
            <Button
              onClick={submitFeedback}
              className="w-full py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg transition-all"
            >
              Submit
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
