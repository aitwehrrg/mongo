"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [feedback, setFeedback] = useState("");

  const submitFeedback = async () => {
    if (!feedback.trim()) return;
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feedback }),
    });
    setFeedback("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <Card className="w-96 p-6 bg-gray-800 border-gray-700">
        <CardContent>
          <h1 className="text-xl font-bold mb-4">Submit Anonymous Feedback</h1>
          <Input
            type="text"
            placeholder="Write your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="mb-4"
          />
          <Button onClick={submitFeedback} className="w-full">
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}