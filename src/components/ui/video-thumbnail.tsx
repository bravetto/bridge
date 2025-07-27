import React from 'react';
import { motion } from 'framer-motion';

interface VideoThumbnailProps {
  onClick: () => void;
  title: string;
  description?: string;
  duration?: string;
  className?: string;
}

export default function VideoThumbnail({ 
  onClick, 
  title, 
  description,
  duration = "5:32",
  className = "" 
}: VideoThumbnailProps) {
  return (
    <motion.div
      className={`relative group cursor-pointer rounded-xl overflow-hidden bg-gradient-to-br from-purple-900 to-purple-700 ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
    >
      {/* Background Image/Gradient */}
      <div className="aspect-video relative overflow-hidden">
        {/* Tony Dungy family meeting image */}
        <img
          src="/images/family/tony-dungy-meeting-optimized-topaz-denoise-sharpen-face-upscale-3x.webp"
          alt="Tony Dungy meeting with JAHmere and Jordan"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30"></div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl group-hover:bg-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg 
              className="w-8 h-8 text-purple-600 ml-1" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z"/>
            </svg>
          </motion.div>
        </div>

        {/* Duration Badge */}
        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {duration}
        </div>

        {/* Live Indicator */}
        <div className="absolute top-3 left-3 flex items-center gap-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          FEATURED
        </div>
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-purple-200 transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-white/80 text-sm leading-relaxed">
            {description}
          </p>
        )}
        
        {/* Call to action */}
        <div className="mt-3 flex items-center gap-2 text-purple-200 text-sm font-medium">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
          Watch Coach Dungy's Message
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-400/50 rounded-xl transition-colors pointer-events-none"></div>
      
      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
    </motion.div>
  );
} 