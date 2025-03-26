"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitFeedback = async () => {
    if (!feedback.trim() || isSubmitting) return;
    setIsSubmitting(true);
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, feedback }),
    });
    setName("");
    setFeedback("");
    Toaster({ });
    setTimeout(() => setIsSubmitting(false), 3000);
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center">
      <header className="w-full max-w-5xl text-center py-20">
        <h1 className="text-5xl font-bold tracking-tight">Welcome to Our Modern Web Platform</h1>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula dui at erat pretium, eu hendrerit justo ultricies.
        </p>
      </header>
      <section className="w-full max-w-5xl grid md:grid-cols-2 gap-10 px-6">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold">Our Mission</h2>
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in urna justo. Duis eget orci nec purus vehicula feugiat.
          </p>
          <p className="text-gray-400">
            Vestibulum eget facilisis purus. Morbi congue lorem id sapien convallis tincidunt. Sed id dui nisl.
          </p>
        </div>
        <Image src="/images/modern-ui.jpg" alt="Modern UI" width={100} height={100} className="rounded-lg shadow-lg" />
      </section>
      <section className="w-full max-w-5xl mt-20">
        <h2 className="text-3xl font-semibold text-center mb-6">What We Offer</h2>
        <div className="grid md:grid-cols-3 gap-6 px-6">
          <Card className="bg-zinc-900 border border-gray-800 p-6">
            <h3 className="text-xl font-bold">Feature One</h3>
            <p className="text-gray-400 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Card>
          <Card className="bg-zinc-900 border border-gray-800 p-6">
            <h3 className="text-xl font-bold">Feature Two</h3>
            <p className="text-gray-400 mt-2">Vestibulum eget facilisis purus. Morbi congue lorem id sapien convallis.</p>
          </Card>
          <Card className="bg-zinc-900 border border-gray-800 p-6">
            <h3 className="text-xl font-bold">Feature Three</h3>
            <p className="text-gray-400 mt-2">Sed id dui nisl. Duis eget orci nec purus vehicula feugiat.</p>
          </Card>
        </div>
      </section>
      <section className="w-full max-w-lg bg-zinc-900 rounded-lg shadow-lg p-6 border border-gray-800 mt-20 mb-20">
        <h2 className="text-2xl font-semibold mb-4 text-center">Submit Anonymous Feedback</h2>
        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="Your name (Optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 bg-zinc-800 border border-gray-700 rounded-lg focus:ring focus:ring-gray-600"
          />
          <Textarea
            placeholder="Write your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="p-3 bg-zinc-800 border border-gray-700 rounded-lg focus:ring focus:ring-gray-600 min-h-[120px]"
          />
          <Button onClick={submitFeedback} disabled={isSubmitting} className="w-full py-3 text-lg font-semibold bg-white text-black rounded-lg transition hover:bg-gray-200 disabled:opacity-50">
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </CardContent>
      </section>
    </div>
  );
}

