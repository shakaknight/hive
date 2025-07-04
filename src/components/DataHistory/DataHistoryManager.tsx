import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Database,
  Download,
  Filter,
  History,
  Search,
  Archive,
  Clock,
  HardDrive,
  Trash2,
  RefreshCw,
  Settings,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";

interface DataSnapshot {
  id: string;
  timestamp: Date;
  type: "automatic" | "manual" | "scheduled";
  size: number;
  events: number;
  users: number;
  status: "completed" | "processing" | "failed";
  retention: string;
  description?: string;
}

interface DataHistoryManagerProps {
  snapshots?: DataSnapshot[];
  totalStorage?: number;
  usedStorage?: number;
  retentionPeriod?: string;
  onCreateSnapshot?: () => void;
  onRestoreSnapshot?: (id: string) => void;
  onDeleteSnapshot?: (id: string) => void;
}

const DataHistoryManager: React.FC<DataHistoryManagerProps> = ({
  snapshots = [
    {
      id: "1",
      timestamp: new Date(Date.now() - 86400000),
      type: "automatic",
      size: 2.4,
      events: 125430,
      users: 23456,
      status: "completed",
      retention: "30 days",
      description: "Daily automatic backup",
    },
    {
      id: "2",
      timestamp: new Date(Date.now() - 172800000),
      type: "manual",
      size: 2.1,
      events: 118230,
      users: 22890,
      status: "completed",
      retention: "90 days",
      description: "Pre-deployment backup",
    },
    {
      id: "3",
      timestamp: new Date(Date.now() - 259200000),
      type: "scheduled",
      size: 1.9,
      events: 112450,
      users: 21234,
      status: "completed",
      retention: "1 year",
      description: "Weekly scheduled backup",
    },
    {
      id: "4",
      timestamp: new Date(Date.now() - 345600000),
      type: "automatic",
      size: 1.8,
      events: 108900,
      users: 20567,
      status: "failed",
      retention: "30 days",
      description: "Failed backup - storage limit",
    },
  ],
  totalStorage = 100,
  usedStorage = 45.2,
  retentionPeriod = "1 year",
  onCreateSnapshot = () => {},
  onRestoreSnapshot = () => {},
  onDeleteSnapshot = () => {},
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [autoBackup, setAutoBackup] = useState(true);

  const getStatusColor = (status: DataSnapshot["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: DataSnapshot["type"]) => {
    switch (type) {
      case "automatic":
        return <RefreshCw className="h-4 w-4 text-blue-600" />;
      case "manual":
        return <Database className="h-4 w-4 text-green-600" />;
      case "scheduled":
        return <Clock className="h-4 w-4 text-purple-600" />;
      default:
        return <Archive className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredSnapshots = snapshots.filter((snapshot) => {
    const matchesSearch = snapshot.description
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPeriod =
      selectedPeriod === "all" ||
      (selectedPeriod === "week" &&
        snapshot.timestamp > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
      (selectedPeriod === "month" &&
        snapshot.timestamp > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    return matchesSearch && matchesPeriod;
  });

  return (
    <div className="w-full space-y-6 bg-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Data History</h2>
          <p className="text-gray-600">
            Manage data snapshots and historical backups
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={onCreateSnapshot}>
            <Archive className="h-4 w-4 mr-2" />
            Create Snapshot
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Storage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Snapshots
                </p>
                <p className="text-2xl font-bold">{snapshots.length}</p>
              </div>
              <History className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Used Storage
                </p>
                <p className="text-2xl font-bold">{usedStorage} GB</p>
              </div>
              <HardDrive className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Storage Limit
                </p>
                <p className="text-2xl font-bold">{totalStorage} GB</p>
              </div>
              <Database className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Retention</p>
                <p className="text-2xl font-bold">{retentionPeriod}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Storage Usage Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Storage Usage</span>
              <span className="text-sm text-gray-600">
                {usedStorage} GB / {totalStorage} GB
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${(usedStorage / totalStorage) * 100}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search snapshots..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <Switch
            id="auto-backup"
            checked={autoBackup}
            onCheckedChange={setAutoBackup}
          />
          <Label htmlFor="auto-backup">Auto Backup</Label>
        </div>
      </div>

      {/* Snapshots List */}
      <Card>
        <CardHeader>
          <CardTitle>Data Snapshots</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSnapshots.map((snapshot, index) => (
              <motion.div
                key={snapshot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getTypeIcon(snapshot.type)}
                    <div>
                      <h4 className="font-medium">
                        {snapshot.description || `Snapshot ${snapshot.id}`}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {snapshot.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {snapshot.size} GB
                      </div>
                      <div className="text-xs text-gray-600">
                        {snapshot.events.toLocaleString()} events
                      </div>
                    </div>
                    <Badge className={getStatusColor(snapshot.status)}>
                      {snapshot.status}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onRestoreSnapshot(snapshot.id)}
                        disabled={snapshot.status !== "completed"}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Restore
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => onDeleteSnapshot(snapshot.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Users:</span>{" "}
                    {snapshot.users.toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">Type:</span>{" "}
                    {snapshot.type.charAt(0).toUpperCase() +
                      snapshot.type.slice(1)}
                  </div>
                  <div>
                    <span className="font-medium">Retention:</span>{" "}
                    {snapshot.retention}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Backup Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Backup Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="retention-period">Default Retention Period</Label>
              <Select defaultValue="1year">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30days">30 Days</SelectItem>
                  <SelectItem value="90days">90 Days</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                  <SelectItem value="forever">Forever</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="backup-frequency">Backup Frequency</Label>
              <Select defaultValue="daily">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Automatic Cleanup</h4>
              <p className="text-sm text-gray-600">
                Automatically delete old snapshots when storage limit is reached
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataHistoryManager;
