import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  BarChart2,
  Play,
  Users,
  LineChart,
  Zap,
  CheckCircle,
} from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">heap</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/product-analytics"
                className="text-sm font-medium text-gray-600 hover:text-blue-600"
              >
                Product Analytics
              </Link>
              <Link
                to="/session-replay"
                className="text-sm font-medium text-gray-600 hover:text-blue-600"
              >
                Session Replay
              </Link>
              <Link
                to="/effort-analysis"
                className="text-sm font-medium text-gray-600 hover:text-blue-600"
              >
                Effort Analysis
              </Link>
              <Link
                to="/pricing"
                className="text-sm font-medium text-gray-600 hover:text-blue-600"
              >
                Pricing
              </Link>
              <Link
                to="/resources"
                className="text-sm font-medium text-gray-600 hover:text-blue-600"
              >
                Resources
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="hidden md:block text-sm font-medium text-gray-600 hover:text-blue-600"
            >
              Log in
            </Link>
            <Button asChild>
              <Link to="/signup">Get started free</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Understand your users. Build better products.
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Heap automatically captures every user interaction with your
              digital experience to help you build products your customers love.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button size="lg" className="px-8">
                Get started free
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Play size={16} />
                Watch demo
              </Button>
            </motion.div>
          </div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-blue-50 rounded-xl p-4 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                alt="Analytics Dashboard"
                className="rounded-lg shadow-md w-full"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-3 rounded-lg shadow-lg">
              <BarChart2 className="h-12 w-12 text-blue-600" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="bg-gray-50 py-16">
        <div className="container">
          <h2 className="text-center text-lg font-medium text-gray-600 mb-10">
            Trusted by innovative companies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              >
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=company${i}`}
                  alt={`Company ${i}`}
                  className="h-12 w-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to build better products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Heap combines powerful analytics, session replay, and effort
            analysis to give you a complete view of your user experience.
          </p>
        </div>

        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12">
            <TabsTrigger value="analytics" className="py-3">
              Product Analytics
            </TabsTrigger>
            <TabsTrigger value="replay" className="py-3">
              Session Replay
            </TabsTrigger>
            <TabsTrigger value="effort" className="py-3">
              Effort Analysis
            </TabsTrigger>
          </TabsList>
          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Understand user behavior at scale
                </h3>
                <p className="text-gray-600 mb-6">
                  Automatically capture every user interaction without manual
                  instrumentation. Analyze user flows, conversion funnels, and
                  more.
                </p>
                <ul className="space-y-3">
                  {[
                    "Automatic event tracking",
                    "Powerful segmentation",
                    "Conversion funnels",
                    "User paths analysis",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle size={20} className="text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-8 gap-2">
                  Learn more <ArrowRight size={16} />
                </Button>
              </div>
              <div className="bg-gray-100 rounded-xl p-6">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                  alt="Product Analytics"
                  className="rounded-lg shadow-md w-full"
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="replay" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  See exactly how users interact with your product
                </h3>
                <p className="text-gray-600 mb-6">
                  Watch real user sessions to understand pain points, bugs, and
                  opportunities for improvement.
                </p>
                <ul className="space-y-3">
                  {[
                    "High-fidelity session recordings",
                    "Integrated with analytics",
                    "Error tracking",
                    "User frustration detection",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle size={20} className="text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-8 gap-2">
                  Learn more <ArrowRight size={16} />
                </Button>
              </div>
              <div className="bg-gray-100 rounded-xl p-6">
                <img
                  src="https://images.unsplash.com/photo-1607706189992-eae578626c86?w=800&q=80"
                  alt="Session Replay"
                  className="rounded-lg shadow-md w-full"
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="effort" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Measure and reduce user effort
                </h3>
                <p className="text-gray-600 mb-6">
                  Identify where users struggle and optimize your product to
                  create frictionless experiences.
                </p>
                <ul className="space-y-3">
                  {[
                    "Effort scoring",
                    "Friction detection",
                    "Comparative analysis",
                    "Improvement recommendations",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle size={20} className="text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-8 gap-2">
                  Learn more <ArrowRight size={16} />
                </Button>
              </div>
              <div className="bg-gray-100 rounded-xl p-6">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                  alt="Effort Analysis"
                  className="rounded-lg shadow-md w-full"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Benefits Section */}
      <section className="bg-blue-50 py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why teams choose Heap
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get insights faster, make better decisions, and create exceptional
              user experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="mb-4 p-3 bg-blue-100 rounded-full w-fit">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Faster time to insight
                </h3>
                <p className="text-gray-600">
                  Automatically capture all user interactions without writing
                  code. Get answers in minutes, not weeks.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="mb-4 p-3 bg-blue-100 rounded-full w-fit">
                  <LineChart className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Data-driven decisions
                </h3>
                <p className="text-gray-600">
                  Make confident product decisions based on real user behavior,
                  not guesswork or opinions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="mb-4 p-3 bg-blue-100 rounded-full w-fit">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Cross-team collaboration
                </h3>
                <p className="text-gray-600">
                  Empower everyone on your team with self-serve access to user
                  insights and session recordings.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to understand your users?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of companies using Heap to build better products and
            experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8">
              Get started free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-blue-700 gap-2"
            >
              <Play size={16} />
              Watch demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <Link to="/" className="flex items-center mb-6">
                <span className="text-2xl font-bold text-white">heap</span>
              </Link>
              <p className="mb-6">
                Automatically capture every user interaction with your digital
                experience to help you build products your customers love.
              </p>
              <div className="flex gap-4">
                {["twitter", "linkedin", "facebook", "github"].map((social) => (
                  <a
                    key={social}
                    href={`#${social}`}
                    className="hover:text-white"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center">
                      #
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-3">
                {[
                  "Product Analytics",
                  "Session Replay",
                  "Effort Analysis",
                  "Integrations",
                  "Pricing",
                ].map((item) => (
                  <li key={item}>
                    <Link to="#" className="hover:text-white">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-3">
                {[
                  "Documentation",
                  "Blog",
                  "Guides",
                  "Case Studies",
                  "Webinars",
                ].map((item) => (
                  <li key={item}>
                    <Link to="#" className="hover:text-white">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                {["About Us", "Careers", "Contact", "Press", "Legal"].map(
                  (item) => (
                    <li key={item}>
                      <Link to="#" className="hover:text-white">
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Heap Inc. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link to="#" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link to="#" className="hover:text-white">
                Terms of Service
              </Link>
              <Link to="#" className="hover:text-white">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
