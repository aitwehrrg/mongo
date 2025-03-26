"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [feedbacks, setFeedbacks] = useState<
    { name: string; feedback: string; createdAt: Date }[]
  >([]);
  const [showAnonymous, setShowAnonymous] = useState(false);

  useEffect(() => {
    async function fetchFeedbacks() {
      const res = await fetch("/api/feedback");
      const data = await res.json();
      setFeedbacks(data);
    }
    fetchFeedbacks();
  }, []);

  return (
    <div className="p-10 bg-black text-white min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Feedback Dashboard
      </h1>
      <div className="flex justify-end w-full max-w-3xl mb-4">
        <span className="mr-2 text-gray-400">Show Anonymous</span>
        <Switch checked={showAnonymous} onCheckedChange={setShowAnonymous} />
      </div>
      <div className="w-full max-w-3xl space-y-4">
        {feedbacks.map((item, index) => (
          <Card
            key={index}
            className="p-4 bg-zinc-900 border border-gray-800 shadow-md rounded-lg"
          >
            <CardContent>
              <h2 className="font-semibold text-lg">
                {showAnonymous ? "Anonymous" : item.name || "Anonymous"}
              </h2>
              <p className="mt-1 text-gray-300">{item.feedback}</p>
              <span className="text-sm text-gray-500 block mt-2">
                {new Date(item.createdAt).toLocaleString()}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
