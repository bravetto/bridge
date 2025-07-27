'use client';

import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { useConversionOptimizer, generateUserId } from '@/lib/conversion-optimizer';
import { cn } from '@/lib/utils';

export interface ConversionButtonProps extends Omit<ButtonProps, 'variant' | 'size'> {
  testId?: string;
  conversionEvent?: string;
  page?: string;
  urgency?: 'low' | 'medium' | 'high' | 'critical';
  trustLevel?: 'basic' | 'verified' | 'premium';
  missionCritical?: boolean;
}

/**
 * Conversion-optimized button with A/B testing and analytics
 */
export function ConversionButton({
  testId,
  conversionEvent = 'cta_click',
  page,
  urgency = 'medium',
  trustLevel = 'basic',
  missionCritical = false,
  className,
  children,
  onClick,
  ...props
}: ConversionButtonProps) {
  const { getVariant, trackEvent } = useConversionOptimizer();
  const userId = generateUserId();
  
  // Get A/B test variant if testId provided
  const variant = testId ? getVariant(testId, userId) : null;
  
  // Determine button configuration
  const config = variant?.config || {};
  const buttonText = config.ctaText || children;
  const buttonVariant = getButtonVariant(config.ctaColor, urgency, missionCritical);
  const buttonSize = (config.ctaSize as ButtonProps['size']) || getSizeForUrgency(urgency);
  
  // Handle click with conversion tracking
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Track conversion event
    if (testId && variant) {
      trackEvent({
        userId,
        testId,
        variantId: variant.id,
        eventType: conversionEvent as any,
        page: page || window.location.pathname,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        properties: {
          urgency,
          trustLevel,
          missionCritical,
          buttonText: buttonText?.toString()
        }
      });
    }
    
    // Call original onClick
    onClick?.(event);
  };
  
  // Additional styling based on urgency and mission criticality
  const urgencyClasses = getUrgencyClasses(urgency, missionCritical);
  const trustClasses = getTrustClasses(trustLevel);
  
  return (
    <Button
      variant={buttonVariant}
      size={buttonSize}
      className={cn(
        urgencyClasses,
        trustClasses,
        missionCritical && 'conversion-critical',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {buttonText}
    </Button>
  );
}

/**
 * Get button variant based on configuration and urgency
 */
function getButtonVariant(
  configColor?: string,
  urgency?: string,
  missionCritical?: boolean
): ButtonProps['variant'] {
  if (configColor === 'accent' || urgency === 'critical' || missionCritical) {
    return 'default'; // Hope gold for high urgency
  }
  
  if (configColor === 'primary') {
    return 'primary'; // Courage blue
  }
  
  return 'primary'; // Default to primary
}

/**
 * Get button size based on urgency level
 */
function getSizeForUrgency(urgency: string): ButtonProps['size'] {
  switch (urgency) {
    case 'critical':
      return 'xl';
    case 'high':
      return 'lg';
    case 'medium':
      return 'default';
    case 'low':
      return 'sm';
    default:
      return 'default';
  }
}

/**
 * Get urgency-based CSS classes
 */
function getUrgencyClasses(urgency: string, missionCritical?: boolean): string {
  const classes: string[] = [];
  
  if (urgency === 'critical' || missionCritical) {
    classes.push('pulse-cta', 'shadow-lg');
  } else if (urgency === 'high') {
    classes.push('hover-glow');
  } else if (urgency === 'medium') {
    classes.push('hover-lift');
  }
  
  return classes.join(' ');
}

/**
 * Get trust level CSS classes
 */
function getTrustClasses(trustLevel: string): string {
  switch (trustLevel) {
    case 'premium':
      return 'shadow-xl border-2 border-accent-200';
    case 'verified':
      return 'shadow-md border border-success-300';
    case 'basic':
    default:
      return '';
  }
}

/**
 * Mission-critical CTA for July 28th deadline
 */
export function MissionCriticalCTA({
  children = '🚨 Save JAHmere - July 28th',
  testId = 'mission_critical_cta',
  ...props
}: Omit<ConversionButtonProps, 'urgency' | 'missionCritical'>) {
  return (
    <ConversionButton
      testId={testId}
      urgency="critical"
      missionCritical={true}
      trustLevel="verified"
      conversionEvent="mission_cta_click"
      className="w-full sm:w-auto text-lg font-bold"
      {...props}
    >
      {children}
    </ConversionButton>
  );
}

/**
 * Petition signature CTA
 */
export function PetitionCTA({
  children = 'Sign the Petition',
  testId = 'petition_cta',
  signatureCount,
  ...props
}: Omit<ConversionButtonProps, 'urgency'> & {
  signatureCount?: number;
}) {
  return (
    <div className="space-y-3">
      <ConversionButton
        testId={testId}
        urgency="high"
        trustLevel="verified"
        conversionEvent="petition_cta_click"
        className="w-full text-lg font-semibold"
        {...props}
      >
        {children}
      </ConversionButton>
      
      {signatureCount && (
        <div className="text-center">
          <div className="trust-indicator">
            ✓ {signatureCount.toLocaleString()} signatures and growing
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Social sharing CTA
 */
export function ShareCTA({
  children = 'Share JAHmere\'s Story',
  platform = 'twitter',
  testId = 'share_cta',
  ...props
}: Omit<ConversionButtonProps, 'urgency'> & {
  platform?: 'twitter' | 'facebook' | 'instagram' | 'email';
}) {
  const platformEmojis = {
    twitter: '🐦',
    facebook: '📘',
    instagram: '📸',
    email: '📧'
  };
  
  return (
    <ConversionButton
      testId={testId}
      urgency="medium"
      trustLevel="basic"
      conversionEvent="share_cta_click"
      
      className="w-full sm:w-auto"
      {...props}
    >
      {platformEmojis[platform]} {children}
    </ConversionButton>
  );
}

/**
 * Donation CTA with urgency
 */
export function DonationCTA({
  children = 'Support JAHmere\'s Legal Fund',
  amount,
  testId = 'donation_cta',
  ...props
}: Omit<ConversionButtonProps, 'urgency'> & {
  amount?: number;
}) {
  return (
    <ConversionButton
      testId={testId}
      urgency="high"
      trustLevel="premium"
      conversionEvent="donation_cta_click"
      className="w-full text-lg font-semibold"
      {...props}
    >
      {amount ? `Donate $${amount}` : children}
    </ConversionButton>
  );
} 