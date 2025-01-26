"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import Chatbot from "@/components/chatbot"
import LongBarChart from "@/components/longBarChart"
import LongAreaChart from "@/components/longAreaChart"
import DataSummary from "@/components/DataSummary"
import SensorAreaChart from "@/components/SensorAreaChart"

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/read');
        const sensors = await response.json();
        setData(sensors);

        // Check temperature data in sensors
        const temperatureData = sensors.map(sensor => ({
          value: sensor.Temperature,
          timestamp: sensor.timestamp,
          id: sensor._id
        })).filter(sensor => sensor.value !== undefined);
        console.log(temperatureData);
        for (const data of temperatureData) {
          console.log(data.value);
          if (data.value > 30) {
            try {
              // Make HTTP request
              await fetch('https://ntfy.sh/firesense', {
                method: 'POST',
                headers: {
                  'Authorization': 'Bearer tk_b1gitq6eo3vra0kygixd5lmlkkei5',
                  'Content-Type': 'text/plain'
                },
                body: 'fire detected at lot C'
              });
            } catch (error) {
              console.log('Notification sent');
            }
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
      <div className="w-full px-4">
        {data && <DataSummary data={data} />}
      </div> 
      <div className="flex flex-col w-full gap-6">
        <SensorAreaChart title="Temperature (C)" dataKey="Temperature" data={data} />
        <SensorAreaChart title="Humidity (%)" dataKey="Humidity" data={data} />
        <SensorAreaChart title="Soil Moisture (%)" dataKey="SoilMoisture" data={data} />
      </div>
      <div className="w-1/2 mt-8">
        <Chatbot />
      </div>
    </div>
  );
}
