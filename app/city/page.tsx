import dynamic from 'next/dynamic';

const EpicMusicCity = dynamic(
  () => import('../../components/EpicMusicCity').then((mod) => mod.EpicMusicCity),
  {
    ssr: false,
  },
);

export default function CityPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <EpicMusicCity />

      <section className="absolute left-6 top-6 z-10 max-w-xl">
        <p className="text-xs uppercase tracking-[0.5em] text-cyan-200/80">
          EpicMusicSpace
        </p>

        <h1 className="mt-3 text-5xl font-black tracking-tight">
          THE MUSIC METROPOLIS
        </h1>

        <p className="mt-4 max-w-md text-sm leading-6 text-white/70">
          Explore a futuristic cyber city where every district represents a music genre, creator economy, and live entertainment ecosystem.
        </p>
      </section>
    </main>
  );
}
