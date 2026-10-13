'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Reveal from './Reveal';
import works from '@/lib/works.json';
import { asset } from '@/lib/base';

// Filter on `tag`: ffreedom app and Boss Wallah are the same client under two
// names, so they share a chip while each card keeps its own billing.
const TAGS = ['All', ...Array.from(new Set(works.map((w) => w.tag)))];

function Card({ work, n, onOpen }) {
  const vid = useRef(null);
  const [playing, setPlaying] = useState(false);

  const enter = () => {
    const v = vid.current;
    if (!v) return;
    v.currentTime = 0;
    const p = v.play();
    if (p) p.then(() => setPlaying(true)).catch(() => {});
    else setPlaying(true);
  };

  const leave = () => {
    setPlaying(false);
    vid.current?.pause();
  };

  return (
    <button
      className={`card ${playing ? 'playing' : ''}`}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onFocus={enter}
      onBlur={leave}
      onClick={() => onOpen(work)}
      aria-label={`Play ${work.brand} — ${work.title}`}
    >
      <div className="card-frame">
        <span className="card-no">{String(n).padStart(2, '0')}</span>
        <img src={asset(`/media/posters/${work.slug}.jpg`)} alt="" loading="lazy" decoding="async" />
        <video ref={vid} src={asset(`/media/previews/${work.slug}.mp4`)} muted loop playsInline preload="none" />
        <span className="card-cue">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M7 4.5v15l13-7.5z" />
          </svg>
        </span>
      </div>
      <div className="card-cap">
        <span className="brand">{work.brand}</span>
        <h3>{work.title}</h3>
        <span className="fmt">{work.fmt}</span>
      </div>
    </button>
  );
}

function Lightbox({ list, index, setIndex, onClose }) {
  const work = list[index];

  const go = useCallback(
    (d) => setIndex((i) => (i + d + list.length) % list.length),
    [list.length, setIndex]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [go, onClose]);

  if (!work || typeof document === 'undefined') return null;

  // Portalled to <body>: the #work section makes its own stacking context,
  // which would otherwise trap the overlay under the sticky masthead.
  return createPortal(
    <div className="lb" onClick={onClose} role="dialog" aria-modal="true" aria-label={work.title}>
      <button className="icon-btn lb-x" onClick={onClose} aria-label="Close">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <div className="lb-box" onClick={(e) => e.stopPropagation()}>
        <div className={`lb-video ar-${(work.ar || '9:16').replace(':', '-')}`}>
          <video
            key={work.slug}
            src={asset(`/media/films/${work.slug}.mp4`)}
            poster={asset(`/media/posters/${work.slug}.jpg`)}
            controls
            autoPlay
            playsInline
          />
        </div>

        <div className="lb-meta">
          <span className="label">{work.brand}</span>
          <h3>{work.title}</h3>
          <p>{work.hook}</p>

          <dl className="lb-facts">
            <div className="lb-fact">
              <dt>Client</dt>
              <dd>{work.brand}</dd>
            </div>
            <div className="lb-fact">
              <dt>Placement</dt>
              <dd>{work.fmt}</dd>
            </div>
            <div className="lb-fact">
              <dt>Role</dt>
              <dd>{work.role || 'Edit · Sound · Grade'}</dd>
            </div>
          </dl>

          <div className="lb-nav">
            <button className="btn" onClick={() => go(-1)}>
              ← Prev
            </button>
            <button className="btn" onClick={() => go(1)}>
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Work() {
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const list = useMemo(
    () => (filter === 'All' ? works : works.filter((w) => w.tag === filter)),
    [filter]
  );

  const openWork = (w) => {
    setIndex(list.findIndex((x) => x.slug === w.slug));
    setOpen(true);
  };

  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="section-head">
          <Reveal>
            <span className="label">Selected work</span>
            <h2>Films that shipped</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="lede">
              Delivered masters, not raw footage. Hover a frame to see it move, click to watch it
              whole.
            </p>
          </Reveal>
        </div>

        <Reveal delay={50}>
          <div className="filters">
            {TAGS.map((t) => (
              <button key={t} className={`filter ${filter === t ? 'on' : ''}`} onClick={() => setFilter(t)}>
                {t}
                <sup>{t === 'All' ? works.length : works.filter((w) => w.tag === t).length}</sup>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid">
          {list.map((w, i) => (
            <Reveal key={w.slug} delay={Math.min(i, 7) * 50}>
              <Card work={w} n={i + 1} onOpen={openWork} />
            </Reveal>
          ))}
        </div>
      </div>

      {open && <Lightbox list={list} index={index} setIndex={setIndex} onClose={() => setOpen(false)} />}
    </section>
  );
}
