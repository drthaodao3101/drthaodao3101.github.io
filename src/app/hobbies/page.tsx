"use client";

import { useEffect, useMemo, useState } from "react";
import { PageHeader, SectionHeading, Reveal } from "@/components/ui";
import { Icon } from "@/lib/icons";
import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/i18n";
import hobbiesData from "@/data/hobbies.json";
import gallery from "@/data/gallery.json";

type GImage = {
  id: string;
  image: string;
  title: string;
  location: string;
  year: number;
  caption: string;
  category: string;
};

const accents = ["from-navy to-teal", "from-teal to-cyan", "from-navy to-cyan", "from-teal to-navy"];

function Placeholder({ img, idx }: { img: GImage; idx: number }) {
  return (
    <div
      className={`flex h-full w-full flex-col justify-end bg-gradient-to-br ${
        accents[idx % accents.length]
      } p-4`}
    >
      <Icon name="pin" width={18} height={18} className="mb-auto text-white/70" />
      <p className="font-display text-base font-semibold leading-tight text-white">{img.title}</p>
      <p className="mt-0.5 font-mono text-[11px] text-white/80">
        {img.location} · {img.year}
      </p>
    </div>
  );
}

/* ---------- Carousel ---------- */
function Carousel({ images }: { images: GImage[] }) {
  const [i, setI] = useState(0);
  const n = images.length;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || n <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), 4500);
    return () => clearInterval(t);
  }, [n]);

  if (!n) return null;
  const img = images[i];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line shadow-card">
      <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
        {img.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img.image} alt={img.title} className="h-full w-full object-cover" />
        ) : (
          <Placeholder img={img} idx={i} />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-5 sm:p-6">
          <p className="font-display text-xl font-semibold text-white sm:text-2xl">{img.title}</p>
          <p className="mt-1 font-mono text-xs text-white/85">
            {img.location} · {img.year}
          </p>
        </div>
      </div>

      <button
        onClick={() => setI((p) => (p - 1 + n) % n)}
        aria-label="Previous"
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2 text-navy shadow-card transition hover:bg-white"
      >
        <Icon name="external" width={16} height={16} className="rotate-180" />
      </button>
      <button
        onClick={() => setI((p) => (p + 1) % n)}
        aria-label="Next"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2 text-navy shadow-card transition hover:bg-white"
      >
        <Icon name="external" width={16} height={16} />
      </button>

      <div className="absolute bottom-3 right-4 flex gap-1.5">
        {images.map((_, k) => (
          <button
            key={k}
            onClick={() => setI(k)}
            aria-label={`Slide ${k + 1}`}
            className={`h-1.5 rounded-full transition-all ${k === i ? "w-5 bg-white" : "w-1.5 bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- Travel Map (equirectangular SVG) ---------- */
function TravelMap() {
  const { lang } = useLang();
  const places = gallery.places;
  const W = 720;
  const H = 360;
  // equirectangular projection
  const project = (lat: number, lng: number) => ({
    x: ((lng + 180) / 360) * W,
    y: ((90 - lat) / 180) * H,
  });
  const home = places.find((p) => p.category === "home") ?? places[0];
  const hp = project(home.lat, home.lng);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-navy shadow-card">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Travel map">
        <defs>
          <radialGradient id="ocean" cx="50%" cy="45%" r="75%">
            <stop offset="0%" stopColor="#0E3A56" />
            <stop offset="100%" stopColor="#0B2540" />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill="url(#ocean)" />

        {/* graticule */}
        {Array.from({ length: 11 }).map((_, k) => (
          <line key={`v${k}`} x1={(k / 10) * W} y1={0} x2={(k / 10) * W} y2={H} stroke="#22B8CF" strokeOpacity="0.07" />
        ))}
        {Array.from({ length: 7 }).map((_, k) => (
          <line key={`h${k}`} x1={0} y1={(k / 6) * H} x2={W} y2={(k / 6) * H} stroke="#22B8CF" strokeOpacity="0.07" />
        ))}
        <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="#22B8CF" strokeOpacity="0.18" strokeDasharray="3 4" />

        {/* arcs from home */}
        {places
          .filter((p) => p.category !== "home")
          .map((p, k) => {
            const t = project(p.lat, p.lng);
            const mx = (hp.x + t.x) / 2;
            const my = (hp.y + t.y) / 2 - Math.abs(t.x - hp.x) * 0.18 - 10;
            return (
              <path
                key={`arc${k}`}
                d={`M ${hp.x} ${hp.y} Q ${mx} ${my} ${t.x} ${t.y}`}
                fill="none"
                stroke="#22B8CF"
                strokeOpacity="0.35"
                strokeWidth="1"
              />
            );
          })}

        {/* pins */}
        {places.map((p, k) => {
          const t = project(p.lat, p.lng);
          const isHome = p.category === "home";
          return (
            <g key={`pin${k}`}>
              {isHome && <circle cx={t.x} cy={t.y} r="7" fill="#22B8CF" opacity="0.25" />}
              <circle
                cx={t.x}
                cy={t.y}
                r={isHome ? 4 : 3}
                fill={isHome ? "#22B8CF" : "#0E7C86"}
                stroke="#fff"
                strokeWidth="1"
              />
            </g>
          );
        })}
      </svg>

      <div className="flex flex-wrap gap-x-5 gap-y-1.5 border-t border-white/10 p-4">
        {places.map((p) => (
          <span key={p.name} className="flex items-center gap-1.5 font-mono text-[11px] text-white/70">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: p.category === "home" ? "#22B8CF" : "#0E7C86" }}
            />
            {p.name}
          </span>
        ))}
      </div>
      <p className="px-4 pb-3 text-[11px] text-white/40">
        {lang === "en"
          ? "Pinned by coordinates · equirectangular projection"
          : "Ghim theo tọa độ · phép chiếu equirectangular"}
      </p>
    </div>
  );
}

/* ---------- Page ---------- */
export default function HobbiesPage() {
  const { lang } = useLang();
  const [filter, setFilter] = useState("All");
  const images = gallery.images as GImage[];

  const filtered = useMemo(
    () => (filter === "All" ? images : images.filter((g) => g.category === filter)),
    [filter, images]
  );

  return (
    <>
      <PageHeader
        eyebrow={dict.nav.hobbies[lang]}
        title={dict.sections.hobbies[lang]}
        sub={hobbiesData.intro[lang]}
      />

      <section className="section">
        <div className="flex flex-wrap gap-3">
          {hobbiesData.hobbies.map((h, i) => (
            <Reveal key={h.en} delay={i * 50}>
              <span className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-medium text-navy shadow-card">
                <Icon name={h.icon} width={18} height={18} className="text-teal" />
                {h[lang]}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-4">
        <Carousel images={images} />
      </section>

      <section className="section pt-10">
        <SectionHeading eyebrow={dict.sections.gallery[lang]} title={dict.sections.gallery[lang]} />

        <div className="mb-7 mt-6 flex flex-wrap gap-2">
          {gallery.categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
                filter === c
                  ? "bg-navy text-white shadow-card"
                  : "border border-line text-muted hover:border-teal hover:text-teal"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="[column-fill:_balance] gap-4 sm:columns-2 lg:columns-3">
          {filtered.map((img, i) => (
            <div key={img.id} className="mb-4 break-inside-avoid">
              <Reveal delay={(i % 6) * 40}>
                <div className="overflow-hidden rounded-2xl border border-line shadow-card transition hover:shadow-lift">
                  <div className={i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/3]"}>
                    {img.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={img.image} alt={img.title} className="h-full w-full object-cover" />
                    ) : (
                      <Placeholder img={img} idx={i} />
                    )}
                  </div>
                  {img.caption && (
                    <div className="bg-white p-3">
                      <p className="text-sm font-medium text-navy">{img.title}</p>
                      <p className="mt-0.5 text-xs text-muted">{img.caption}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface/60 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading eyebrow={dict.sections.travelMap[lang]} title={dict.sections.travelMap[lang]} />
          <div className="mt-7">
            <TravelMap />
          </div>
        </div>
      </section>
    </>
  );
}
