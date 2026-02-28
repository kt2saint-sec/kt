import { cn } from './utils';

import bearWave from '@/assets/illustrations/bear-poses/bear-wave.webp';
import bearPoint from '@/assets/illustrations/bear-poses/bear-point.webp';
import bearSit from '@/assets/illustrations/bear-poses/bear-sit.webp';

type BearPose = 'wave' | 'point' | 'sit';

interface BearMascotProps {
  pose?: BearPose;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
};

const poseImages: Record<BearPose, string> = {
  wave: bearWave,
  point: bearPoint,
  sit: bearSit,
};

const animationMap: Record<BearPose, string> = {
  wave: 'animate-gentle-float',
  point: '',
  sit: '',
};

const altTextMap: Record<BearPose, string> = {
  wave: 'Bear mascot waving',
  point: 'Bear mascot pointing',
  sit: 'Bear mascot sitting',
};

export default function BearMascot({
  pose = 'wave',
  size = 'md',
  animate = true,
  className,
}: BearMascotProps) {
  return (
    <div
      className={cn(
        sizeMap[size],
        animate && animationMap[pose],
        'relative flex items-center justify-center',
        className,
      )}
    >
      <img
        src={poseImages[pose]}
        alt={altTextMap[pose]}
        className="w-full h-full object-contain rounded-lg"
        loading="lazy"
      />
    </div>
  );
}
