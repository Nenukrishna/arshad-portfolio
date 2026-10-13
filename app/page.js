import Top from '@/components/Top';
import Reel from '@/components/Reel';
import Work from '@/components/Work';
import Reveal from '@/components/Reveal';

const LEDGER = [
  ['7+', 'Years editing'],
  ['900+', 'Shorts cut'],
  ['1.6B', 'Views, 2023–24'],
  ['4', 'Languages worked in'],
];

// Craft and tools, not a list of spoken languages — the ticker is about what
// lands on the timeline.
const TICKER = [
  'Short-form editing',
  'Performance ads',
  'Motion graphics',
  'AI video generation',
  'Scripting',
  'Audio editing & mix',
  'Colour grading',
  'Creative design',
  '3D visualisation',
  'Premiere Pro',
  'After Effects',
  'Photoshop',
  'Illustrator',
  'Audition',
];

const CRAFT = [
  [
    '01',
    'Retention-first cuts',
    'Nine hundred-plus shorts teaches you where people leave. The hook lands inside three seconds, the pace never sits still, and every cut is there because the next line needs it.',
  ],
  [
    '02',
    'Ads that sell the screen',
    'App ads live or die on whether the viewer can read the product. Screens are timed to the exact claim being made and held long enough to actually take in.',
  ],
  [
    '03',
    'Motion graphics & design',
    'Lower thirds, tickers, supers, charts and virtual sets built in After Effects, Illustrator and Photoshop — made for the piece, not pulled off a template shelf.',
  ],
  [
    '04',
    'AI-assisted production',
    'Generated footage treated as rushes: cast, scripted, graded and cut like anything else, with the app UI composited in afterwards so the product reads true.',
  ],
];

const CREDITS = [
  {
    when: '2025 — Present',
    span: '1 yr 4 mos',
    role: 'Video Editor',
    where: 'Primetrace Technologies · On-site',
    notes: [
      'Writes, shoots and edits marketing ad videos across the company’s app portfolio.',
      'Cut the Crafto trial-activation instructional film, which lifted trial purchase success by 15% and was then rolled out in further languages.',
    ],
  },
  {
    when: '2023 — 2025',
    span: '2 yrs',
    role: 'YouTube Video Editor',
    where: 'Boss Wallah, formerly ffreedom app · On-site',
    notes: [
      'Led the Hindi editing team.',
      'Edited 900+ YouTube Shorts across three finance, business and farming channels, drawing millions of organic views.',
      'Delivered 8.1 million views in 25 days in April, beating the 3 million target by over 170%.',
    ],
  },
  {
    when: '2021 — 2023',
    span: '2 yrs 1 mo',
    role: 'Video Editor',
    where: 'Local Private Broadcast Media · On-site',
    notes: [
      'Ran the video production process end to end, concept through post.',
      'Cut and released content for both broadcast television and YouTube.',
    ],
  },
  {
    when: '2018 — Present',
    span: 'Freelance',
    role: 'Freelance Video Editor',
    where: 'Dreams Productions · Remote',
    notes: ['Edited and released five album songs on YouTube channels to strong organic numbers.'],
  },
  {
    when: '2015 — 2017',
    span: '2 yrs',
    role: '3D ArchViz Artist',
    where: 'MAA Constructions · On-site',
    notes: [
      'Built 3D walkthroughs of home interiors in Unreal Engine, used to win customers and carry projects.',
    ],
  },
];

const TOOLS = [
  'Premiere Pro',
  'After Effects',
  'Photoshop',
  'Illustrator',
  'Audition',
  'Unreal Engine',
];

const CONTACT = [
  ['Email', 'aaeditor.mp4@gmail.com', 'mailto:aaeditor.mp4@gmail.com'],
  ['Phone', '+91 70199 68079', 'tel:+917019968079'],
  ['LinkedIn', 'arshad-ahmed', 'https://www.linkedin.com/in/arshad-ahmed-52479016b/'],
  ['Based in', 'Bengaluru, India', null],
];

export default function Page() {
  return (
    <>
      <Top />

      <main id="top">
        {/* Masthead ------------------------------------------------------ */}
        <section className="mast">
          <div className="wrap">
            <Reveal>
              <div className="dateline">
                <span className="mark">Portfolio</span>
                <span>Senior Video Editor</span>
                <span>Bengaluru, India</span>
                <span>Available for work</span>
              </div>
            </Reveal>

            <div className="mast-grid">
              <div>
                <Reveal delay={60}>
                  <h1>
                    Arshad
                    <em>Ahmed</em>
                  </h1>
                </Reveal>
                <Reveal delay={110}>
                  <p className="mast-role">Senior Video Editor · 7+ years</p>
                </Reveal>
                <Reveal delay={150}>
                  <p className="mast-bio">
                    I cut video that has to earn its next three seconds — <b>performance ads</b> for
                    fintech and small-business apps, and <b>short-form</b> for finance, business and
                    farming channels. Script and storyboard through graphics, sound and grade.
                  </p>
                </Reveal>
                <Reveal delay={200}>
                  <div className="mast-cta">
                    <a href="#reel" className="btn btn-solid">
                      Watch the reel
                    </a>
                    <a href="#work" className="btn">
                      See the work
                    </a>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={150}>
                <div className="ledger">
                  {LEDGER.map(([n, l]) => (
                    <div className="ledger-row" key={l}>
                      <b>{n}</b>
                      <span>{l}</span>
                    </div>
                  ))}
                  <p className="ledger-note">
                    Finance · Business · Farming · Entertainment — English, Hindi, Kannada and
                    Telugu.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Ticker -------------------------------------------------------- */}
        <div className="ticker" aria-hidden="true">
          {/* Doubled so the -50% keyframe lands on an identical frame and the
              loop reads as continuous. */}
          <div className="ticker-row">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={`${t}-${i}`}>{t}</span>
            ))}
          </div>
        </div>

        <Reel />
        <Work />

        {/* Craft --------------------------------------------------------- */}
        <section className="section" id="craft">
          <div className="wrap">
            <div className="section-head">
              <Reveal>
                <span className="label">What I do</span>
                <h2>Four things, done properly</h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="lede">
                  Most of the job is judgement — what to keep, what to lose, and how long to hold
                  the thing the viewer came for.
                </p>
              </Reveal>
            </div>
            <div className="craft">
              {CRAFT.map(([n, h, p], i) => (
                <Reveal key={n} delay={Math.min(i, 3) * 60}>
                  <div className="craft-item">
                    <i>{n}</i>
                    <div>
                      <h3>{h}</h3>
                      <p>{p}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Credits ------------------------------------------------------- */}
        <section className="section" id="credits">
          <div className="wrap">
            <div className="section-head">
              <Reveal>
                <span className="label">Work history</span>
                <h2>Where the hours went</h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="lede">
                  Broadcast, then a YouTube channel at scale, now performance ads. Each one taught
                  the next.
                </p>
              </Reveal>
            </div>

            <div className="credits">
              {CREDITS.map((c, i) => (
                <Reveal key={c.role + c.when} delay={Math.min(i, 4) * 50}>
                  <article className="credit">
                    <div className="credit-when">
                      <b>{c.when}</b>
                      {c.span}
                    </div>
                    <div>
                      <h3>{c.role}</h3>
                      <div className="where">{c.where}</div>
                      <ul>
                        {c.notes.map((n) => (
                          <li key={n}>{n}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* About --------------------------------------------------------- */}
        <section className="section" id="about">
          <div className="wrap">
            <div className="section-head">
              <Reveal>
                <span className="label">About</span>
                <h2>The short version</h2>
              </Reveal>
            </div>

            <div className="about">
              <Reveal>
                <figure className="portrait">
                  <div className="mono-mark" aria-hidden="true">
                    AA
                  </div>
                  <figcaption>Arshad Ahmed · Bengaluru</figcaption>
                </figure>
              </Reveal>

              <Reveal delay={80}>
                <div className="about-body">
                  <p>
                    I started in a broadcast edit suite, moved to YouTube when the whole audience
                    moved there, and ended up cutting the kind of video that gets measured the next
                    morning. Between <b>2023 and 2024</b> the channels I edited for crossed{' '}
                    <b>1.6 billion views</b>; in one April I delivered 8.1 million in 25 days
                    against a 3 million target.
                  </p>
                  <p>
                    Now I make performance ads at <b>Primetrace</b> — written, shot and cut in
                    house, with the app screens composited in so the product reads exactly as it
                    behaves. I trained in VFX at <b>Reliance Animation</b> and spent two years
                    building architectural walkthroughs in Unreal before any of it, which is
                    probably why I still think in shots rather than clips.
                  </p>
                  <p>
                    Work comes back fast, takes notes without argument, and ships in whatever
                    languages the campaign needs.
                  </p>

                  <div className="toolbar">
                    {TOOLS.map((t) => (
                      <span className="tool" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Contact ------------------------------------------------------- */}
        <section className="contact" id="contact">
          <div className="wrap">
            <Reveal>
              <h2>
                Got something that needs <em>cutting?</em>
              </h2>
            </Reveal>
            <Reveal delay={70}>
              <p className="lede">
                Send the brief, the footage, or just the deadline. I will tell you straight whether
                it can be done well in the time.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="contact-rows">
                {CONTACT.map(([k, v, href]) =>
                  href ? (
                    <a
                      key={k}
                      className="contact-row"
                      href={href}
                      {...(href.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      <span className="contact-key">{k}</span>
                      <span className="contact-val">{v}</span>
                    </a>
                  ) : (
                    <div className="contact-row" key={k}>
                      <span className="contact-key">{k}</span>
                      <span className="contact-val">{v}</span>
                    </div>
                  )
                )}
              </div>
            </Reveal>

            <div className="foot">
              <span>© {new Date().getFullYear()} Arshad Ahmed</span>
              <span>Senior Video Editor · Bengaluru</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
