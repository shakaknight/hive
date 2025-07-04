import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  Send,
  Mic,
  MicOff,
  Download,
  Share,
  Bookmark,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  Users,
  Target,
  Zap,
  MessageSquare,
  Clock,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  insights?: AIInsight[];
  charts?: ChartData[];
  suggestions?: string[];
}

interface AIInsight {
  id: string;
  type: "trend" | "anomaly" | "opportunity" | "warning";
  title: string;
  description: string;
  confidence: number;
  impact: "high" | "medium" | "low";
  actionable: boolean;
}

interface ChartData {
  id: string;
  type: "line" | "bar" | "pie";
  title: string;
  data: any[];
}

interface AIAnalystProps {
  onSendMessage?: (message: string) => void;
  onSaveInsight?: (insight: AIInsight) => void;
  onExportAnalysis?: () => void;
}

const AIAnalyst: React.FC<AIAnalystProps> = ({
  onSendMessage = () => {},
  onSaveInsight = () => {},
  onExportAnalysis = () => {},
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm your AI Analytics Assistant. I can help you analyze your data, identify trends, and provide actionable insights. What would you like to explore today?",
      timestamp: new Date(Date.now() - 300000),
      suggestions: [
        "Show me conversion funnel analysis",
        "What are the top user engagement patterns?",
        "Identify any anomalies in recent data",
        "Compare this month vs last month performance",
      ],
    },
    {
      id: "2",
      type: "user",
      content: "Show me conversion funnel analysis",
      timestamp: new Date(Date.now() - 240000),
    },
    {
      id: "3",
      type: "ai",
      content:
        "I've analyzed your conversion funnel for the past 30 days. Here are the key insights:",
      timestamp: new Date(Date.now() - 180000),
      insights: [
        {
          id: "i1",
          type: "opportunity",
          title: "Cart Abandonment Optimization",
          description:
            "32% of users abandon their cart at the payment step. Implementing guest checkout could increase conversions by 15-20%.",
          confidence: 87,
          impact: "high",
          actionable: true,
        },
        {
          id: "i2",
          type: "trend",
          title: "Mobile Conversion Growth",
          description:
            "Mobile conversions increased 23% this month, now representing 45% of total conversions.",
          confidence: 95,
          impact: "medium",
          actionable: false,
        },
        {
          id: "i3",
          type: "warning",
          title: "Signup Form Drop-off",
          description:
            "25% drop-off rate at the signup form. Consider reducing form fields or implementing social login.",
          confidence: 78,
          impact: "medium",
          actionable: true,
        },
      ],
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);
    onSendMessage(inputMessage);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: generateAIResponse(inputMessage),
        timestamp: new Date(),
        insights: generateInsights(inputMessage),
        suggestions: generateSuggestions(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (input: string): string => {
    const responses = {
      engagement:
        "Based on your user engagement data, I've identified several key patterns and opportunities for improvement.",
      conversion:
        "Your conversion analysis reveals interesting trends and potential optimization areas.",
      retention:
        "User retention metrics show both positive trends and areas that need attention.",
      default:
        "I've analyzed the relevant data and found some interesting insights for you.",
    };

    const key = Object.keys(responses).find((k) =>
      input.toLowerCase().includes(k),
    ) as keyof typeof responses;
    return responses[key] || responses.default;
  };

  const generateInsights = (input: string): AIInsight[] => {
    const insightTemplates = [
      {
        type: "trend" as const,
        title: "User Engagement Spike",
        description:
          "User engagement increased 34% in the last week, primarily driven by mobile users.",
        confidence: 92,
        impact: "high" as const,
        actionable: false,
      },
      {
        type: "opportunity" as const,
        title: "Feature Adoption Gap",
        description:
          "Only 23% of users have tried the new dashboard feature. Consider in-app tutorials.",
        confidence: 85,
        impact: "medium" as const,
        actionable: true,
      },
      {
        type: "anomaly" as const,
        title: "Unusual Traffic Pattern",
        description:
          "Traffic from organic search dropped 15% yesterday. Monitor for potential SEO issues.",
        confidence: 76,
        impact: "medium" as const,
        actionable: true,
      },
    ];

    return insightTemplates
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)
      .map((template, index) => ({
        ...template,
        id: `insight-${Date.now()}-${index}`,
      }));
  };

  const generateSuggestions = (): string[] => {
    const suggestions = [
      "Analyze user behavior by device type",
      "Show me cohort retention analysis",
      "What's driving the recent traffic increase?",
      "Compare performance across different channels",
      "Identify users at risk of churning",
      "Show seasonal trends in user activity",
    ];
    return suggestions.sort(() => 0.5 - Math.random()).slice(0, 3);
  };

  const getInsightIcon = (type: AIInsight["type"]) => {
    switch (type) {
      case "trend":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "anomaly":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "opportunity":
        return <Lightbulb className="h-4 w-4 text-yellow-600" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      default:
        return <BarChart3 className="h-4 w-4 text-blue-600" />;
    }
  };

  const getInsightColor = (type: AIInsight["type"]) => {
    switch (type) {
      case "trend":
        return "bg-green-50 border-green-200";
      case "anomaly":
        return "bg-red-50 border-red-200";
      case "opportunity":
        return "bg-yellow-50 border-yellow-200";
      case "warning":
        return "bg-orange-50 border-orange-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  const getImpactColor = (impact: AIInsight["impact"]) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Brain className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">AI Analyst</h2>
            <p className="text-sm text-gray-600">
              Your intelligent analytics assistant
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onExportAnalysis}>
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-3xl ${message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100"} rounded-lg p-4`}
              >
                <div className="flex items-start gap-3">
                  {message.type === "ai" && (
                    <div className="p-1 bg-blue-100 rounded-full">
                      <Brain className="h-4 w-4 text-blue-600" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm">{message.content}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs opacity-70">
                      <Clock className="h-3 w-3" />
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>

                {/* AI Insights */}
                {message.insights && message.insights.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {message.insights.map((insight) => (
                      <div
                        key={insight.id}
                        className={`p-3 rounded-lg border ${getInsightColor(insight.type)}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-2">
                            {getInsightIcon(insight.type)}
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">
                                {insight.title}
                              </h4>
                              <p className="text-xs text-gray-600 mt-1">
                                {insight.description}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge
                                  className={getImpactColor(insight.impact)}
                                >
                                  {insight.impact} impact
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  {insight.confidence}% confidence
                                </span>
                                {insight.actionable && (
                                  <Badge variant="outline">
                                    <Zap className="h-3 w-3 mr-1" />
                                    Actionable
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onSaveInsight(insight)}
                          >
                            <Bookmark className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggestions */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs text-gray-600 mb-2">
                      Try asking about:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          size="sm"
                          variant="outline"
                          className="text-xs"
                          onClick={() => setInputMessage(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-blue-600" />
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
                <span className="text-sm text-gray-600">AI is thinking...</span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Input
              placeholder="Ask me anything about your analytics data..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="pr-12"
            />
            <Button
              size="sm"
              variant="ghost"
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
              onClick={() => setIsListening(!isListening)}
            >
              {isListening ? (
                <MicOff className="h-4 w-4 text-red-500" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-3">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setInputMessage("Show me today's key metrics")}
          >
            <BarChart3 className="h-4 w-4 mr-1" />
            Key Metrics
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setInputMessage("Analyze user behavior trends")}
          >
            <Users className="h-4 w-4 mr-1" />
            User Behavior
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setInputMessage("Find conversion opportunities")}
          >
            <Target className="h-4 w-4 mr-1" />
            Opportunities
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setInputMessage("Detect any anomalies")}
          >
            <AlertTriangle className="h-4 w-4 mr-1" />
            Anomalies
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAnalyst;
