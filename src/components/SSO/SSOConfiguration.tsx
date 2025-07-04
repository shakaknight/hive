import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shield,
  Key,
  Users,
  Settings,
  Plus,
  Check,
  AlertCircle,
  Copy,
  Eye,
  EyeOff,
  Download,
  Upload,
  Globe,
  Lock,
  UserCheck,
} from "lucide-react";
import { motion } from "framer-motion";

interface SSOProvider {
  id: string;
  name: string;
  type: "saml" | "oidc" | "oauth" | "ldap";
  status: "active" | "inactive" | "pending" | "error";
  users: number;
  lastSync?: Date;
  config: Record<string, any>;
  domains: string[];
}

interface SSOConfigurationProps {
  providers?: SSOProvider[];
  onAddProvider?: (provider: Partial<SSOProvider>) => void;
  onUpdateProvider?: (id: string, updates: Partial<SSOProvider>) => void;
  onDeleteProvider?: (id: string) => void;
  onTestConnection?: (id: string) => void;
}

const SSOConfiguration: React.FC<SSOConfigurationProps> = ({
  providers = [
    {
      id: "1",
      name: "Okta SAML",
      type: "saml",
      status: "active",
      users: 245,
      lastSync: new Date(Date.now() - 300000),
      config: {
        entityId: "https://company.okta.com",
        ssoUrl: "https://company.okta.com/app/heap/sso/saml",
        certificate: "-----BEGIN CERTIFICATE-----\n...",
      },
      domains: ["company.com", "subsidiary.com"],
    },
    {
      id: "2",
      name: "Azure AD OIDC",
      type: "oidc",
      status: "active",
      users: 189,
      lastSync: new Date(Date.now() - 600000),
      config: {
        clientId: "abc123-def456-ghi789",
        clientSecret: "***hidden***",
        discoveryUrl:
          "https://login.microsoftonline.com/tenant/.well-known/openid_configuration",
      },
      domains: ["company.com"],
    },
    {
      id: "3",
      name: "Google Workspace",
      type: "oauth",
      status: "pending",
      users: 0,
      config: {
        clientId: "123456789.apps.googleusercontent.com",
        clientSecret: "***hidden***",
        hostedDomain: "company.com",
      },
      domains: ["company.com"],
    },
  ],
  onAddProvider = () => {},
  onUpdateProvider = () => {},
  onDeleteProvider = () => {},
  onTestConnection = () => {},
}) => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [isAddingProvider, setIsAddingProvider] = useState(false);
  const [newProvider, setNewProvider] = useState<Partial<SSOProvider>>({});
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});

  const getStatusColor = (status: SSOProvider["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: SSOProvider["type"]) => {
    switch (type) {
      case "saml":
        return <Shield className="h-5 w-5 text-blue-600" />;
      case "oidc":
        return <Key className="h-5 w-5 text-green-600" />;
      case "oauth":
        return <Globe className="h-5 w-5 text-purple-600" />;
      case "ldap":
        return <Users className="h-5 w-5 text-orange-600" />;
      default:
        return <Lock className="h-5 w-5 text-gray-600" />;
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const toggleSecretVisibility = (providerId: string, field: string) => {
    const key = `${providerId}-${field}`;
    setShowSecrets((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderProviderCard = (provider: SSOProvider) => (
    <motion.div
      key={provider.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getTypeIcon(provider.type)}
              <div>
                <CardTitle className="text-lg">{provider.name}</CardTitle>
                <p className="text-sm text-gray-600">
                  {provider.type.toUpperCase()} • {provider.domains.join(", ")}
                </p>
              </div>
            </div>
            <Badge className={getStatusColor(provider.status)}>
              {provider.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <span className="text-sm text-gray-600">Active Users:</span>
              <span className="ml-2 font-medium">{provider.users}</span>
            </div>
            <div>
              <span className="text-sm text-gray-600">Last Sync:</span>
              <span className="ml-2 font-medium">
                {provider.lastSync
                  ? provider.lastSync.toLocaleTimeString()
                  : "Never"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSelectedProvider(provider.id)}
            >
              <Settings className="h-4 w-4 mr-1" />
              Configure
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onTestConnection(provider.id)}
            >
              <UserCheck className="h-4 w-4 mr-1" />
              Test
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-red-600 hover:text-red-700"
            >
              Disable
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderProviderConfig = (provider: SSOProvider) => {
    switch (provider.type) {
      case "saml":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="entity-id">Entity ID</Label>
              <div className="flex gap-2">
                <Input
                  id="entity-id"
                  value={provider.config.entityId}
                  readOnly
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(provider.config.entityId)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="sso-url">SSO URL</Label>
              <div className="flex gap-2">
                <Input id="sso-url" value={provider.config.ssoUrl} readOnly />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(provider.config.ssoUrl)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="certificate">X.509 Certificate</Label>
              <Textarea
                id="certificate"
                value={provider.config.certificate}
                rows={6}
                readOnly
              />
            </div>
          </div>
        );

      case "oidc":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="client-id">Client ID</Label>
              <div className="flex gap-2">
                <Input
                  id="client-id"
                  value={provider.config.clientId}
                  readOnly
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(provider.config.clientId)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="client-secret">Client Secret</Label>
              <div className="flex gap-2">
                <Input
                  id="client-secret"
                  type={
                    showSecrets[`${provider.id}-secret`] ? "text" : "password"
                  }
                  value={provider.config.clientSecret}
                  readOnly
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleSecretVisibility(provider.id, "secret")}
                >
                  {showSecrets[`${provider.id}-secret`] ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="discovery-url">Discovery URL</Label>
              <Input
                id="discovery-url"
                value={provider.config.discoveryUrl}
                readOnly
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8 text-gray-500">
            Configuration options for {provider.type.toUpperCase()}
          </div>
        );
    }
  };

  if (selectedProvider) {
    const provider = providers.find((p) => p.id === selectedProvider);
    if (provider) {
      return (
        <div className="w-full space-y-6 bg-white">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setSelectedProvider(null)}>
              ← Back to Providers
            </Button>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(provider.status)}>
                {provider.status}
              </Badge>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                {getTypeIcon(provider.type)}
                {provider.name} Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="config" className="w-full">
                <TabsList>
                  <TabsTrigger value="config">Configuration</TabsTrigger>
                  <TabsTrigger value="users">Users</TabsTrigger>
                  <TabsTrigger value="domains">Domains</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                <TabsContent value="config" className="mt-6">
                  {renderProviderConfig(provider)}
                </TabsContent>

                <TabsContent value="users" className="mt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">
                        Active Users ({provider.users})
                      </h4>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Export List
                      </Button>
                    </div>
                    <div className="text-center py-8 text-gray-500">
                      User management interface would be here
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="domains" className="mt-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Authorized Domains</h4>
                    {provider.domains.map((domain, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <span>{domain}</span>
                        <Button size="sm" variant="outline">
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Domain
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="mt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">
                          Just-in-Time Provisioning
                        </h4>
                        <p className="text-sm text-gray-600">
                          Automatically create user accounts on first login
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Force Re-authentication</h4>
                        <p className="text-sm text-gray-600">
                          Require users to re-authenticate periodically
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      );
    }
  }

  return (
    <div className="w-full space-y-6 bg-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            SSO Configuration
          </h2>
          <p className="text-gray-600">
            Manage single sign-on providers and authentication settings
          </p>
        </div>

        <Button onClick={() => setIsAddingProvider(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Provider
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  SSO Providers
                </p>
                <p className="text-2xl font-bold">{providers.length}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Users
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {providers.reduce((sum, p) => sum + p.users, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold">
                  {providers.filter((p) => p.status === "active").length}
                </p>
              </div>
              <Check className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Domains</p>
                <p className="text-2xl font-bold">
                  {new Set(providers.flatMap((p) => p.domains)).size}
                </p>
              </div>
              <Globe className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Provider Form */}
      {isAddingProvider && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle>Add SSO Provider</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="provider-name">Provider Name</Label>
                <Input
                  id="provider-name"
                  placeholder="Enter provider name"
                  value={newProvider.name || ""}
                  onChange={(e) =>
                    setNewProvider({ ...newProvider, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="provider-type">Provider Type</Label>
                <Select
                  onValueChange={(value) =>
                    setNewProvider({
                      ...newProvider,
                      type: value as SSOProvider["type"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="saml">SAML 2.0</SelectItem>
                    <SelectItem value="oidc">OpenID Connect</SelectItem>
                    <SelectItem value="oauth">OAuth 2.0</SelectItem>
                    <SelectItem value="ldap">LDAP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsAddingProvider(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => onAddProvider(newProvider)}>
                Add Provider
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Providers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map(renderProviderCard)}
      </div>

      {/* Security Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800">Enterprise Security</h4>
              <p className="text-sm text-blue-700 mt-1">
                All SSO connections are encrypted and monitored. We support SAML
                2.0, OpenID Connect, OAuth 2.0, and LDAP protocols with
                enterprise-grade security standards.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SSOConfiguration;
