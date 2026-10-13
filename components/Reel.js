'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import { asset } from '@/lib/base';

// Measured off the assembled cut, not estimated from the segment list — the
// encoder rounds each segment up to a whole frame and the drift is visible by
// the back half.
const CHAPTERS = [
  ['Opening', 0],
  ['Performance ads', 2.6],
  ['Short-form', 37.6],
  ['Contact', 54.7],
];

const RUNTIME = 60.7;

function clock(t) {
  if (!Number.isFinite(t) || t < 0) t = 0;
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

function IconPlay({ paused }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {paused ? <path d="M7 4.5v15l13-7.5z" /> : <path d="M7 4.5h4.1v15H7zM12.9 4.5H17v15h-4.1z" />}
    </svg>
  );
}

function IconJump({ back }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {back ? (
        <>
          <path d="M12 3.6A8.4 8.4 0 1 0 20.4 12" />
          <path d="M12 3.6 15.3 6.3 12 9" />
        </>
      ) : (
        <>
          <path d="M12 3.6A8.4 8.4 0 1 1 3.6 12" />
          <path d="M12 3.6 8.7 6.3 12 9" />
        </>
      )}
    </svg>
  );
}

function IconSound({ muted }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      {muted ? (
        <>
          <line x1="22" y1="9" x2="16" y2="15" />
          <line x1="16" y1="9" x2="22" y2="15" />
        </>
      ) : (
        <>
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M18.4 5.6a9 9 0 0 1 0 12.8" />
        </>
      )}
    </svg>
  );
}

export default function Reel() {
  const vid = useRef(null);
  const track = useRef(null);
  const scrubbing = useRef(false);
  const userPaused = useRef(false);

  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [now, setNow] = useState(0);
  const [dur, setDur] = useState(RUNTIME);

  const pct = dur ? (now / dur) * 100 : 0;

  const togglePlay = useCallback(() => {
    const v = vid.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  }, []);

  const toggleSound = useCallback(() => {
    const v = vid.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && v.paused) v.play().catch(() => {});
  }, []);

  const seek = useCallback((t) => {
    const v = vid.current;
    if (!v || !Number.isFinite(v.duration)) return;
    const clamped = Math.min(Math.max(t, 0), v.duration - 0.05);
    v.currentTime = clamped;
    setNow(clamped);
  }, []);

  const skip = useCallback(
    (d) => {
      const v = vid.current;
      if (v) seek(v.currentTime + d);
    },
    [seek]
  );

  // The <video> carries no native controls, so the progress line is the scrub
  // track: press anywhere on it to jump, drag to scrub.
  const seekToX = useCallback(
    (clientX) => {
      const v = vid.current;
      const el = track.current;
      if (!v || !el || !Number.isFinite(v.duration)) return;
      const r = el.getBoundingClientRect();
      const ratio = Math.min(Math.max((clientX - r.left) / r.width, 0), 1);
      seek(ratio * v.duration);
    },
    [seek]
  );

  const onDown = useCallback(
    (e) => {
      scrubbing.current = true;
      seekToX(e.clientX);
      // setPointerCapture throws when the id is not an active pointer, and a
      // failed capture must not cost us the seek itself.
      try {
        track.current?.setPointerCapture?.(e.pointerId);
      } catch {}
    },
    [seekToX]
  );

  const onMove = useCallback(
    (e) => {
      if (scrubbing.current) seekToX(e.clientX);
    },
    [seekToX]
  );

  const onUp = useCallback((e) => {
    scrubbing.current = false;
    try {
      track.current?.releasePointerCapture?.(e.pointerId);
    } catch {}
  }, []);

  const onTrackKey = useCallback(
    (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        skip(5);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        skip(-5);
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        togglePlay();
      }
    },
    [skip, togglePlay]
  );

  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    const onTime = () => {
      if (!scrubbing.current) setNow(v.currentTime);
    };
    const onMeta = () => v.duration && setDur(v.duration);
    const onPlay = () => setPaused(false);
    const onPause = () => setPaused(true);
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('loadedmetadata', onMeta);
    v.addEventListener('durationchange', onMeta);
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    onMeta();
    return () => {
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('loadedmetadata', onMeta);
      v.removeEventListener('durationchange', onMeta);
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
    };
  }, []);

  // Mobile browsers routinely refuse the opening autoplay even when muted, and
  // every browser pauses media in a backgrounded tab. Nudge it back, but never
  // over a deliberate pause.
  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    const kick = () => {
      if (v.paused && !userPaused.current) v.play().catch(() => {});
    };
    kick();
    v.addEventListener('loadeddata', kick);
    const opts = { passive: true };
    const evts = ['pointerdown', 'touchstart', 'keydown', 'scroll'];
    evts.forEach((e) => window.addEventListener(e, kick, opts));
    document.addEventListener('visibilitychange', kick);
    return () => {
      v.removeEventListener('loadeddata', kick);
      evts.forEach((e) => window.removeEventListener(e, kick, opts));
      document.removeEventListener('visibilitychange', kick);
    };
  }, []);

  const active = CHAPTERS.reduce((acc, c, i) => (now >= c[1] ? i : acc), 0);

  return (
    <section className="section" id="reel">
      <div className="wrap">
        <div className="section-head">
          <Reveal>
            <span className="label">Showreel 2026</span>
            <h2>One minute of it</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="lede">
              Performance ads for fintech and small-business apps, then the short-form
              work. Sound is on the films themselves — unmute it.
            </p>
          </Reveal>
        </div>

        <Reveal delay={60}>
          <div className="reel-shell">
            <div>
              <div className="reel-stage">
                <video
                  ref={vid}
                  poster={asset('/media/showreel-poster.jpg')}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onClick={togglePlay}
                >
                  <source src={asset('/media/showreel-1600.mp4')} type="video/mp4" media="(min-width: 861px)" />
                  <source src={asset('/media/showreel-1024.mp4')} type="video/mp4" />
                </video>
              </div>

              <div className="transport">
                <button className="icon-btn" onClick={togglePlay} aria-label={paused ? 'Play showreel' : 'Pause showreel'}>
                  <IconPlay paused={paused} />
                </button>
                <button className="icon-btn" onClick={() => skip(-10)} aria-label="Back ten seconds">
                  <IconJump back />
                </button>
                <button className="icon-btn" onClick={() => skip(10)} aria-label="Forward ten seconds">
                  <IconJump />
                </button>
                <button className="icon-btn" onClick={toggleSound} aria-label={muted ? 'Unmute showreel' : 'Mute showreel'}>
                  <IconSound muted={muted} />
                </button>

                <div
                  className="track"
                  ref={track}
                  onPointerDown={onDown}
                  onPointerMove={onMove}
                  onPointerUp={onUp}
                  onPointerCancel={onUp}
                  onKeyDown={onTrackKey}
                  role="slider"
                  tabIndex={0}
                  aria-label="Seek showreel"
                  aria-valuemin={0}
                  aria-valuemax={Math.round(dur)}
                  aria-valuenow={Math.round(now)}
                  aria-valuetext={`${clock(now)} of ${clock(dur)}`}
                >
                  <div className="track-line">
                    <i style={{ width: `${pct}%` }} />
                    {CHAPTERS.slice(1).map(([name, at]) => (
                      <span key={name} className="track-tick" style={{ left: `${(at / dur) * 100}%` }} />
                    ))}
                    <b style={{ left: `${pct}%` }} />
                  </div>
                </div>

                <span className="tc">
                  <b>{clock(now)}</b> / {clock(dur)}
                </span>
              </div>
            </div>

            <div className="reel-side">
              <h3>What you&apos;re watching</h3>
              <p>
                Finished pieces, cut down to the beat each one was hired for. Every frame is
                delivered work — app ads that shipped to Meta and the Play Store, and shorts that
                went out on channels with an audience already waiting.
              </p>
              <div className="reel-chapters">
                {CHAPTERS.map(([name, at], i) => (
                  <button key={name} className={i === active ? 'on' : ''} onClick={() => seek(at + 0.05)}>
                    <b>{name}</b>
                    <i>{clock(at)}</i>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
