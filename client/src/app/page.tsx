"use client"
import Image from "next/image";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import Chatbot from "@/components/chatbot"
import LongBarChart from "@/components/longBarChart"
import LongAreaChart from "@/components/longAreaChart"

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
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
