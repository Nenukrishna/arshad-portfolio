'use client';

import { useEffect, useState } from 'react';

const LINKS = [
  ['Reel', '#reel'],
  ['Work', '#work'],
  ['Craft', '#craft'],
  ['Credits', '#credits'],
  ['About', '#about'],
];

export default function Top() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`top ${stuck ? 'stuck' : ''}`}>
      <div className="wrap top-in">
        <a href="#top" className="sig">
          Arshad Ahmed <u>AA</u>
        </a>
        <nav className="top-links">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn btn-solid">
          Get in touch
        </a>
      </div>
    </header>
  );
}
