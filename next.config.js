/** @type {import('next').NextConfig} */
const nextConfig = {
  // 📦 SERVER EXTERNAL PACKAGES
  serverExternalPackages: ["@prisma/client"],

  // 🚀 TURBOPACK CONFIGURATION (Stable as of Next.js 15.4.2)
  turbopack: process.env.NODE_ENV === 'development' ? {
    // Enable Turbopack for faster development builds
    // Production builds still use webpack for stability
  } : undefined,

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

  // 🛡️ BATTLE-TESTED WEBPACK CONFIGURATION (MIME Issue Fixed)
  webpack: (config, { isServer, dev }) => {
    // Essential fixes for stability
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    // CRITICAL FIX: Completely disable vendor chunk splitting to prevent MIME conflicts
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        poll: false,
        ignored: /node_modules/,
      };
      
      // REMOVED: All custom chunk splitting that was causing CSS/JS MIME conflicts
      // This prevents vendors.css from being created as a JavaScript chunk
      config.optimization = {
        ...config.optimization,
        splitChunks: false, // Disable all chunk splitting in development
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

  // 🔒 ENHANCED MIME TYPE ENFORCEMENT HEADERS
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
      },
      {
        source: '/_next/static/chunks/:path*.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/javascript; charset=utf-8'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/_next/static/css/:path*.css',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/css; charset=utf-8'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      // CRITICAL: Prevent any CSS files from being served as JavaScript
      {
        source: '/_next/static/:path*.css',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/css; charset=utf-8'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
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
