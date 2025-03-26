import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

export function Dashboard() {
  const [feedbacks, setFeedbacks] = useState<
    { feedback: string; createdAt: Date }[]
  >([]);

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
      <h1 className="text-2xl font-bold mb-6">Feedback Dashboard</h1>
      <div className="space-y-4">
        {feedbacks.map((item, index) => (
          <Card key={index} className="p-4 bg-gray-800 border-gray-700">
            <CardContent>
              <p>{item.feedback}</p>
              <span className="text-sm text-gray-400">
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
