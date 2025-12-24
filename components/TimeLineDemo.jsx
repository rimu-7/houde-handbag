"use client";
import React, { useEffect, useState } from "react";
import { Timeline } from "@/components/ui/timeline";

export default function TimelinePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/timeline/public");
        const json = await res.json();
        if (json.data) {
          setData(json.data);
        }
      } catch (err) {
        console.error("Failed to load timeline", err);
      } finally {
      }
    }
    fetchData();
  }, []);


  return (
    <div className="relative max-w-4xl mx-auto overflow-clip ">
      <Timeline data={data} />
    </div>
  );
}