"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";

export function Dashboard() {
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
    <div className="p-10 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Feedback Dashboard
      </h1>
      <div className="flex justify-end mb-4">
        <span className="mr-2">Show Anonymous</span>
        <Switch checked={showAnonymous} onCheckedChange={setShowAnonymous} />
      </div>
      <div className="space-y-4">
        {feedbacks.map((item, index) => (
          <Card
            key={index}
            className="p-4 bg-gray-800 border-gray-700 shadow-md rounded-lg"
          >
            <CardContent>
              <h2 className="font-semibold text-lg">
                {showAnonymous ? "Anonymous" : item.name || "Anonymous"}
              </h2>
              <p className="mt-1">{item.feedback}</p>
              <span className="text-sm text-gray-400 block mt-2">
                {new Date(item.createdAt).toLocaleString()}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
export default Dashboard;
