import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  LineChart,
  PieChart,
  ArrowDownToLine,
  Filter,
  ZoomIn,
  Calendar,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion } from "framer-motion";

interface DataPoint {
  date: string;
  value: number;
}

interface VisualizationProps {
  title?: string;
  description?: string;
  type?: "chart" | "funnel" | "heatmap" | "journey";
  data?: DataPoint[];
  timeRange?: string;
  filters?: string[];
}

const AnalyticsVisualization = ({
  title = "User Activity Overview",
  description = "Track user engagement and interaction patterns over time",
  type = "chart",
  data = [
    { date: "2023-01-01", value: 120 },
    { date: "2023-01-02", value: 150 },
    { date: "2023-01-03", value: 180 },
    { date: "2023-01-04", value: 200 },
    { date: "2023-01-05", value: 170 },
    { date: "2023-01-06", value: 220 },
    { date: "2023-01-07", value: 250 },
  ],
  timeRange = "Last 7 days",
  filters = ["All Users", "New Users", "Returning Users"],
}: VisualizationProps) => {
  const [activeTab, setActiveTab] = useState("line");
  const [selectedFilter, setSelectedFilter] = useState("All Users");
  const [isZoomed, setIsZoomed] = useState(false);

  // Mock chart rendering - in a real implementation, you would use a charting library
  const renderChart = () => {
    const maxValue = Math.max(...data.map((d) => d.value));

    switch (activeTab) {
      case "line":
        return (
          <div className="h-64 w-full relative">
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between h-48">
              {data.map((point, index) => {
                const height = (point.value / maxValue) * 100;
                return (
                  <motion.div
                    key={index}
                    className="bg-primary/20 relative group"
                    style={{ height: `${height}%`, width: "8%" }}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs p-1 rounded">
                      {point.date}: {point.value}
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <div className="absolute left-0 right-0 bottom-0 h-px bg-border" />
            <div className="absolute top-0 bottom-0 left-0 w-px bg-border" />
          </div>
        );
      case "bar":
        return (
          <div className="h-64 w-full relative">
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between h-48">
              {data.map((point, index) => {
                const height = (point.value / maxValue) * 100;
                return (
                  <motion.div
                    key={index}
                    className="bg-primary relative group"
                    style={{ height: `${height}%`, width: "8%" }}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs p-1 rounded">
                      {point.date}: {point.value}
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <div className="absolute left-0 right-0 bottom-0 h-px bg-border" />
          </div>
        );
      case "pie":
        return (
          <div className="h-64 w-full flex items-center justify-center">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {data.map((point, index) => {
                  const total = data.reduce((sum, d) => sum + d.value, 0);
                  const percentage = (point.value / total) * 100;
                  const startAngle =
                    index === 0
                      ? 0
                      : data
                          .slice(0, index)
                          .reduce((sum, d) => sum + (d.value / total) * 360, 0);
                  const endAngle = startAngle + (point.value / total) * 360;

                  const startRad = ((startAngle - 90) * Math.PI) / 180;
                  const endRad = ((endAngle - 90) * Math.PI) / 180;

                  const x1 = 50 + 40 * Math.cos(startRad);
                  const y1 = 50 + 40 * Math.sin(startRad);
                  const x2 = 50 + 40 * Math.cos(endRad);
                  const y2 = 50 + 40 * Math.sin(endRad);

                  const largeArcFlag = percentage > 50 ? 1 : 0;

                  const colors = [
                    "#2563eb",
                    "#4f46e5",
                    "#7c3aed",
                    "#9333ea",
                    "#c026d3",
                    "#db2777",
                    "#e11d48",
                  ];

                  return (
                    <motion.path
                      key={index}
                      d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                      fill={colors[index % colors.length]}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    />
                  );
                })}
              </svg>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderFunnel = () => {
    return (
      <div className="h-64 w-full flex flex-col items-center justify-center space-y-2">
        {data.slice(0, 5).map((point, index) => {
          const width = 100 - index * 15;
          return (
            <motion.div
              key={index}
              className="bg-primary/80 text-white text-center py-2 flex items-center justify-center"
              style={{ width: `${width}%` }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: `${width}%`, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              Step {index + 1}: {point.value} users
            </motion.div>
          );
        })}
      </div>
    );
  };

  const renderHeatmap = () => {
    return (
      <div className="h-64 w-full relative overflow-hidden bg-gray-100 rounded-md">
        <div className="absolute inset-0 grid grid-cols-7 grid-rows-5 gap-1 p-2">
          {Array.from({ length: 35 }).map((_, index) => {
            const intensity = Math.random();
            const color =
              intensity > 0.7
                ? "bg-red-500"
                : intensity > 0.5
                  ? "bg-red-400"
                  : intensity > 0.3
                    ? "bg-red-300"
                    : intensity > 0.1
                      ? "bg-red-200"
                      : "bg-red-100";
            return (
              <motion.div
                key={index}
                className={`${color} rounded-sm`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
              />
            );
          })}
        </div>
        <div
          className="absolute inset-0 bg-contain bg-center opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=20')",
          }}
        />
      </div>
    );
  };

  const renderJourney = () => {
    return (
      <div className="h-64 w-full relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-1 bg-gray-200 relative">
            {[0, 1, 2, 3, 4].map((step) => (
              <motion.div
                key={step}
                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs"
                style={{ left: `${step * 25}%` }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: step * 0.2 }}
              >
                {step + 1}
              </motion.div>
            ))}
            {[0, 1, 2, 3].map((line) => (
              <motion.div
                key={`line-${line}`}
                className="absolute top-1/2 -translate-y-1/2 h-1 bg-primary"
                style={{ left: `${line * 25 + 3}%`, width: "22%" }}
                initial={{ width: 0 }}
                animate={{ width: "22%" }}
                transition={{ duration: 0.5, delay: line * 0.2 + 0.2 }}
              />
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
          <div>Landing</div>
          <div>Sign Up</div>
          <div>Onboarding</div>
          <div>Feature Use</div>
          <div>Conversion</div>
        </div>
      </div>
    );
  };

  const renderVisualization = () => {
    switch (type) {
      case "chart":
        return renderChart();
      case "funnel":
        return renderFunnel();
      case "heatmap":
        return renderHeatmap();
      case "journey":
        return renderJourney();
      default:
        return renderChart();
    }
  };

  return (
    <Card
      className={`w-full bg-background ${isZoomed ? "fixed inset-4 z-50" : ""}`}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          {type === "chart" && (
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mr-2"
            >
              <TabsList>
                <TabsTrigger value="line">
                  <LineChart className="h-4 w-4 mr-1" />
                  Line
                </TabsTrigger>
                <TabsTrigger value="bar">
                  <BarChart className="h-4 w-4 mr-1" />
                  Bar
                </TabsTrigger>
                <TabsTrigger value="pie">
                  <PieChart className="h-4 w-4 mr-1" />
                  Pie
                </TabsTrigger>
              </TabsList>
            </Tabs>
          )}

          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              {filters.map((filter) => (
                <SelectItem key={filter} value={filter}>
                  {filter}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Calendar className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4">
              <div className="space-y-2">
                <h4 className="font-medium">Time Range</h4>
                <div className="flex flex-col space-y-1">
                  <Button variant="ghost" size="sm" className="justify-start">
                    Last 7 days
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start">
                    Last 30 days
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start">
                    Last 90 days
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start">
                    Custom range
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon">
            <ArrowDownToLine className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="pt-4">{renderVisualization()}</div>
        <div className="mt-4 text-xs text-muted-foreground text-right">
          {timeRange} • {selectedFilter}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsVisualization;
