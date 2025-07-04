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
  Database,
  Cloud,
  Zap,
  Settings,
  Plus,
  Check,
  AlertCircle,
  Trash2,
  Edit,
  RefreshCw,
  Globe,
  Shield,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";

interface DataSource {
  id: string;
  name: string;
  type: "database" | "api" | "webhook" | "file" | "stream";
  status: "connected" | "disconnected" | "error" | "syncing";
  lastSync?: Date;
  recordCount?: number;
  description: string;
  config: Record<string, any>;
}

interface EnrichmentSourcesProps {
  sources?: DataSource[];
  onAddSource?: (source: Partial<DataSource>) => void;
  onUpdateSource?: (id: string, updates: Partial<DataSource>) => void;
  onDeleteSource?: (id: string) => void;
}

const EnrichmentSources: React.FC<EnrichmentSourcesProps> = ({
  sources = [
    {
      id: "1",
      name: "Customer Database",
      type: "database",
      status: "connected",
      lastSync: new Date(Date.now() - 300000),
      recordCount: 125430,
      description: "Primary customer data from PostgreSQL",
      config: { host: "db.company.com", database: "customers" },
    },
    {
      id: "2",
      name: "Salesforce CRM",
      type: "api",
      status: "connected",
      lastSync: new Date(Date.now() - 600000),
      recordCount: 45230,
      description: "Sales and lead data from Salesforce",
      config: { endpoint: "https://api.salesforce.com", version: "v52.0" },
    },
    {
      id: "3",
      name: "Marketing Events",
      type: "webhook",
      status: "syncing",
      recordCount: 89340,
      description: "Real-time marketing event data",
      config: { url: "https://webhook.company.com/marketing" },
    },
    {
      id: "4",
      name: "Support Tickets",
      type: "api",
      status: "error",
      lastSync: new Date(Date.now() - 3600000),
      recordCount: 23450,
      description: "Customer support data from Zendesk",
      config: { endpoint: "https://company.zendesk.com/api/v2" },
    },
  ],
  onAddSource = () => {},
  onUpdateSource = () => {},
  onDeleteSource = () => {},
}) => {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [isAddingSource, setIsAddingSource] = useState(false);
  const [newSource, setNewSource] = useState<Partial<DataSource>>({});

  const getStatusIcon = (status: DataSource["status"]) => {
    switch (status) {
      case "connected":
        return <Check className="h-4 w-4 text-green-500" />;
      case "syncing":
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: DataSource["status"]) => {
    const variants = {
      connected: "bg-green-100 text-green-800",
      syncing: "bg-blue-100 text-blue-800",
      error: "bg-red-100 text-red-800",
      disconnected: "bg-gray-100 text-gray-800",
    };

    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getTypeIcon = (type: DataSource["type"]) => {
    switch (type) {
      case "database":
        return <Database className="h-5 w-5 text-blue-600" />;
      case "api":
        return <Globe className="h-5 w-5 text-green-600" />;
      case "webhook":
        return <Zap className="h-5 w-5 text-yellow-600" />;
      case "file":
        return <Cloud className="h-5 w-5 text-purple-600" />;
      case "stream":
        return <Activity className="h-5 w-5 text-red-600" />;
      default:
        return <Database className="h-5 w-5 text-gray-600" />;
    }
  };

  const handleAddSource = () => {
    if (newSource.name && newSource.type) {
      onAddSource({
        ...newSource,
        id: Date.now().toString(),
        status: "disconnected",
        recordCount: 0,
        config: {},
      });
      setNewSource({});
      setIsAddingSource(false);
    }
  };

  const renderSourceCard = (source: DataSource) => (
    <motion.div
      key={source.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
        onClick={() => setSelectedSource(source.id)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getTypeIcon(source.type)}
              <div>
                <CardTitle className="text-lg">{source.name}</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  {source.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(source.status)}
              {getStatusBadge(source.status)}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Records:</span>
              <span className="ml-2 font-medium">
                {source.recordCount?.toLocaleString() || "0"}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Last Sync:</span>
              <span className="ml-2 font-medium">
                {source.lastSync
                  ? source.lastSync.toLocaleTimeString()
                  : "Never"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Configure
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-1" />
                Sync
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="w-full space-y-6 bg-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Data Enrichment Sources
          </h2>
          <p className="text-gray-600">
            Connect unlimited data sources to enrich your analytics
          </p>
        </div>

        <Button onClick={() => setIsAddingSource(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Source
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Sources
                </p>
                <p className="text-2xl font-bold">{sources.length}</p>
              </div>
              <Database className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Connected</p>
                <p className="text-2xl font-bold text-green-600">
                  {sources.filter((s) => s.status === "connected").length}
                </p>
              </div>
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Records
                </p>
                <p className="text-2xl font-bold">
                  {sources
                    .reduce((sum, s) => sum + (s.recordCount || 0), 0)
                    .toLocaleString()}
                </p>
              </div>
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sync Status</p>
                <p className="text-2xl font-bold text-blue-600">
                  {sources.filter((s) => s.status === "syncing").length}
                </p>
              </div>
              <RefreshCw className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Source Modal */}
      {isAddingSource && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle>Add New Data Source</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="source-name">Source Name</Label>
                <Input
                  id="source-name"
                  placeholder="Enter source name"
                  value={newSource.name || ""}
                  onChange={(e) =>
                    setNewSource({ ...newSource, name: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="source-type">Source Type</Label>
                <Select
                  onValueChange={(value) =>
                    setNewSource({
                      ...newSource,
                      type: value as DataSource["type"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select source type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="database">Database</SelectItem>
                    <SelectItem value="api">API</SelectItem>
                    <SelectItem value="webhook">Webhook</SelectItem>
                    <SelectItem value="file">File Upload</SelectItem>
                    <SelectItem value="stream">Data Stream</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="source-description">Description</Label>
              <Input
                id="source-description"
                placeholder="Describe this data source"
                value={newSource.description || ""}
                onChange={(e) =>
                  setNewSource({ ...newSource, description: e.target.value })
                }
              />
            </div>

            <div className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsAddingSource(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddSource}>Add Source</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sources Grid */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Sources ({sources.length})</TabsTrigger>
          <TabsTrigger value="connected">
            Connected ({sources.filter((s) => s.status === "connected").length})
          </TabsTrigger>
          <TabsTrigger value="database">
            Databases ({sources.filter((s) => s.type === "database").length})
          </TabsTrigger>
          <TabsTrigger value="api">
            APIs ({sources.filter((s) => s.type === "api").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sources.map(renderSourceCard)}
          </div>
        </TabsContent>

        <TabsContent value="connected" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sources
              .filter((s) => s.status === "connected")
              .map(renderSourceCard)}
          </div>
        </TabsContent>

        <TabsContent value="database" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sources.filter((s) => s.type === "database").map(renderSourceCard)}
          </div>
        </TabsContent>

        <TabsContent value="api" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sources.filter((s) => s.type === "api").map(renderSourceCard)}
          </div>
        </TabsContent>
      </Tabs>

      {/* Security Notice */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800">
                Security & Compliance
              </h4>
              <p className="text-sm text-yellow-700 mt-1">
                All data sources are encrypted in transit and at rest. We comply
                with SOC 2, GDPR, and CCPA requirements. Your data never leaves
                your designated region.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnrichmentSources;
