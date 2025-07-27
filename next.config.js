/** @type {import('next').NextConfig} */
const nextConfig = {
  // 📦 SERVER EXTERNAL PACKAGES
  serverExternalPackages: ["@prisma/client"],

  experimental: {
    // Next.js 15.4 Production Optimizations
    optimizeCss: true,
    // Disable aggressive optimization that causes webpack issues
    optimizePackageImports: [],
    // Advanced performance features
    typedRoutes: false,
    webVitalsAttribution: ["CLS", "LCP", "FCP", "FID", "TTFB", "INP"],
  },

  // 🚀 PRODUCTION OPTIMIZATIONS
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"], // Keep error and warn logs
    } : false,
  },

  // 🛡️ OPTIMIZED WEBPACK CONFIGURATION
  webpack: (config, { isServer, dev }) => {
    // Essential fixes for stability
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    // Development optimizations
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        poll: false,
        ignored: /node_modules/,
      };
      
      // Fix static chunk loading issues in development
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: -10,
              chunks: 'all',
            },
          },
        },
      };
    }

    // CRITICAL: Must return config
    return config;
  },

  // 🖼️ IMAGE OPTIMIZATION
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Enable compression and optimization
  compress: true,
  poweredByHeader: false,

  // 🔒 SECURITY HEADERS
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  },

  // 🔧 Development server configuration
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [
        // Fallback for missing static resources
        {
          source: '/_next/static/:path*',
          destination: '/api/fallback?resource=:path*',
        },
      ],
    };
  },

  // Environment configuration
  env: {
    NEXT_TELEMETRY_DISABLED: "1",
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // 🔧 ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;
