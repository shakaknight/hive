import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Eye,
  MousePointer,
  Clock,
  ArrowRight,
  Filter,
  Search,
  Download,
  Share,
  Settings,
  User,
  Calendar,
  BarChart3,
  Activity,
  Zap,
  Shield,
  AlertTriangle,
  CheckCircle,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  FastForward,
  Rewind,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface SessionData {
  id: string;
  userId: string;
  userEmail: string;
  duration: string;
  timestamp: Date;
  pageViews: number;
  clicks: number;
  device: "desktop" | "mobile" | "tablet";
  browser: string;
  location: string;
  events: SessionEvent[];
  heatmapData: HeatmapPoint[];
  status: "completed" | "active" | "error";
  tags: string[];
}

interface SessionEvent {
  id: string;
  type: "page_load" | "click" | "scroll" | "form_submit" | "error";
  timestamp: string;
  description: string;
  element?: string;
  url?: string;
}

interface HeatmapPoint {
  x: number;
  y: number;
  intensity: number;
  type: "click" | "scroll" | "hover";
}

interface SessionReplayProps {
  sessions?: SessionData[];
  onSessionSelect?: (sessionId: string) => void;
  onExportSession?: (sessionId: string) => void;
}

const SessionReplay: React.FC<SessionReplayProps> = ({
  sessions = [
    {
      id: "1",
      userId: "user_123",
      userEmail: "john.doe@example.com",
      duration: "5:23",
      timestamp: new Date(Date.now() - 300000),
      pageViews: 8,
      clicks: 23,
      device: "desktop",
      browser: "Chrome 120",
      location: "New York, US",
      status: "completed",
      tags: ["conversion", "high-engagement"],
      events: [
        {
          id: "e1",
          type: "page_load",
          timestamp: "0:00",
          description: "Homepage loaded",
          url: "/",
        },
        {
          id: "e2",
          type: "click",
          timestamp: "0:45",
          description: "Clicked Product Analytics button",
          element: "button[data-testid='product-analytics']",
        },
        {
          id: "e3",
          type: "page_load",
          timestamp: "1:12",
          description: "Product Analytics page loaded",
          url: "/product-analytics",
        },
        {
          id: "e4",
          type: "click",
          timestamp: "2:30",
          description: "Clicked Try Interactive Demo",
          element: "button[data-testid='demo-button']",
        },
        {
          id: "e5",
          type: "form_submit",
          timestamp: "4:15",
          description: "Submitted contact form",
          element: "form[data-testid='contact-form']",
        },
      ],
      heatmapData: [
        { x: 120, y: 80, intensity: 0.8, type: "click" },
        { x: 200, y: 150, intensity: 0.6, type: "click" },
        { x: 300, y: 200, intensity: 0.9, type: "click" },
        { x: 150, y: 300, intensity: 0.4, type: "hover" },
      ],
    },
    {
      id: "2",
      userId: "user_456",
      userEmail: "sarah.smith@example.com",
      duration: "3:45",
      timestamp: new Date(Date.now() - 600000),
      pageViews: 5,
      clicks: 12,
      device: "mobile",
      browser: "Safari 17",
      location: "London, UK",
      status: "completed",
      tags: ["mobile", "bounce"],
      events: [
        {
          id: "e6",
          type: "page_load",
          timestamp: "0:00",
          description: "Homepage loaded",
          url: "/",
        },
        {
          id: "e7",
          type: "scroll",
          timestamp: "0:15",
          description: "Scrolled to features section",
        },
        {
          id: "e8",
          type: "click",
          timestamp: "1:30",
          description: "Clicked pricing link",
          element: "a[href='/pricing']",
        },
      ],
      heatmapData: [
        { x: 180, y: 120, intensity: 0.7, type: "click" },
        { x: 220, y: 180, intensity: 0.5, type: "scroll" },
      ],
    },
    {
      id: "3",
      userId: "user_789",
      userEmail: "mike.johnson@example.com",
      duration: "7:12",
      timestamp: new Date(Date.now() - 900000),
      pageViews: 12,
      clicks: 34,
      device: "tablet",
      browser: "Firefox 119",
      location: "Toronto, CA",
      status: "active",
      tags: ["power-user", "tablet"],
      events: [
        {
          id: "e9",
          type: "page_load",
          timestamp: "0:00",
          description: "Dashboard loaded",
          url: "/dashboard",
        },
        {
          id: "e10",
          type: "click",
          timestamp: "0:30",
          description: "Opened analytics panel",
          element: "button[data-testid='analytics-panel']",
        },
      ],
      heatmapData: [
        { x: 250, y: 100, intensity: 0.9, type: "click" },
        { x: 180, y: 250, intensity: 0.8, type: "click" },
        { x: 320, y: 180, intensity: 0.6, type: "hover" },
      ],
    },
  ],
  onSessionSelect = () => {},
  onExportSession = () => {},
}) => {
  const [selectedSession, setSelectedSession] = useState<SessionData | null>(
    sessions[0] || null,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deviceFilter, setDeviceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [activeTab, setActiveTab] = useState("sessions");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && selectedSession) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const maxTime = parseFloat(selectedSession.duration) * 60;
          if (prev >= maxTime) {
            setIsPlaying(false);
            return maxTime;
          }
          return prev + playbackSpeed;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, selectedSession]);

  const getDeviceIcon = (device: SessionData["device"]) => {
    switch (device) {
      case "desktop":
        return <Monitor className="h-4 w-4" />;
      case "mobile":
        return <Smartphone className="h-4 w-4" />;
      case "tablet":
        return <Tablet className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: SessionData["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "active":
        return "bg-blue-100 text-blue-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.userId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDevice =
      deviceFilter === "all" || session.device === deviceFilter;
    const matchesStatus =
      statusFilter === "all" || session.status === statusFilter;
    return matchesSearch && matchesDevice && matchesStatus;
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSessionSelect = (session: SessionData) => {
    setSelectedSession(session);
    setCurrentTime(0);
    setIsPlaying(false);
    onSessionSelect(session.id);
  };

  const renderSessionList = () => (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search sessions by user or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={deviceFilter} onValueChange={setDeviceFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by device" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Devices</SelectItem>
            <SelectItem value="desktop">Desktop</SelectItem>
            <SelectItem value="mobile">Mobile</SelectItem>
            <SelectItem value="tablet">Tablet</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Session Cards */}
      <div className="grid grid-cols-1 gap-4">
        {filteredSessions.map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedSession?.id === session.id
                  ? "ring-2 ring-blue-500 bg-blue-50"
                  : ""
              }`}
              onClick={() => handleSessionSelect(session)}
            >
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getDeviceIcon(session.device)}
                    </div>
                    <div>
                      <h4 className="font-medium">{session.userEmail}</h4>
                      <p className="text-sm text-gray-600">
                        {session.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(session.status)}>
                      {session.status}
                    </Badge>
                    {session.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Duration:</span>
                    <br />
                    <span className="font-medium">{session.duration}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Page Views:</span>
                    <br />
                    <span className="font-medium">{session.pageViews}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Clicks:</span>
                    <br />
                    <span className="font-medium">{session.clicks}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Location:</span>
                    <br />
                    <span className="font-medium">{session.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderSessionPlayer = () => {
    if (!selectedSession) {
      return (
        <div className="text-center py-12">
          <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Select a session to start playback</p>
        </div>
      );
    }

    const maxTime = parseFloat(selectedSession.duration) * 60;
    const progress = (currentTime / maxTime) * 100;

    return (
      <div className="space-y-6">
        {/* Session Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              {getDeviceIcon(selectedSession.device)}
            </div>
            <div>
              <h3 className="font-medium">{selectedSession.userEmail}</h3>
              <p className="text-sm text-gray-600">
                {selectedSession.browser} • {selectedSession.location}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExportSession(selectedSession.id)}
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>

        {/* Video Player */}
        <Card>
          <CardContent className="p-0">
            <div className="bg-gray-900 rounded-t-lg p-6">
              <div className="bg-white rounded-lg h-96 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50">
                  {/* Heatmap Overlay */}
                  {showHeatmap &&
                    selectedSession.heatmapData.map((point, index) => (
                      <motion.div
                        key={index}
                        className={`absolute rounded-full ${
                          point.type === "click"
                            ? "bg-red-500"
                            : point.type === "hover"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                        }`}
                        style={{
                          left: `${point.x}px`,
                          top: `${point.y}px`,
                          width: `${20 * point.intensity}px`,
                          height: `${20 * point.intensity}px`,
                          opacity: point.intensity * 0.7,
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      />
                    ))}

                  {/* Mock cursor */}
                  <motion.div
                    className="absolute"
                    animate={{
                      x: [100, 200, 300, 150],
                      y: [100, 150, 200, 250],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <MousePointer className="h-6 w-6 text-red-500" />
                  </motion.div>

                  {/* Session Info Overlay */}
                  <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white px-3 py-2 rounded-lg text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isPlaying ? "bg-red-500 animate-pulse" : "bg-gray-400"
                        }`}
                      />
                      {isPlaying ? "LIVE" : "PAUSED"}
                    </div>
                  </div>

                  {/* Center Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="w-16 h-16 rounded-full"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? (
                        <Pause className="h-8 w-8" />
                      ) : (
                        <Play className="h-8 w-8" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Player Controls */}
            <div className="p-4 bg-gray-100 rounded-b-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentTime(Math.max(0, currentTime - 10))
                    }
                  >
                    <Rewind className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentTime(Math.min(maxTime, currentTime + 10))
                    }
                  >
                    <FastForward className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentTime(0)}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {formatTime(currentTime)} / {selectedSession.duration}
                  </span>
                  <div className="w-64 h-2 bg-gray-300 rounded-full relative">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                    <input
                      type="range"
                      min="0"
                      max={maxTime}
                      value={currentTime}
                      onChange={(e) => setCurrentTime(Number(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Select
                    value={playbackSpeed.toString()}
                    onValueChange={(value) => setPlaybackSpeed(Number(value))}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.5">0.5x</SelectItem>
                      <SelectItem value="1">1x</SelectItem>
                      <SelectItem value="1.5">1.5x</SelectItem>
                      <SelectItem value="2">2x</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Settings */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={showHeatmap}
                      onCheckedChange={setShowHeatmap}
                    />
                    <Label className="text-sm">Show Heatmap</Label>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedSession.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderSessionAnalytics = () => {
    if (!selectedSession) {
      return (
        <div className="text-center py-12">
          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Select a session to view analytics</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Session Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Duration</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {selectedSession.duration}
              </div>
              <p className="text-xs text-muted-foreground">
                Total session time
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Page Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {selectedSession.pageViews}
              </div>
              <p className="text-xs text-muted-foreground">
                Pages visited in session
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clicks</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{selectedSession.clicks}</div>
              <p className="text-xs text-muted-foreground">
                Total click interactions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {selectedSession.clicks > 20 ? "High" : "Medium"}
              </div>
              <p className="text-xs text-muted-foreground">
                User engagement level
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Session Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Session Timeline</CardTitle>
            <CardDescription>
              Key events and interactions during this session
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedSession.events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`flex items-center space-x-4 p-3 rounded-lg ${
                    event.type === "page_load"
                      ? "bg-blue-50"
                      : event.type === "click"
                        ? "bg-green-50"
                        : event.type === "form_submit"
                          ? "bg-purple-50"
                          : event.type === "error"
                            ? "bg-red-50"
                            : "bg-yellow-50"
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      event.type === "page_load"
                        ? "bg-blue-500"
                        : event.type === "click"
                          ? "bg-green-500"
                          : event.type === "form_submit"
                            ? "bg-purple-500"
                            : event.type === "error"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="font-medium">{event.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span>{event.timestamp}</span>
                      {event.element && (
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                          {event.element}
                        </code>
                      )}
                      {event.url && <span>→ {event.url}</span>}
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${
                      event.type === "page_load"
                        ? "border-blue-200 text-blue-700"
                        : event.type === "click"
                          ? "border-green-200 text-green-700"
                          : event.type === "form_submit"
                            ? "border-purple-200 text-purple-700"
                            : event.type === "error"
                              ? "border-red-200 text-red-700"
                              : "border-yellow-200 text-yellow-700"
                    }`}
                  >
                    {event.type.replace("_", " ")}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Heatmap Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Interaction Heatmap</CardTitle>
            <CardDescription>
              Visual representation of user interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Click Heatmap</h4>
                <div className="h-48 bg-gradient-to-br from-red-100 via-yellow-100 to-green-100 rounded-lg relative">
                  {selectedSession.heatmapData
                    .filter((point) => point.type === "click")
                    .map((point, index) => (
                      <div
                        key={index}
                        className="absolute bg-red-500 rounded-full"
                        style={{
                          left: `${(point.x / 400) * 100}%`,
                          top: `${(point.y / 300) * 100}%`,
                          width: `${20 * point.intensity}px`,
                          height: `${20 * point.intensity}px`,
                          opacity: point.intensity * 0.8,
                        }}
                      />
                    ))}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-600 font-medium">
                      Click Interactions
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3">Hover Heatmap</h4>
                <div className="h-48 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-lg relative">
                  {selectedSession.heatmapData
                    .filter((point) => point.type === "hover")
                    .map((point, index) => (
                      <div
                        key={index}
                        className="absolute bg-blue-500 rounded-full"
                        style={{
                          left: `${(point.x / 400) * 100}%`,
                          top: `${(point.y / 300) * 100}%`,
                          width: `${15 * point.intensity}px`,
                          height: `${15 * point.intensity}px`,
                          opacity: point.intensity * 0.6,
                        }}
                      />
                    ))}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-600 font-medium">
                      Hover Interactions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="text-2xl font-bold text-purple-600">
              Heap
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/dashboard">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Session Replay
              <span className="text-blue-600"> Analytics</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Watch real user sessions, analyze behavior patterns, and identify
              optimization opportunities with advanced session replay
              technology.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="h-4 w-4 mr-1" />
                Privacy Compliant
              </Badge>
              <Badge className="bg-blue-100 text-blue-800">
                <Shield className="h-4 w-4 mr-1" />
                GDPR Ready
              </Badge>
              <Badge className="bg-purple-100 text-purple-800">
                <Zap className="h-4 w-4 mr-1" />
                Real-time
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Total Sessions
                      </p>
                      <p className="text-2xl font-bold">{sessions.length}</p>
                    </div>
                    <Play className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Avg Duration
                      </p>
                      <p className="text-2xl font-bold">5:20</p>
                    </div>
                    <Clock className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Active Sessions
                      </p>
                      <p className="text-2xl font-bold">
                        {sessions.filter((s) => s.status === "active").length}
                      </p>
                    </div>
                    <Activity className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Devices
                      </p>
                      <p className="text-2xl font-bold">
                        {new Set(sessions.map((s) => s.device)).size}
                      </p>
                    </div>
                    <Monitor className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Interface */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="sessions">Session List</TabsTrigger>
                <TabsTrigger value="player">Session Player</TabsTrigger>
                <TabsTrigger value="analytics">Session Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="sessions" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      User Sessions
                    </CardTitle>
                    <CardDescription>
                      Browse and select user sessions for detailed analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>{renderSessionList()}</CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="player" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Play className="h-5 w-5" />
                      Session Replay Player
                    </CardTitle>
                    <CardDescription>
                      Watch user interactions in real-time with advanced
                      controls
                    </CardDescription>
                  </CardHeader>
                  <CardContent>{renderSessionPlayer()}</CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Session Analytics
                    </CardTitle>
                    <CardDescription>
                      Detailed analytics and insights for the selected session
                    </CardDescription>
                  </CardHeader>
                  <CardContent>{renderSessionAnalytics()}</CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Advanced Session Replay Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools to understand and optimize user experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Play className="h-12 w-12 text-blue-500 mb-4" />
                <CardTitle>HD Session Recording</CardTitle>
                <CardDescription>
                  Crystal clear recordings with pixel-perfect accuracy and
                  smooth playback at any speed
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <MousePointer className="h-12 w-12 text-green-500 mb-4" />
                <CardTitle>Interactive Heatmaps</CardTitle>
                <CardDescription>
                  Visualize click patterns, scroll behavior, and user attention
                  with dynamic heatmaps
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Shield className="h-12 w-12 text-purple-500 mb-4" />
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>
                  Automatic PII masking, GDPR compliance, and enterprise-grade
                  security controls
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Filter className="h-12 w-12 text-orange-500 mb-4" />
                <CardTitle>Smart Filtering</CardTitle>
                <CardDescription>
                  Advanced filters by device, location, user behavior, and
                  custom segments
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-red-500 mb-4" />
                <CardTitle>Real-time Analytics</CardTitle>
                <CardDescription>
                  Live session monitoring with instant insights and anomaly
                  detection
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Zap className="h-12 w-12 text-yellow-500 mb-4" />
                <CardTitle>AI-Powered Insights</CardTitle>
                <CardDescription>
                  Automated pattern recognition and intelligent recommendations
                  for optimization
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            See your users in action
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start recording user sessions today and discover insights that will
            transform your product experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-3"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SessionReplay;
