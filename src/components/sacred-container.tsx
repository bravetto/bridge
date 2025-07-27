"use client";

import React from "react";
import { withErrorBoundary } from "@/components/ui/error-boundary";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import type { DivineRole } from "@/lib/design-system";

interface SacredContainerProps {
  role?: DivineRole;
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -50,
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

function SacredContainer({
  role = "lightworker",
  children,
  className,
  title,
  subtitle,
}: SacredContainerProps) {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.8, ease: "easeOut", staggerChildren: 0.1 }}
      className={cn(
        "relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800",
        className,
      )}
    >
      {/* Sacred header */}
      {(title || subtitle) && (
        <motion.div
          variants={childVariants}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="content-center relative z-10 py-12 text-center"
        >
          {title && (
            <motion.h1
              variants={childVariants}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="mb-4 text-4xl font-bold text-white md:text-6xl"
            >
              {title}
            </motion.h1>
          )}
          {subtitle && (
            <motion.p
              variants={childVariants}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="text-xl text-gray-300 md:text-2xl"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      )}

      {/* Sacred content */}
      <motion.div
        variants={childVariants}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        className="relative z-10"
      >
        {children}
      </motion.div>

      {/* Sacred background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
    </motion.section>
  );
}

export default withErrorBoundary(SacredContainer, "SacredContainer");
