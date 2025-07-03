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
  BarChart3,
  Play,
  Eye,
  Target,
  ArrowRight,
  CheckCircle,
  Zap,
  Users,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductPage() {
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
              Complete Product
              <span className="text-purple-600"> Intelligence</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Get the full picture of your user experience with our
              comprehensive suite of analytics, replay, and optimization tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="text-lg px-8 py-3">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need in one platform
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools to understand, analyze, and optimize your user
              experience
            </p>
          </div>

          <Tabs defaultValue="analytics" className="w-full max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              <TabsTrigger value="analytics" className="py-4">
                <BarChart3 className="h-5 w-5 mr-2" />
                Product Analytics
              </TabsTrigger>
              <TabsTrigger value="replay" className="py-4">
                <Eye className="h-5 w-5 mr-2" />
                Session Replay
              </TabsTrigger>
              <TabsTrigger value="effort" className="py-4">
                <Target className="h-5 w-5 mr-2" />
                Effort Analysis
              </TabsTrigger>
            </TabsList>

            <TabsContent value="analytics">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-6">
                    Understand user behavior automatically
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Capture every user interaction without manual tracking. Get
                    insights into user flows, conversion funnels, and behavioral
                    patterns.
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Automatic event capture</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Real-time analytics dashboard</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Advanced user segmentation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Conversion funnel analysis</span>
                    </div>
                  </div>
                  <Link to="/product-analytics">
                    <Button size="lg">
                      Explore Analytics
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl p-8">
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          24.5K
                        </div>
                        <div className="text-sm text-gray-600">Total Users</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          3.2%
                        </div>
                        <div className="text-sm text-gray-600">
                          Conversion Rate
                        </div>
                      </div>
                    </div>
                    <div className="h-32 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-12 w-12 text-gray-600" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="replay">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-6">
                    See exactly how users interact
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Watch real user sessions to understand pain points, identify
                    bugs, and discover optimization opportunities.
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>HD session recordings</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Click and scroll heatmaps</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Error tracking integration</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Privacy-first recording</span>
                    </div>
                  </div>
                  <Link to="/session-replay">
                    <Button size="lg">
                      Explore Session Replay
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-xl p-8">
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm font-medium">Session Replay</div>
                      <Play className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <Eye className="h-12 w-12 text-gray-600" />
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Duration: 5:23</span>
                      <span>User: john@example.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="effort">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-6">
                    Measure and reduce user effort
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Identify friction points and optimize your user experience
                    to create effortless interactions that drive conversion.
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Effort scoring algorithm</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Friction point detection</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>A/B testing integration</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Optimization recommendations</span>
                    </div>
                  </div>
                  <Link to="/effort-analysis">
                    <Button size="lg">
                      Explore Effort Analysis
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
                <div className="bg-gradient-to-br from-green-100 to-yellow-100 rounded-xl p-8">
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        7.2/10
                      </div>
                      <div className="text-sm text-gray-600">Effort Score</div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Task Completion</span>
                        <span className="text-sm font-medium">89%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Avg. Time</span>
                        <span className="text-sm font-medium">2:34</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Friction Points</span>
                        <span className="text-sm font-medium text-orange-600">
                          12
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why teams choose our platform
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get faster insights, make better decisions, and create exceptional
              user experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Zap className="h-12 w-12 text-yellow-500 mb-4" />
                <CardTitle>Faster Implementation</CardTitle>
                <CardDescription>
                  Get up and running in minutes with automatic data capture and
                  zero-configuration setup.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-green-500 mb-4" />
                <CardTitle>Better Insights</CardTitle>
                <CardDescription>
                  Make data-driven decisions with comprehensive analytics and
                  real user behavior data.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-500 mb-4" />
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>
                  Share insights across teams with collaborative dashboards and
                  reporting tools.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to understand your users?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Start your free trial today and discover insights that will
            transform your product.
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
              variant="outline"
              size="lg"
              className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-purple-600"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
