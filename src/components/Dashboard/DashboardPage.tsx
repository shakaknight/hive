import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  BarChart3,
  TrendingUp,
  Eye,
  MousePointer,
  ArrowRight,
  Plus,
  MoreHorizontal,
  ChevronLeft,
  Home,
  Activity,
  Target,
  Zap,
  Database,
  HelpCircle,
  UserPlus,
  Bell,
} from "lucide-react";
import AnalyticsVisualization from "./AnalyticsVisualization";
import { useAuth } from "@/contexts/AuthContext";

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
  userName,
  userEmail,
  teamMembers = [
    { id: "1", name: "Sarah Johnson", email: "sarah.j@example.com" },
    { id: "2", name: "Michael Chen", email: "michael.c@example.com" },
    { id: "3", name: "Aisha Patel", email: "aisha.p@example.com" },
  ],
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("journeys");
  const [selectedJourney, setSelectedJourney] = useState(
    "Site - View - Homepage",
  );
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const displayName = userName || user?.name || "User";
  const displayEmail = userEmail || user?.email || "user@example.com";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const journeySteps = [
    {
      id: 1,
      name: "Site - View - Homepage",
      users: 3334,
      percentage: 35.2,
      conversionRate: 14.3,
      color: "bg-green-500",
    },
    {
      id: 2,
      name: "View - PDP (Any)",
      users: 2890,
      percentage: 33.6,
      conversionRate: 8.2,
      color: "bg-green-400",
    },
    {
      id: 3,
      name: "PDP - Click - Add to Cart",
      users: 477,
      percentage: 64.4,
      conversionRate: null,
      color: "bg-green-500",
    },
    {
      id: 4,
      name: "PDP - Click - Checkout",
      users: 260,
      percentage: 53.8,
      conversionRate: null,
      color: "bg-green-400",
    },
    {
      id: 5,
      name: "Cart - Click - Checkout",
      users: 307,
      percentage: null,
      conversionRate: null,
      color: "bg-green-500",
    },
    {
      id: 6,
      name: "Cart - Complete Purchase",
      users: 140,
      percentage: null,
      conversionRate: null,
      color: "bg-green-400",
    },
  ];

  const userInteractions = [
    {
      id: 1,
      action: 'Click "See More"',
      description: "shopcompany.com",
      percentage: 21,
      users: "2K users total",
      dropOff: 4.5,
    },
    {
      id: 2,
      action: 'Click element with link "/collections/leashes"',
      description: "shopcompany.com",
      percentage: 18,
      users: "1.7K users total",
      dropOff: 1.4,
    },
    {
      id: 3,
      action: 'Click "Open navigation menu"',
      description: "shopcompany.com",
      percentage: 14,
      users: "1.3K users total",
      dropOff: 6.7,
    },
    {
      id: 4,
      action: 'Click element with link "/collections/collars"',
      description: "shopcompany.com",
      percentage: 13,
      users: "1.2K users total",
      dropOff: 1.3,
    },
    {
      id: 5,
      action: 'Click element with link "/collections/harnesses"',
      description: "shopcompany.com",
      percentage: 11,
      users: "1K users total",
      dropOff: 0.51,
    },
  ];

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="font-semibold text-lg">Heap</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              Analysis
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-left font-normal"
            >
              <BarChart3 className="mr-3 h-4 w-4" />
              Overview
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-left font-normal"
            >
              <TrendingUp className="mr-3 h-4 w-4" />
              Dashboards
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-left font-normal"
            >
              <BarChart3 className="mr-3 h-4 w-4" />
              All charts
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-left font-normal"
            >
              <Target className="mr-3 h-4 w-4" />
              Analyze
            </Button>

            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 mt-6">
              Data Management
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-left font-normal"
            >
              <Activity className="mr-3 h-4 w-4" />
              Explore events
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-left font-normal"
            >
              <Database className="mr-3 h-4 w-4" />
              Definitions
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-left font-normal"
            >
              <Eye className="mr-3 h-4 w-4" />
              Visual labeling
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-left font-normal"
            >
              <Zap className="mr-3 h-4 w-4" />
              Live data feed
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-left font-normal"
            >
              <Users className="mr-3 h-4 w-4" />
              User sessions
            </Button>

            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 mt-6">
              Administration
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-left font-normal"
            >
              <Settings className="mr-3 h-4 w-4" />
              Updates
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-left font-normal"
            >
              <Database className="mr-3 h-4 w-4" />
              Integrations
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-left font-normal"
            >
              <HelpCircle className="mr-3 h-4 w-4" />
              Get support
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-left font-normal"
            >
              <UserPlus className="mr-3 h-4 w-4" />
              Account
              <ChevronDown className="ml-auto h-4 w-4" />
            </Button>
          </div>
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Production</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Usage over time</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">Funnel</span>
                <span className="text-sm text-gray-500">•</span>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800"
                >
                  Journeys
                </Badge>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">Retention</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">More</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${displayName}`}
                        alt={displayName}
                      />
                      <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Journey Content */}
        <div className="flex-1 flex">
          {/* Journey Funnel */}
          <div className="flex-1 p-6">
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <Button variant="ghost" size="sm" className="text-gray-500">
                  <Home className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-500">{selectedJourney}</span>
              </div>
            </div>

            {/* Funnel Visualization */}
            <div className="space-y-4">
              {journeySteps.map((step, index) => (
                <div key={step.id} className="flex items-center space-x-4">
                  {/* Step Bar */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <span className="text-sm font-medium">{step.name}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="h-16 bg-gray-100 rounded-lg overflow-hidden">
                        <div
                          className={`h-full ${step.color} flex items-center justify-center text-white font-medium`}
                          style={{
                            width: `${Math.min(step.percentage || 100, 100)}%`,
                          }}
                        >
                          {step.users.toLocaleString()} users
                        </div>
                      </div>
                      {step.percentage && (
                        <div className="absolute top-2 right-2 text-xs text-gray-600">
                          {step.percentage}%
                        </div>
                      )}
                      {step.conversionRate && (
                        <div className="absolute bottom-2 left-2 text-xs text-gray-600">
                          {step.conversionRate}%
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - User Interactions */}
          <div className="w-96 border-l border-gray-200 bg-gray-50">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">
                  Other events after
                </h3>
                <span className="text-sm text-gray-500">
                  Site - View - Homepage
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Most common interactions after Site - View - Homepage
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
                <span>Include these users in the journey</span>
              </div>
            </div>

            <div className="p-4 space-y-4">
              {userInteractions.map((interaction) => (
                <div key={interaction.id} className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <MousePointer className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium">
                          {interaction.action}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 ml-6">
                        {interaction.description}
                      </p>
                      <div className="flex items-center justify-between ml-6 mt-1">
                        <div className="text-xs text-gray-600">
                          <span className="font-medium">
                            {interaction.percentage}% of users did this
                          </span>
                          <br />
                          <span className="text-gray-500">
                            ({interaction.users})
                          </span>
                        </div>
                        <div className="text-xs text-gray-600">
                          <span className="font-medium">
                            {interaction.dropOff}% took a different path or
                            dropped off
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
