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
  BookOpen,
  Code,
  Zap,
  Settings,
  Plus,
  Check,
  AlertCircle,
  ExternalLink,
  Copy,
  Play,
  Download,
  FileText,
  Video,
  Globe,
  Smartphone,
  Monitor,
} from "lucide-react";
import { motion } from "framer-motion";

interface Guide {
  id: string;
  title: string;
  description: string;
  category: "setup" | "integration" | "advanced" | "troubleshooting";
  platform: "web" | "mobile" | "server" | "all";
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  steps: GuideStep[];
  codeSnippets?: CodeSnippet[];
  isCompleted?: boolean;
}

interface GuideStep {
  id: string;
  title: string;
  description: string;
  code?: string;
  image?: string;
  isCompleted?: boolean;
}

interface CodeSnippet {
  id: string;
  language: string;
  title: string;
  code: string;
  description: string;
}

interface GuidesIntegrationsProps {
  guides?: Guide[];
  onCompleteStep?: (guideId: string, stepId: string) => void;
  onCompleteGuide?: (guideId: string) => void;
}

const GuidesIntegrations: React.FC<GuidesIntegrationsProps> = ({
  guides = [
    {
      id: "1",
      title: "Quick Start Integration",
      description: "Get up and running with Heap in under 10 minutes",
      category: "setup",
      platform: "web",
      difficulty: "beginner",
      estimatedTime: "10 minutes",
      steps: [
        {
          id: "1-1",
          title: "Install the Heap SDK",
          description: "Add the Heap tracking code to your website",
          code: `<script type="text/javascript">
  window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
  heap.load("YOUR_APP_ID");
</script>`,
        },
        {
          id: "1-2",
          title: "Verify Installation",
          description: "Check that Heap is properly tracking events",
          code: `// Open browser console and run:
heap.track('Test Event', { source: 'integration_guide' });`,
        },
        {
          id: "1-3",
          title: "Set Up User Identification",
          description: "Identify users to track their journey",
          code: `heap.identify('user@example.com');
heap.addUserProperties({
  name: 'John Doe',
  plan: 'premium',
  signupDate: new Date().toISOString()
});`,
        },
      ],
      codeSnippets: [
        {
          id: "js-1",
          language: "javascript",
          title: "Basic Event Tracking",
          code: `heap.track('Button Clicked', {
  buttonText: 'Sign Up',
  page: 'homepage',
  userId: user.id
});`,
          description: "Track custom events with properties",
        },
      ],
    },
    {
      id: "2",
      title: "React Integration",
      description: "Integrate Heap with your React application",
      category: "integration",
      platform: "web",
      difficulty: "intermediate",
      estimatedTime: "20 minutes",
      steps: [
        {
          id: "2-1",
          title: "Install React SDK",
          description: "Install the official Heap React package",
          code: `npm install @heap/react-heap
# or
yarn add @heap/react-heap`,
        },
        {
          id: "2-2",
          title: "Initialize Heap Provider",
          description: "Wrap your app with the Heap provider",
          code: `import { HeapProvider } from '@heap/react-heap';

function App() {
  return (
    <HeapProvider appId="YOUR_APP_ID">
      <YourAppComponents />
    </HeapProvider>
  );
}`,
        },
        {
          id: "2-3",
          title: "Use Heap Hooks",
          description: "Track events using React hooks",
          code: `import { useHeap } from '@heap/react-heap';

function MyComponent() {
  const heap = useHeap();
  
  const handleClick = () => {
    heap.track('Component Clicked', {
      component: 'MyComponent',
      timestamp: Date.now()
    });
  };
  
  return <button onClick={handleClick}>Click me</button>;
}`,
        },
      ],
    },
    {
      id: "3",
      title: "Mobile SDK Setup",
      description: "Integrate Heap with iOS and Android applications",
      category: "integration",
      platform: "mobile",
      difficulty: "intermediate",
      estimatedTime: "30 minutes",
      steps: [
        {
          id: "3-1",
          title: "iOS Integration",
          description: "Add Heap to your iOS project",
          code: `// Add to your Podfile
pod 'Heap'

// In AppDelegate.swift
import Heap

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    Heap.initialize("YOUR_APP_ID")
    return true
}`,
        },
        {
          id: "3-2",
          title: "Android Integration",
          description: "Add Heap to your Android project",
          code: `// Add to build.gradle (app level)
implementation 'com.heapanalytics.android:heap-android-core:2.+'

// In Application class
import com.heapanalytics.android.Heap;

public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Heap.init(getApplicationContext(), "YOUR_APP_ID");
    }
}`,
        },
      ],
    },
    {
      id: "4",
      title: "Server-Side Tracking",
      description: "Implement server-side event tracking",
      category: "advanced",
      platform: "server",
      difficulty: "advanced",
      estimatedTime: "45 minutes",
      steps: [
        {
          id: "4-1",
          title: "Install Server SDK",
          description: "Install the Heap server-side SDK",
          code: `npm install heap-api
# or
pip install heapanalytics`,
        },
        {
          id: "4-2",
          title: "Initialize Client",
          description: "Set up the server-side client",
          code: `const Heap = require('heap-api');

const heap = new Heap({
  appId: 'YOUR_APP_ID',
  apiKey: 'YOUR_API_KEY'
});

// Track server-side events
heap.track({
  identity: 'user@example.com',
  event: 'Server Action',
  properties: {
    action: 'data_export',
    timestamp: new Date().toISOString()
  }
});`,
        },
      ],
    },
  ],
  onCompleteStep = () => {},
  onCompleteGuide = () => {},
}) => {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const getDifficultyColor = (difficulty: Guide["difficulty"]) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPlatformIcon = (platform: Guide["platform"]) => {
    switch (platform) {
      case "web":
        return <Globe className="h-4 w-4" />;
      case "mobile":
        return <Smartphone className="h-4 w-4" />;
      case "server":
        return <Monitor className="h-4 w-4" />;
      default:
        return <Code className="h-4 w-4" />;
    }
  };

  const filteredGuides = guides.filter((guide) => {
    if (activeTab === "all") return true;
    if (activeTab === "completed") return guide.isCompleted;
    return guide.category === activeTab || guide.platform === activeTab;
  });

  const renderGuideCard = (guide: Guide) => (
    <motion.div
      key={guide.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
        onClick={() => setSelectedGuide(guide.id)}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                {getPlatformIcon(guide.platform)}
              </div>
              <div>
                <CardTitle className="text-lg">{guide.title}</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  {guide.description}
                </p>
              </div>
            </div>
            {guide.isCompleted && <Check className="h-5 w-5 text-green-500" />}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Badge className={getDifficultyColor(guide.difficulty)}>
                {guide.difficulty}
              </Badge>
              <Badge variant="outline">{guide.platform}</Badge>
            </div>
            <span className="text-sm text-gray-600">{guide.estimatedTime}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {guide.steps.length} steps
            </div>
            <Button size="sm">
              <Play className="h-4 w-4 mr-1" />
              Start Guide
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderGuideDetail = (guide: Guide) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => setSelectedGuide(null)}>
          ← Back to Guides
        </Button>
        <div className="flex items-center gap-2">
          <Badge className={getDifficultyColor(guide.difficulty)}>
            {guide.difficulty}
          </Badge>
          <Badge variant="outline">{guide.estimatedTime}</Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {getPlatformIcon(guide.platform)}
            {guide.title}
          </CardTitle>
          <p className="text-gray-600">{guide.description}</p>
        </CardHeader>
      </Card>

      {/* Steps */}
      <div className="space-y-4">
        {guide.steps.map((step, index) => (
          <Card
            key={step.id}
            className={step.isCompleted ? "bg-green-50 border-green-200" : ""}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {step.isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </div>
              <p className="text-gray-600 ml-11">{step.description}</p>
            </CardHeader>
            {step.code && (
              <CardContent className="ml-11">
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{step.code}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(step.code!, step.id)}
                  >
                    {copiedCode === step.id ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <Button
                  className="mt-3"
                  size="sm"
                  onClick={() => onCompleteStep(guide.id, step.id)}
                  disabled={step.isCompleted}
                >
                  {step.isCompleted ? "Completed" : "Mark as Complete"}
                </Button>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Code Snippets */}
      {guide.codeSnippets && guide.codeSnippets.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Code Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {guide.codeSnippets.map((snippet) => (
              <div key={snippet.id}>
                <h4 className="font-medium mb-2">{snippet.title}</h4>
                <p className="text-sm text-gray-600 mb-2">
                  {snippet.description}
                </p>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{snippet.code}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(snippet.code, snippet.id)}
                  >
                    {copiedCode === snippet.id ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );

  if (selectedGuide) {
    const guide = guides.find((g) => g.id === selectedGuide);
    if (guide) {
      return (
        <div className="w-full space-y-6 bg-white">
          {renderGuideDetail(guide)}
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
            Integration Guides
          </h2>
          <p className="text-gray-600">
            Step-by-step guides to integrate Heap with your applications
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download SDK
          </Button>
          <Button variant="outline">
            <ExternalLink className="h-4 w-4 mr-2" />
            API Docs
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Guides
                </p>
                <p className="text-2xl font-bold">{guides.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {guides.filter((g) => g.isCompleted).length}
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
                <p className="text-sm font-medium text-gray-600">Platforms</p>
                <p className="text-2xl font-bold">
                  {new Set(guides.map((g) => g.platform)).size}
                </p>
              </div>
              <Code className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Time</p>
                <p className="text-2xl font-bold">25m</p>
              </div>
              <Play className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Guides */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Guides</TabsTrigger>
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="integration">Integration</TabsTrigger>
          <TabsTrigger value="web">Web</TabsTrigger>
          <TabsTrigger value="mobile">Mobile</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map(renderGuideCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GuidesIntegrations;
