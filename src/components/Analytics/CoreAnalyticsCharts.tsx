import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  Target,
  Download,
  Settings,
  Filter,
  Calendar,
  RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";

interface ChartData {
  name: string;
  value: number;
  change?: number;
  trend?: "up" | "down" | "stable";
}

interface CoreAnalyticsChartsProps {
  data?: ChartData[];
  timeRange?: string;
  refreshInterval?: number;
}

const CoreAnalyticsCharts: React.FC<CoreAnalyticsChartsProps> = ({
  data = [
    { name: "Page Views", value: 45231, change: 12.5, trend: "up" },
    { name: "Unique Visitors", value: 23456, change: 8.3, trend: "up" },
    { name: "Bounce Rate", value: 34.2, change: -2.1, trend: "down" },
    { name: "Conversion Rate", value: 3.8, change: 0.5, trend: "up" },
    { name: "Session Duration", value: 245, change: 15.2, trend: "up" },
    { name: "Revenue", value: 125430, change: 22.1, trend: "up" },
  ],
  timeRange = "Last 30 days",
  refreshInterval = 30000,
}) => {
  const [selectedChart, setSelectedChart] = useState("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
    setLastUpdated(new Date());
  };

  const renderMetricCard = (metric: ChartData, index: number) => {
    const isPercentage =
      metric.name.includes("Rate") || metric.name.includes("Bounce");
    const isCurrency = metric.name.includes("Revenue");
    const isDuration = metric.name.includes("Duration");

    let displayValue = metric.value.toString();
    if (isPercentage) displayValue = `${metric.value}%`;
    if (isCurrency) displayValue = `$${metric.value.toLocaleString()}`;
    if (isDuration)
      displayValue = `${Math.floor(metric.value / 60)}m ${metric.value % 60}s`;

    return (
      <motion.div
        key={metric.name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Card className="bg-white hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {metric.name}
            </CardTitle>
            {metric.trend === "up" ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : metric.trend === "down" ? (
              <TrendingDown className="h-4 w-4 text-red-500" />
            ) : (
              <Activity className="h-4 w-4 text-gray-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {displayValue}
            </div>
            {metric.change && (
              <div
                className={`flex items-center text-xs mt-1 ${
                  metric.change > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {metric.change > 0 ? "+" : ""}
                {metric.change}% from last period
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const renderChart = (type: string) => {
    const chartHeight = 300;
    const maxValue = Math.max(...data.map((d) => d.value));

    switch (type) {
      case "bar":
        return (
          <div className="h-64 w-full relative bg-gray-50 rounded-lg p-4">
            <div className="flex items-end justify-between h-full">
              {data.slice(0, 6).map((item, index) => {
                const height = (item.value / maxValue) * 200;
                return (
                  <motion.div
                    key={item.name}
                    className="bg-blue-500 rounded-t-md relative group cursor-pointer"
                    style={{ width: "12%", height: `${height}px` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}px` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs px-2 py-1 rounded">
                      {item.value.toLocaleString()}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );

      case "line":
        return (
          <div className="h-64 w-full relative bg-gray-50 rounded-lg p-4">
            <svg viewBox="0 0 400 200" className="w-full h-full">
              <defs>
                <linearGradient
                  id="lineGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              {data.slice(0, 6).map((item, index) => {
                const x = (index / 5) * 350 + 25;
                const y = 180 - (item.value / maxValue) * 150;
                return (
                  <motion.circle
                    key={item.name}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#3b82f6"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                );
              })}
            </svg>
          </div>
        );

      case "pie":
        return (
          <div className="h-64 w-full flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="relative w-48 h-48">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full transform -rotate-90"
              >
                {data.slice(0, 5).map((item, index) => {
                  const total = data
                    .slice(0, 5)
                    .reduce((sum, d) => sum + d.value, 0);
                  const percentage = (item.value / total) * 100;
                  const startAngle = data
                    .slice(0, index)
                    .reduce((sum, d) => sum + (d.value / total) * 360, 0);
                  const endAngle = startAngle + (item.value / total) * 360;

                  const startRad = (startAngle * Math.PI) / 180;
                  const endRad = (endAngle * Math.PI) / 180;

                  const x1 = 50 + 40 * Math.cos(startRad);
                  const y1 = 50 + 40 * Math.sin(startRad);
                  const x2 = 50 + 40 * Math.cos(endRad);
                  const y2 = 50 + 40 * Math.sin(endRad);

                  const largeArcFlag = percentage > 50 ? 1 : 0;

                  const colors = [
                    "#3b82f6",
                    "#10b981",
                    "#f59e0b",
                    "#ef4444",
                    "#8b5cf6",
                  ];

                  return (
                    <motion.path
                      key={item.name}
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
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((metric, index) => renderMetricCard(metric, index))}
          </div>
        );
    }
  };

  return (
    <div className="w-full space-y-6 bg-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Core Analytics</h2>
          <p className="text-gray-600">
            Real-time insights and performance metrics
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {timeRange}
          </Badge>
          <Badge variant="outline" className="text-xs">
            Updated: {lastUpdated.toLocaleTimeString()}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Chart Type Selector */}
      <Tabs
        value={selectedChart}
        onValueChange={setSelectedChart}
        className="w-full"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="bar" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Bar Chart
            </TabsTrigger>
            <TabsTrigger value="line" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              Line Chart
            </TabsTrigger>
            <TabsTrigger value="pie" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Pie Chart
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Select defaultValue="30d">
              <SelectTrigger className="w-32">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>

            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Customize
            </Button>
          </div>
        </div>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>{renderChart("overview")}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bar" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Bar Chart Analysis</CardTitle>
            </CardHeader>
            <CardContent>{renderChart("bar")}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="line" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Trend Analysis</CardTitle>
            </CardHeader>
            <CardContent>{renderChart("line")}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pie" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Distribution Analysis</CardTitle>
            </CardHeader>
            <CardContent>{renderChart("pie")}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Real-time Status */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">
                Real-time data streaming
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Next update in {Math.floor(refreshInterval / 1000)}s
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoreAnalyticsCharts;
