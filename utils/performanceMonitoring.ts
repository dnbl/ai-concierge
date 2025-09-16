import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private listeners: ((metric: PerformanceMetric) => void)[] = [];

  constructor() {
    this.initializeWebVitals();
  }

  private initializeWebVitals() {
    // Cumulative Layout Shift (CLS)
    onCLS((metric: any) => {
      this.addMetric({
        name: 'CLS',
        value: metric.value,
        rating: metric.rating,
        timestamp: Date.now(),
      });
    });

    // Interaction to Next Paint (INP) - replaces FID
    onINP((metric: any) => {
      this.addMetric({
        name: 'INP',
        value: metric.value,
        rating: metric.rating,
        timestamp: Date.now(),
      });
    });

    // First Contentful Paint (FCP)
    onFCP((metric: any) => {
      this.addMetric({
        name: 'FCP',
        value: metric.value,
        rating: metric.rating,
        timestamp: Date.now(),
      });
    });

    // Largest Contentful Paint (LCP)
    onLCP((metric: any) => {
      this.addMetric({
        name: 'LCP',
        value: metric.value,
        rating: metric.rating,
        timestamp: Date.now(),
      });
    });

    // Time to First Byte (TTFB)
    onTTFB((metric: any) => {
      this.addMetric({
        name: 'TTFB',
        value: metric.value,
        rating: metric.rating,
        timestamp: Date.now(),
      });
    });
  }

  private addMetric(metric: PerformanceMetric) {
    this.metrics.push(metric);
    
    // Log in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`);
      
      // Show warning for poor performance
      if (metric.rating === 'poor') {
        console.warn(`[Performance Warning] ${metric.name} is performing poorly: ${metric.value.toFixed(2)}`);
      }
    }

    // Notify listeners
    this.listeners.forEach(listener => listener(metric));
  }

  public getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  public getMetricsByName(name: string): PerformanceMetric[] {
    return this.metrics.filter(metric => metric.name === name);
  }

  public getLatestMetric(name: string): PerformanceMetric | undefined {
    const metrics = this.getMetricsByName(name);
    return metrics[metrics.length - 1];
  }

  public onMetric(listener: (metric: PerformanceMetric) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  public getPerformanceReport(): {
    summary: Record<string, { value: number; rating: string }>;
    recommendations: string[];
  } {
    const summary: Record<string, { value: number; rating: string }> = {};
    const recommendations: string[] = [];

    ['CLS', 'INP', 'FCP', 'LCP', 'TTFB'].forEach(name => {
      const latest = this.getLatestMetric(name);
      if (latest) {
        summary[name] = {
          value: latest.value,
          rating: latest.rating,
        };

        // Add recommendations for poor metrics
        if (latest.rating === 'poor') {
          switch (name) {
            case 'CLS':
              recommendations.push('Cumulative Layout Shift is high. Consider fixing layout shifts by sizing images and ads properly.');
              break;
            case 'INP':
              recommendations.push('Interaction to Next Paint is high. Consider reducing JavaScript execution time and optimizing event handlers.');
              break;
            case 'FCP':
              recommendations.push('First Contentful Paint is slow. Consider optimizing images and reducing server response time.');
              break;
            case 'LCP':
              recommendations.push('Largest Contentful Paint is slow. Consider optimizing your largest elements and critical resources.');
              break;
            case 'TTFB':
              recommendations.push('Time to First Byte is slow. Consider optimizing server response time and using a CDN.');
              break;
          }
        }
      }
    });

    return { summary, recommendations };
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

// React hook for performance monitoring
import { useEffect, useState } from 'react';

export const usePerformanceMonitoring = () => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [report, setReport] = useState(performanceMonitor.getPerformanceReport());

  useEffect(() => {
    const unsubscribe = performanceMonitor.onMetric((metric) => {
      setMetrics(performanceMonitor.getMetrics());
      setReport(performanceMonitor.getPerformanceReport());
    });

    // Initial load
    setMetrics(performanceMonitor.getMetrics());

    return unsubscribe;
  }, []);

  return {
    metrics,
    report,
    getMetric: (name: string) => performanceMonitor.getLatestMetric(name),
  };
};