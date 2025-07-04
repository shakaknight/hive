// Mock analytics utility for production-ready features

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: Date;
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  private isEnabled: boolean = true;

  constructor() {
    // In production, you would initialize your analytics service here
    // e.g., Google Analytics, Mixpanel, Amplitude, etc.
  }

  track(eventName: string, properties?: Record<string, any>) {
    if (!this.isEnabled) return;

    const event: AnalyticsEvent = {
      name: eventName,
      properties,
      timestamp: new Date(),
    };

    this.events.push(event);

    // In production, send to your analytics service
    console.log("Analytics Event:", event);
  }

  identify(userId: string, traits?: Record<string, any>) {
    if (!this.isEnabled) return;

    console.log("Analytics Identify:", { userId, traits });
  }

  page(pageName: string, properties?: Record<string, any>) {
    if (!this.isEnabled) return;

    this.track("Page View", {
      page: pageName,
      ...properties,
    });
  }

  getEvents() {
    return this.events;
  }

  clearEvents() {
    this.events = [];
  }

  disable() {
    this.isEnabled = false;
  }

  enable() {
    this.isEnabled = true;
  }
}

export const analytics = new Analytics();

// Convenience functions
export const trackEvent = (name: string, properties?: Record<string, any>) => {
  analytics.track(name, properties);
};

export const trackPageView = (
  pageName: string,
  properties?: Record<string, any>,
) => {
  analytics.page(pageName, properties);
};

export const identifyUser = (userId: string, traits?: Record<string, any>) => {
  analytics.identify(userId, traits);
};
