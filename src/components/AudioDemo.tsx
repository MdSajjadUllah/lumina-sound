import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";

const tracks = [
  { name: "Spatial Audio Demo", genre: "Orchestral", duration: "0:32" },
  { name: "Bass Response Test", genre: "Electronic", duration: "0:28" },
  { name: "Voice Clarity Test", genre: "Podcast", duration: "0:24" },
  { name: "ANC Comparison", genre: "Ambient", duration: "0:36" },
];

const AudioDemo = () => {
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setPlaying(false);
            return 0;
          }
          return p + 0.5;
        });
      }, 50);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing]);

  const selectTrack = (i: number) => {
    setCurrent(i);
    setProgress(0);
    setPlaying(true);
  };

  return (
    <section className="section-spacing">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-accent mb-3 font-body">
            Hear the Difference
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold chrome-text">
            Audio Experience
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="neumorphic-box p-5 sm:p-8"
        >
          {/* Waveform visualization */}
          <div className="flex items-end justify-center gap-[2px] sm:gap-1 h-16 sm:h-24 mb-6">
            {[...Array(48)].map((_, i) => {
              const height = playing
                ? 20 + Math.sin(i * 0.5 + progress * 0.1) * 60 + Math.random() * 20
                : 15 + Math.sin(i * 0.3) * 10;
              return (
                <motion.div
                  key={i}
                  className={`w-1 sm:w-1.5 rounded-full ${
                    i / 48 * 100 < progress ? "bg-accent" : "bg-muted"
                  }`}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                />
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="relative h-1 bg-secondary rounded-full mb-6 cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setProgress((e.clientX - rect.left) / rect.width * 100);
            }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-accent"
              style={{ width: `${progress}%` }}
            />
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent neon-glow"
              style={{ left: `${progress}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6">
            <button
              onClick={() => selectTrack(Math.max(0, current - 1))}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
              aria-label="Previous track"
            >
              <SkipBack className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            </button>
            <motion.button
              onClick={() => setPlaying(!playing)}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full btn-accent flex items-center justify-center"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" />
              )}
            </motion.button>
            <button
              onClick={() => selectTrack(Math.min(tracks.length - 1, current + 1))}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
              aria-label="Next track"
            >
              <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Track info */}
          <div className="text-center mb-6">
            <p className="font-heading font-semibold text-sm sm:text-base text-foreground">{tracks[current].name}</p>
            <p className="text-xs text-muted-foreground">{tracks[current].genre} · {tracks[current].duration}</p>
          </div>

          {/* Track list */}
          <div className="space-y-2">
            {tracks.map((track, i) => (
              <button
                key={track.name}
                onClick={() => selectTrack(i)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                  i === current
                    ? "bg-accent/10 border border-accent/20"
                    : "hover:bg-secondary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    i === current ? "bg-accent/20" : "bg-secondary"
                  }`}>
                    {i === current && playing ? (
                      <Volume2 className="w-3.5 h-3.5 text-accent" />
                    ) : (
                      <Play className="w-3 h-3 text-muted-foreground ml-0.5" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="text-xs sm:text-sm font-heading font-medium text-foreground">{track.name}</p>
                    <p className="text-[10px] text-muted-foreground">{track.genre}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{track.duration}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AudioDemo;
