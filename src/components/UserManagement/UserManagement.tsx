import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  UserPlus,
  Settings,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Shield,
  Crown,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  UserCheck,
  UserX,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer" | "analyst";
  status: "active" | "inactive" | "pending" | "suspended";
  lastActive: Date;
  joinDate: Date;
  permissions: string[];
  avatar?: string;
  department?: string;
  projects: string[];
}

interface Team {
  id: string;
  name: string;
  description: string;
  members: string[];
  permissions: string[];
  createdAt: Date;
}

interface UserManagementProps {
  users?: User[];
  teams?: Team[];
  onInviteUser?: (email: string, role: string) => void;
  onUpdateUser?: (id: string, updates: Partial<User>) => void;
  onDeleteUser?: (id: string) => void;
  onCreateTeam?: (team: Partial<Team>) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({
  users = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "admin",
      status: "active",
      lastActive: new Date(Date.now() - 300000),
      joinDate: new Date(Date.now() - 86400000 * 30),
      permissions: ["read", "write", "admin", "export"],
      department: "Product",
      projects: ["Project A", "Project B"],
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.chen@company.com",
      role: "editor",
      status: "active",
      lastActive: new Date(Date.now() - 600000),
      joinDate: new Date(Date.now() - 86400000 * 15),
      permissions: ["read", "write", "export"],
      department: "Marketing",
      projects: ["Project A"],
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      email: "emily.rodriguez@company.com",
      role: "analyst",
      status: "active",
      lastActive: new Date(Date.now() - 1800000),
      joinDate: new Date(Date.now() - 86400000 * 7),
      permissions: ["read", "export"],
      department: "Analytics",
      projects: ["Project B", "Project C"],
    },
    {
      id: "4",
      name: "David Kim",
      email: "david.kim@company.com",
      role: "viewer",
      status: "pending",
      lastActive: new Date(Date.now() - 86400000),
      joinDate: new Date(Date.now() - 86400000 * 2),
      permissions: ["read"],
      department: "Sales",
      projects: ["Project A"],
    },
  ],
  teams = [
    {
      id: "1",
      name: "Product Team",
      description: "Product managers and analysts",
      members: ["1", "3"],
      permissions: ["read", "write", "export"],
      createdAt: new Date(Date.now() - 86400000 * 30),
    },
    {
      id: "2",
      name: "Marketing Team",
      description: "Marketing and growth team",
      members: ["2"],
      permissions: ["read", "export"],
      createdAt: new Date(Date.now() - 86400000 * 20),
    },
  ],
  onInviteUser = () => {},
  onUpdateUser = () => {},
  onDeleteUser = () => {},
  onCreateTeam = () => {},
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isInviting, setIsInviting] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("viewer");

  const getRoleIcon = (role: User["role"]) => {
    switch (role) {
      case "admin":
        return <Crown className="h-4 w-4 text-yellow-600" />;
      case "editor":
        return <Edit className="h-4 w-4 text-blue-600" />;
      case "analyst":
        return <Shield className="h-4 w-4 text-purple-600" />;
      case "viewer":
        return <Eye className="h-4 w-4 text-green-600" />;
      default:
        return <Users className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: User["role"]) => {
    switch (role) {
      case "admin":
        return "bg-yellow-100 text-yellow-800";
      case "editor":
        return "bg-blue-100 text-blue-800";
      case "analyst":
        return "bg-purple-100 text-purple-800";
      case "viewer":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesStatus =
      selectedStatus === "all" || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleInviteUser = () => {
    if (inviteEmail) {
      onInviteUser(inviteEmail, inviteRole);
      setInviteEmail("");
      setIsInviting(false);
    }
  };

  const renderUserCard = (user: User) => (
    <motion.div
      key={user.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src={
                    user.avatar ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`
                  }
                />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">{user.name}</h4>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-xs text-gray-500">{user.department}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit User
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove User
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Badge className={getRoleColor(user.role)}>
              {getRoleIcon(user.role)}
              {user.role}
            </Badge>
            <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Last Active:</span>
              <br />
              {user.lastActive.toLocaleDateString()}
            </div>
            <div>
              <span className="font-medium">Projects:</span>
              <br />
              {user.projects.length} active
            </div>
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
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600">
            Manage users, teams, and permissions across your organization
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Users
          </Button>
          <Button onClick={() => setIsInviting(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Invite User
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
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
                  {users.filter((u) => u.status === "active").length}
                </p>
              </div>
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {users.filter((u) => u.status === "pending").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Teams</p>
                <p className="text-2xl font-bold">{teams.length}</p>
              </div>
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invite User Modal */}
      {isInviting && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle>Invite New User</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="invite-email">Email Address</Label>
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="user@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="invite-role">Role</Label>
                <Select value={inviteRole} onValueChange={setInviteRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="viewer">Viewer</SelectItem>
                    <SelectItem value="analyst">Analyst</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" onClick={() => setIsInviting(false)}>
                Cancel
              </Button>
              <Button onClick={handleInviteUser}>
                <Mail className="h-4 w-4 mr-2" />
                Send Invitation
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="users" className="w-full">
        <TabsList>
          <TabsTrigger value="users">Users ({users.length})</TabsTrigger>
          <TabsTrigger value="teams">Teams ({teams.length})</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="analyst">Analyst</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Users Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map(renderUserCard)}
          </div>
        </TabsContent>

        <TabsContent value="teams" className="mt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Teams</h3>
              <Button onClick={() => onCreateTeam({})}>
                <UserPlus className="h-4 w-4 mr-2" />
                Create Team
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teams.map((team) => (
                <Card key={team.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {team.name}
                      <Badge variant="outline">
                        {team.members.length} members
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-gray-600">{team.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Permissions:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {team.permissions.map((permission) => (
                            <Badge key={permission} variant="outline">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        Created {team.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Permission Management</CardTitle>
              <p className="text-sm text-gray-600">
                Configure role-based permissions and access controls
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {["admin", "editor", "analyst", "viewer"].map((role) => (
                  <div key={role} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {getRoleIcon(role as User["role"])}
                        <h4 className="font-medium capitalize">{role}</h4>
                      </div>
                      <Badge className={getRoleColor(role as User["role"])}>
                        {users.filter((u) => u.role === role).length} users
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        "View Analytics",
                        "Export Data",
                        "Manage Users",
                        "Admin Settings",
                      ].map((permission) => (
                        <div
                          key={permission}
                          className="flex items-center space-x-2"
                        >
                          <Switch
                            defaultChecked={
                              role === "admin" ||
                              (role === "editor" &&
                                permission !== "Admin Settings") ||
                              (role === "analyst" &&
                                ["View Analytics", "Export Data"].includes(
                                  permission,
                                )) ||
                              (role === "viewer" &&
                                permission === "View Analytics")
                            }
                          />
                          <Label className="text-sm">{permission}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-approve new users</h4>
                    <p className="text-sm text-gray-600">
                      Automatically approve users from trusted domains
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Require email verification</h4>
                    <p className="text-sm text-gray-600">
                      Users must verify their email before accessing the
                      platform
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Session timeout</h4>
                    <p className="text-sm text-gray-600">
                      Automatically log out inactive users
                    </p>
                  </div>
                  <Select defaultValue="24h">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">1 hour</SelectItem>
                      <SelectItem value="8h">8 hours</SelectItem>
                      <SelectItem value="24h">24 hours</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagement;
