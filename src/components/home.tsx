import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  ArrowRight,
  BarChart3,
  Play,
  Users,
  Zap,
  Eye,
  Target,
  Shield,
  Globe,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-purple-600">Heap</div>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Product</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-6 w-[400px]">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/product-analytics"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              Product Analytics
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Understand user behavior with comprehensive
                              analytics
                            </p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/session-replay"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              Session Replay
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Watch user sessions to identify issues
                            </p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/effort-analysis"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              Effort Analysis
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Measure user effort and optimize experiences
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/documentation"
                        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                      >
                        Documentation
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
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
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Understand your users.
              <span className="text-purple-600"> Automatically.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Heap automatically captures every user interaction, giving you
              complete visibility into your customer journey without manual
              tracking.
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

          {/* Animated Graphics Placeholder */}
          <div className="mt-16 relative">
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-8 mx-auto max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <BarChart3 className="h-12 w-12 text-purple-600 mb-4" />
                  <h3 className="font-semibold mb-2">Analytics Dashboard</h3>
                  <div className="h-20 bg-gradient-to-r from-purple-200 to-blue-200 rounded"></div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <Eye className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="font-semibold mb-2">Session Replay</h3>
                  <div className="h-20 bg-gradient-to-r from-blue-200 to-green-200 rounded"></div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <Target className="h-12 w-12 text-green-600 mb-4" />
                  <h3 className="font-semibold mb-2">User Funnels</h3>
                  <div className="h-20 bg-gradient-to-r from-green-200 to-purple-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to understand your users
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive analytics platform with automatic data capture and
              powerful insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Zap className="h-12 w-12 text-yellow-500 mb-4" />
                <CardTitle>Automatic Capture</CardTitle>
                <CardDescription>
                  No manual tagging required. Heap captures every click, tap,
                  and interaction automatically.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-purple-500 mb-4" />
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>
                  Powerful analytics tools to understand user behavior and
                  optimize your product.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Eye className="h-12 w-12 text-blue-500 mb-4" />
                <CardTitle>Session Replay</CardTitle>
                <CardDescription>
                  Watch real user sessions to identify friction points and
                  improve UX.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Target className="h-12 w-12 text-green-500 mb-4" />
                <CardTitle>Conversion Funnels</CardTitle>
                <CardDescription>
                  Track user journeys and identify where users drop off in your
                  funnel.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Users className="h-12 w-12 text-red-500 mb-4" />
                <CardTitle>User Segmentation</CardTitle>
                <CardDescription>
                  Create detailed user segments based on behavior and
                  demographics.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Shield className="h-12 w-12 text-indigo-500 mb-4" />
                <CardTitle>Privacy First</CardTitle>
                <CardDescription>
                  Enterprise-grade security with GDPR and CCPA compliance
                  built-in.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Logos */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gray-600 text-lg">
              Trusted by thousands of companies worldwide
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            <div className="bg-gray-200 h-12 rounded flex items-center justify-center font-semibold">
              Microsoft
            </div>
            <div className="bg-gray-200 h-12 rounded flex items-center justify-center font-semibold">
              Twilio
            </div>
            <div className="bg-gray-200 h-12 rounded flex items-center justify-center font-semibold">
              Shopify
            </div>
            <div className="bg-gray-200 h-12 rounded flex items-center justify-center font-semibold">
              Allbirds
            </div>
            <div className="bg-gray-200 h-12 rounded flex items-center justify-center font-semibold">
              Zendesk
            </div>
            <div className="bg-gray-200 h-12 rounded flex items-center justify-center font-semibold">
              Casper
            </div>
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
            Join thousands of companies using Heap to make data-driven decisions
            and improve their products.
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-purple-400 mb-4">
                Heap
              </div>
              <p className="text-gray-400">
                Understand your users automatically with comprehensive digital
                insights.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/product-analytics" className="hover:text-white">
                    Product Analytics
                  </Link>
                </li>
                <li>
                  <Link to="/session-replay" className="hover:text-white">
                    Session Replay
                  </Link>
                </li>
                <li>
                  <Link to="/effort-analysis" className="hover:text-white">
                    Effort Analysis
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/documentation" className="hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Heap Analytics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
