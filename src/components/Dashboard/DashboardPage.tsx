import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  ChevronDown,
  Download,
  Filter,
  LineChart,
  PieChart,
  Settings,
  Users,
} from "lucide-react";
import AnalyticsVisualization from "./AnalyticsVisualization";

interface DashboardPageProps {
  userName?: string;
  userEmail?: string;
  teamMembers?: Array<{
    id: string;
    name: string;
    email: string;
    avatar?: string;
  }>;
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  userName = "John Doe",
  userEmail = "john.doe@example.com",
  teamMembers = [
    { id: "1", name: "Sarah Johnson", email: "sarah.j@example.com" },
    { id: "2", name: "Michael Chen", email: "michael.c@example.com" },
    { id: "3", name: "Aisha Patel", email: "aisha.p@example.com" },
  ],
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-blue-600">Heap</h1>
            <nav className="hidden md:flex space-x-4">
              <Button variant="ghost">Dashboard</Button>
              <Button variant="ghost">Events</Button>
              <Button variant="ghost">Users</Button>
              <Button variant="ghost">Reports</Button>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
                      alt={userName}
                    />
                    <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">{userName}</span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
            <p className="text-gray-500">View and analyze your user data</p>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4 md:mt-0">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>

            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs
          defaultValue="overview"
          className="mb-6"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-4 md:grid-cols-5 lg:w-[600px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="funnels">Funnels</TabsTrigger>
            <TabsTrigger value="heatmaps">Heatmaps</TabsTrigger>
            <TabsTrigger value="journeys">User Journeys</TabsTrigger>
            <TabsTrigger value="reports" className="hidden md:block">
              Reports
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24,532</div>
              <p className="text-xs text-green-500 flex items-center mt-1">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Active Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,429</div>
              <p className="text-xs text-green-500 flex items-center mt-1">
                +5.2% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Conversion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.6%</div>
              <p className="text-xs text-red-500 flex items-center mt-1">
                -0.8% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Avg. Session Duration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2m 45s</div>
              <p className="text-xs text-green-500 flex items-center mt-1">
                +18s from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Visualization */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>User interactions over time</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <LineChart className="h-4 w-4 mr-1" />
                Line
              </Button>
              <Button variant="outline" size="sm">
                <PieChart className="h-4 w-4 mr-1" />
                Pie
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <AnalyticsVisualization
              type={
                activeTab === "heatmaps"
                  ? "heatmap"
                  : activeTab === "funnels"
                    ? "funnel"
                    : activeTab === "journeys"
                      ? "journey"
                      : "chart"
              }
              height={400}
            />
          </CardContent>
        </Card>

        {/* Secondary Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Users */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Recent Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage
                        src={
                          member.avatar ||
                          `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`
                        }
                      />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4">
                View All Users
              </Button>
            </CardContent>
          </Card>

          {/* Top Events */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Top Events</CardTitle>
              <CardDescription>Most frequent user interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium">Page View: /homepage</p>
                    <p className="text-sm text-gray-500">12,453 occurrences</p>
                  </div>
                  <div className="w-24 h-8 bg-blue-100 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-500 h-full"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium">Button Click: Sign Up</p>
                    <p className="text-sm text-gray-500">8,721 occurrences</p>
                  </div>
                  <div className="w-24 h-8 bg-blue-100 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-500 h-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium">Form Submit: Contact</p>
                    <p className="text-sm text-gray-500">5,342 occurrences</p>
                  </div>
                  <div className="w-24 h-8 bg-blue-100 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-500 h-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium">Page View: /pricing</p>
                    <p className="text-sm text-gray-500">4,128 occurrences</p>
                  </div>
                  <div className="w-24 h-8 bg-blue-100 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-500 h-full"
                      style={{ width: "35%" }}
                    ></div>
                  </div>
                </div>
              </div>
              <Button variant="ghost" className="w-full mt-4">
                View All Events
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
