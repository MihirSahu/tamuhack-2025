"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import Chatbot from "@/components/chatbot"
import LongBarChart from "@/components/longBarChart"
import LongAreaChart from "@/components/longAreaChart"
//import DataSummary from "@/components/DataSummary"

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/read');
        const sensors = await response.json();
        //console.log(sensors);
        setData(sensors);

        // Check temperature data in sensors
        const temperatureData = sensors.filter((sensor) => sensor.type === "temperature");
        for (const data of temperatureData) {
          if (data.value > 21) {
            console.log(data.value);

            // Make HTTP request
            await fetch('https://ntfy.sh/firesense', {
              method: 'POST',
              headers: {
                'Authorization': 'Bearer tk_b1gitq6eo3vra0kygixd5lmlkkei5',
                'Content-Type': 'text/plain'
              },
              body: 'fire detected at lot C'
            });

            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {/*
      <div className="w-full px-4">
        {data && <DataSummary data={data} />}
      </div> 
      */}
      <div className="flex flex-col w-full">
        <LongBarChart />
        <LongAreaChart />
      </div>
      <div className="w-1/2 mt-8">
        <Chatbot />
      </div>
    </div>
  );
}
