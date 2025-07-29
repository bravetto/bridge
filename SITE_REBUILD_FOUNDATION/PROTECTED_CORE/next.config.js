/** @type {import('next').NextConfig} */

/**
 * 🏆 CHAMPIONSHIP NEXT.JS CONFIGURATION
 * Optimized for <10s builds, maximum performance, and zero-downtime deployments
 * JAHmere Webb Freedom Portal - July 28th Mission Critical
 */

const nextConfig = {
  // Performance Optimizations
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  experimental: {
    // Enable optimized package imports
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
    ],

    // Enable PPR (Partial Prerendering) for better performance
    ppr: false, // Disabled for stability
  },

  // External packages for server components
  serverExternalPackages: ['sharp'],

  // Build Optimizations
  compiler: {
    // Remove console.logs in production
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'],
          }
        : false,

    // Enable SWC minification for faster builds
    styledComponents: false, // We use Tailwind
  },

  // Image Optimization
  images: {
    // Optimize for championship performance
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // External image optimization (updated to remotePatterns)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'july28freedom.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],

    // Enable static imports for better performance
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Bundle Analysis & Optimization
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Production optimizations
    if (!dev && !isServer) {
      // Split chunks for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,

          // Framework chunk (React, Next.js)
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },

          // UI Libraries chunk
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name: 'lib',
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
            chunks: 'all',
          },

          // Commons chunk
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
            reuseExistingChunk: true,
            chunks: 'all',
          },
        },
      }
    }

    // Bundle analyzer (development only)
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: 'bundle-analysis.html',
        }),
      )
    }

    // SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },

  // Output Configuration
  output: 'standalone',
  distDir: '.next',

  // Static Generation Optimization
  trailingSlash: false,

  // Security Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Redirects for SEO and UX
  async redirects() {
    return [
      // Redirect old routes to new structure
      {
        source: '/divine-letter-form',
        destination: '/letter-submission-form',
        permanent: true,
      },
      {
        source: '/divine-impact-dashboard',
        destination: '/impact-dashboard',
        permanent: true,
      },
      // Archive redirects
      {
        source: '/bias-test',
        destination: '/biasagent',
        permanent: false,
      },
    ]
  },

  // Environment Variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY || '',
    BUILD_TIME: new Date().toISOString(),
    BUILD_ID: process.env.VERCEL_GIT_COMMIT_SHA || 'local',
    JULY_28_COUNTDOWN: Math.ceil(
      (new Date('2025-07-28').getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    ).toString(),
  },

  // TypeScript Configuration
  typescript: {
    // Type checking happens in CI/CD pipeline
    ignoreBuildErrors: false,
  },

  // ESLint Configuration
  eslint: {
    // Linting happens in CI/CD pipeline
    ignoreDuringBuilds: false,
  },

  // PoweredByHeader
  poweredByHeader: false,

  // Compression
  compress: true,

  // Development Configuration
  ...(process.env.NODE_ENV === 'development' && {
    // Development-specific optimizations
    onDemandEntries: {
      // Period (in ms) where the server will keep pages in the buffer
      maxInactiveAge: 25 * 1000,
      // Number of pages that should be kept simultaneously without being disposed
      pagesBufferLength: 2,
    },
  }),

  // Production Configuration
  ...(process.env.NODE_ENV === 'production' && {
    // Generate build ID for cache busting
    generateBuildId: async () => {
      return process.env.VERCEL_GIT_COMMIT_SHA || process.env.BUILD_ID || `build-${Date.now()}`
    },
  }),
}

// Championship Performance Logging
if (process.env.NODE_ENV === 'production') {
  console.log('🏆 Championship build configuration loaded')
  console.log(`📅 July 28th countdown: ${nextConfig.env.JULY_28_COUNTDOWN} days`)
  console.log(`🚀 Build ID: ${nextConfig.env.BUILD_ID}`)
}

module.exports = nextConfig
