// Application constants

export const APP_CONFIG = {
  name: "Heap Analytics",
  version: "1.0.0",
  description: "Digital insights platform for product analytics",
  url: "https://heap-analytics-clone.com",
  supportEmail: "support@heap-analytics-clone.com",
};

export const ROUTES = {
  HOME: "/",
  PRODUCT_ANALYTICS: "/product-analytics",
  SESSION_REPLAY: "/session-replay",
  EFFORT_ANALYSIS: "/effort-analysis",
  DASHBOARD: "/dashboard",
  LOGIN: "/login",
  SIGNUP: "/signup",
  PRODUCT: "/product",
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    SIGNUP: "/api/auth/signup",
    LOGOUT: "/api/auth/logout",
    REFRESH: "/api/auth/refresh",
  },
  ANALYTICS: {
    EVENTS: "/api/analytics/events",
    USERS: "/api/analytics/users",
    SESSIONS: "/api/analytics/sessions",
    FUNNELS: "/api/analytics/funnels",
  },
  USER: {
    PROFILE: "/api/user/profile",
    SETTINGS: "/api/user/settings",
    TEAM: "/api/user/team",
  },
} as const;

export const STORAGE_KEYS = {
  USER: "heap_user",
  AUTH_TOKEN: "heap_auth_token",
  PREFERENCES: "heap_preferences",
  ANALYTICS_SETTINGS: "heap_analytics_settings",
} as const;

export const CHART_COLORS = {
  PRIMARY: "#2563eb",
  SECONDARY: "#4f46e5",
  SUCCESS: "#10b981",
  WARNING: "#f59e0b",
  ERROR: "#ef4444",
  INFO: "#06b6d4",
} as const;

export const DEMO_DATA = {
  USERS: {
    TOTAL: 24532,
    ACTIVE: 1429,
    GROWTH_RATE: 12.5,
  },
  SESSIONS: {
    AVERAGE_DURATION: "2m 45s",
    BOUNCE_RATE: 23.4,
    PAGES_PER_SESSION: 3.2,
  },
  CONVERSION: {
    RATE: 3.6,
    FUNNEL_STEPS: [
      { name: "Landing Page", users: 10000, rate: 100 },
      { name: "Product View", users: 7500, rate: 75 },
      { name: "Add to Cart", users: 3200, rate: 32 },
      { name: "Checkout", users: 1800, rate: 18 },
      { name: "Purchase", users: 1280, rate: 12.8 },
    ],
  },
} as const;
