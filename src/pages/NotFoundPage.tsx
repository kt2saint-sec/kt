import { Link } from 'react-router-dom';
import NeonSign from '@/components/ui/NeonSign';
import NeonButton from '@/components/ui/NeonButton';
import BearMascot from '@/components/ui/BearMascot';
import FloatingParticles from '@/components/ui/FloatingParticles';
import notFoundBg from '@/assets/illustrations/404-scene.webp';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center relative overflow-hidden">
      {/* Background illustration */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <img
          src={notFoundBg}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-bg-dark/50" />
      </div>

      <FloatingParticles count={10} color="var(--neon-red)" />

      <div className="text-center px-4 relative z-10">
        <NeonSign text="404" color="red" size="hero" as="h1" className="mb-4" />
        <p className="font-display text-xl uppercase tracking-widest text-text-muted mb-2">
          Lost in the City
        </p>
        <p className="text-text-muted mb-8 max-w-md mx-auto">
          This alley doesn't lead anywhere. Let's get you back to the main street.
        </p>

        <BearMascot pose="wave" size="lg" className="mx-auto mb-8" />

        <Link to="/">
          <NeonButton variant="cyan" size="lg">
            Back to Home
          </NeonButton>
        </Link>
      </div>
    </div>
  );
}
