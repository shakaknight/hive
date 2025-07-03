import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Target,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function EffortAnalysis() {
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
              Effort Analysis
              <span className="text-green-600"> Optimization</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Measure and reduce user effort to create frictionless experiences
              that drive conversion and satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="text-lg px-8 py-3">
                  Try Interactive Demo
                  <Target className="ml-2 h-5 w-5" />
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
              Interactive Effort Analysis Demo
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover how to measure and optimize user effort
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="friction">Friction Points</TabsTrigger>
                <TabsTrigger value="optimization">Optimization</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Effort Score
                      </CardTitle>
                      <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">
                        7.2/10
                      </div>
                      <p className="text-xs text-muted-foreground">
                        +0.8 from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Friction Points
                      </CardTitle>
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-orange-600">
                        12
                      </div>
                      <p className="text-xs text-muted-foreground">
                        -3 from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Task Success Rate
                      </CardTitle>
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">
                        89.3%
                      </div>
                      <p className="text-xs text-muted-foreground">
                        +5.2% from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Avg. Time to Complete
                      </CardTitle>
                      <TrendingDown className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2:34</div>
                      <p className="text-xs text-muted-foreground">
                        -23s from last month
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Effort Score Trend</CardTitle>
                      <CardDescription>
                        Track effort improvements over time
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                        <p className="text-gray-600">
                          Effort Score Trend Chart
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Task Completion Funnel</CardTitle>
                      <CardDescription>
                        See where users struggle most
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Start Task
                          </span>
                          <div className="flex items-center space-x-2">
                            <Progress value={100} className="w-24" />
                            <span className="text-sm">100%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Form Completion
                          </span>
                          <div className="flex items-center space-x-2">
                            <Progress value={85} className="w-24" />
                            <span className="text-sm">85%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Payment Info
                          </span>
                          <div className="flex items-center space-x-2">
                            <Progress value={72} className="w-24" />
                            <span className="text-sm">72%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Task Complete
                          </span>
                          <div className="flex items-center space-x-2">
                            <Progress value={68} className="w-24" />
                            <span className="text-sm">68%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="friction" className="mt-8">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                        High Friction Points
                      </CardTitle>
                      <CardDescription>
                        Areas where users experience the most difficulty
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                          <div>
                            <h4 className="font-semibold text-red-800">
                              Payment Form Validation
                            </h4>
                            <p className="text-sm text-red-600">
                              Users struggle with form validation errors
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-red-600">
                              High
                            </div>
                            <div className="text-sm text-red-500">
                              32% drop-off
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                          <div>
                            <h4 className="font-semibold text-orange-800">
                              Navigation Menu
                            </h4>
                            <p className="text-sm text-orange-600">
                              Users can't find key features easily
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-orange-600">
                              Medium
                            </div>
                            <div className="text-sm text-orange-500">
                              18% confusion
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                          <div>
                            <h4 className="font-semibold text-yellow-800">
                              Search Functionality
                            </h4>
                            <p className="text-sm text-yellow-600">
                              Search results don't match user intent
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-yellow-600">
                              Low
                            </div>
                            <div className="text-sm text-yellow-500">
                              8% retry rate
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="optimization" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Optimization Recommendations</CardTitle>
                      <CardDescription>
                        AI-powered suggestions to reduce user effort
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                          <Zap className="h-5 w-5 text-blue-500 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-blue-800">
                              Simplify Payment Form
                            </h4>
                            <p className="text-sm text-blue-600">
                              Reduce form fields by 40% and add inline
                              validation
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-green-800">
                              Improve Navigation
                            </h4>
                            <p className="text-sm text-green-600">
                              Add breadcrumbs and reorganize menu structure
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                          <Target className="h-5 w-5 text-purple-500 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-purple-800">
                              Enhanced Search
                            </h4>
                            <p className="text-sm text-purple-600">
                              Implement autocomplete and better filtering
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>A/B Test Results</CardTitle>
                      <CardDescription>
                        Compare optimization impact
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">
                              Form Completion Rate
                            </span>
                            <span className="text-sm text-green-600">+23%</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-gray-200 p-2 rounded text-center">
                              <div className="text-lg font-bold">68%</div>
                              <div className="text-xs text-gray-600">
                                Control
                              </div>
                            </div>
                            <div className="bg-green-100 p-2 rounded text-center">
                              <div className="text-lg font-bold text-green-600">
                                84%
                              </div>
                              <div className="text-xs text-green-600">
                                Optimized
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">
                              Task Completion Time
                            </span>
                            <span className="text-sm text-green-600">-34%</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-gray-200 p-2 rounded text-center">
                              <div className="text-lg font-bold">3:45</div>
                              <div className="text-xs text-gray-600">
                                Control
                              </div>
                            </div>
                            <div className="bg-green-100 p-2 rounded text-center">
                              <div className="text-lg font-bold text-green-600">
                                2:28
                              </div>
                              <div className="text-xs text-green-600">
                                Optimized
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="results" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="bg-green-50 border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-800">
                        Effort Reduced
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-600">
                        -42%
                      </div>
                      <p className="text-sm text-green-600">
                        Average user effort decreased
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-800">
                        Conversion Improved
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600">
                        +28%
                      </div>
                      <p className="text-sm text-blue-600">
                        Higher task completion rate
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-purple-50 border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-purple-800">
                        Satisfaction Up
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-purple-600">
                        +35%
                      </div>
                      <p className="text-sm text-purple-600">
                        User satisfaction score
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Success Stories</CardTitle>
                    <CardDescription>
                      Real impact from effort optimization
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-semibold text-green-800">
                          E-commerce Checkout
                        </h4>
                        <p className="text-gray-600 mb-2">
                          Reduced checkout abandonment by 45% through form
                          optimization and progress indicators.
                        </p>
                        <div className="text-sm text-green-600 font-medium">
                          Result: +$2.3M annual revenue
                        </div>
                      </div>

                      <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-semibold text-blue-800">
                          SaaS Onboarding
                        </h4>
                        <p className="text-gray-600 mb-2">
                          Streamlined user onboarding process, reducing
                          time-to-value by 60%.
                        </p>
                        <div className="text-sm text-blue-600 font-medium">
                          Result: +32% user activation
                        </div>
                      </div>

                      <div className="border-l-4 border-purple-500 pl-4">
                        <h4 className="font-semibold text-purple-800">
                          Mobile App Navigation
                        </h4>
                        <p className="text-gray-600 mb-2">
                          Redesigned navigation based on effort analysis,
                          improving user engagement.
                        </p>
                        <div className="text-sm text-purple-600 font-medium">
                          Result: +25% daily active users
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
              Effort Analysis Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools to measure and optimize user effort
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Target className="h-12 w-12 text-green-500 mb-4" />
                <CardTitle>Effort Scoring</CardTitle>
                <CardDescription>
                  Quantify user effort with our proprietary scoring algorithm
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <AlertTriangle className="h-12 w-12 text-orange-500 mb-4" />
                <CardTitle>Friction Detection</CardTitle>
                <CardDescription>
                  Automatically identify points of user frustration
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Zap className="h-12 w-12 text-blue-500 mb-4" />
                <CardTitle>Smart Recommendations</CardTitle>
                <CardDescription>
                  AI-powered suggestions for reducing user effort
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Optimize user effort today
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Start measuring and reducing user effort to create frictionless
            experiences that convert.
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
