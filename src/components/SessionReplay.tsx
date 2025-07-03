import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Eye,
  MousePointer,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SessionReplay() {
  const [isPlaying, setIsPlaying] = useState(false);

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

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Session Replay
              <span className="text-blue-600"> Insights</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Watch real user sessions to understand exactly how users interact
              with your product and identify friction points.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="text-lg px-8 py-3">
                  Try Interactive Demo
                  <Play className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Interactive Session Replay Demo
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience how session replay helps you understand user behavior
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="player" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="player">Session Player</TabsTrigger>
                <TabsTrigger value="heatmaps">Heatmaps</TabsTrigger>
                <TabsTrigger value="analytics">Session Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="player" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Session Replay Player
                    </CardTitle>
                    <CardDescription>
                      Watch user interactions in real-time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Mock Session Player */}
                    <div className="bg-gray-900 rounded-lg p-6 mb-6">
                      <div className="bg-white rounded-lg h-96 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                              {isPlaying ? (
                                <Pause className="h-8 w-8 text-white" />
                              ) : (
                                <Play className="h-8 w-8 text-white" />
                              )}
                            </div>
                            <p className="text-gray-600">
                              Session Replay Simulation
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                              User: john.doe@example.com
                            </p>
                            <p className="text-sm text-gray-500">
                              Duration: 5:23
                            </p>
                          </div>
                        </div>

                        {/* Mock cursor */}
                        <div className="absolute top-20 left-32 animate-pulse">
                          <MousePointer className="h-6 w-6 text-red-500" />
                        </div>
                      </div>
                    </div>

                    {/* Player Controls */}
                    <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4">
                      <div className="flex items-center space-x-4">
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
                        <Button variant="outline" size="sm">
                          <SkipBack className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <SkipForward className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">
                          2:15 / 5:23
                        </span>
                        <div className="w-64 h-2 bg-gray-300 rounded-full">
                          <div className="w-2/5 h-full bg-blue-500 rounded-full"></div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">1x</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="heatmaps" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Click Heatmap</CardTitle>
                      <CardDescription>
                        See where users click most frequently
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-gradient-to-br from-red-100 via-yellow-100 to-green-100 rounded-lg relative">
                        <div className="absolute top-8 left-8 w-8 h-8 bg-red-500 rounded-full opacity-70"></div>
                        <div className="absolute top-16 right-12 w-6 h-6 bg-orange-500 rounded-full opacity-60"></div>
                        <div className="absolute bottom-12 left-16 w-10 h-10 bg-red-600 rounded-full opacity-80"></div>
                        <div className="absolute bottom-8 right-8 w-4 h-4 bg-yellow-500 rounded-full opacity-50"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-gray-600">
                            Click Heatmap Visualization
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Scroll Heatmap</CardTitle>
                      <CardDescription>
                        Understand how far users scroll
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-gradient-to-b from-green-200 via-yellow-200 to-red-200 rounded-lg flex items-center justify-center">
                        <p className="text-gray-600">
                          Scroll Depth Visualization
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Session Duration
                      </CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">5:23</div>
                      <p className="text-xs text-muted-foreground">
                        Average: 4:12
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Page Views
                      </CardTitle>
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">8</div>
                      <p className="text-xs text-muted-foreground">
                        +2 from average
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Clicks
                      </CardTitle>
                      <MousePointer className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">23</div>
                      <p className="text-xs text-muted-foreground">
                        High engagement
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Session Timeline</CardTitle>
                    <CardDescription>
                      Key events during this session
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="font-medium">Page Load: Homepage</p>
                          <p className="text-sm text-gray-500">0:00</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="font-medium">
                            Click: Product Analytics Button
                          </p>
                          <p className="text-sm text-gray-500">0:45</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-3 bg-yellow-50 rounded-lg">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="font-medium">
                            Page Load: Product Analytics
                          </p>
                          <p className="text-sm text-gray-500">1:12</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="font-medium">
                            Click: Try Interactive Demo
                          </p>
                          <p className="text-sm text-gray-500">2:30</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Session Replay Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools to understand user behavior
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Play className="h-12 w-12 text-blue-500 mb-4" />
                <CardTitle>HD Session Recording</CardTitle>
                <CardDescription>
                  Crystal clear recordings of every user interaction
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <MousePointer className="h-12 w-12 text-green-500 mb-4" />
                <CardTitle>Click & Scroll Tracking</CardTitle>
                <CardDescription>
                  See exactly where users click and how they navigate
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Eye className="h-12 w-12 text-purple-500 mb-4" />
                <CardTitle>Privacy Controls</CardTitle>
                <CardDescription>
                  Automatic masking of sensitive data and PII
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
            Start recording user sessions today and discover insights you never
            knew existed.
          </p>
          <Link to="/dashboard">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
