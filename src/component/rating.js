"use client";

import { FaStar } from "react-icons/fa";


const ratings = [
  {
    label: "Cleanliness",
    score: 2.9,
    icon: (
      <img src="/images/rating/rate-icon-1.svg" alt="" />
    ),
  },
  {
    label: "Accuracy",
    score: 1,
    icon: (
      <img src="/images/rating/rate-icon-2.svg" alt="" />
    ),
  },
  {
    label: "Check-in",
    score: 4,
    icon: (
      <img src="/images/rating/rate-icon-3.svg" alt="" />
    ),
  },
  {
    label: "Communication",
    score: 3,
    icon: (
      <img src="/images/rating/rate-icon-4.svg" alt="" />
    ),
  },
  {
    label: "Location",
    score: 3.7,
    icon: (
      <img src="/images/rating/rate-icon-5.svg" alt="" />
    ),
  },
  {
    label: "Value",
    score: 2,
    icon: (
      <img src="/images/rating/rate-icon-6.svg" alt="" />
    ),
  },
];

function CircleProgress({ score, icon }) {
  const max = 5;
  const pct = score / max;
  const size = 100;
  const strokeWidth = 12;
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ;
  const gap = circ - dash;

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {/* track */}
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="#D9D9D9"
          strokeWidth={strokeWidth}
        />
        {/* progress */}
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="#A180E9"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${gap}`}
        />
      </svg>
      {/* icon center */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div className="rating-icon">{icon}</div>
      </div>
    </div>
  );
}

export default function RatingSection() {
  return (
    <>
      <div className="rating_wrapper">

        {/* Top summary */}
        <div className="rating_summary">
          <span className="rating_star"><FaStar /></span>
          <span className="rating_score">4.93</span>
          <div className="rating_meta">
            <span className="rating_meta_title">Overall Rating</span>
            <span className="rating_meta_sub">
              Based on <span>195</span> verified Reviews.
            </span>
          </div>
        </div>

        {/* 6 cards */}
        <div className="rating_grid">
          {ratings.map(({ label, score, icon }) => (
            <div className="rating_card" key={label}>
              <CircleProgress score={score} icon={icon} />
              <div className="rating_card_info">
                <span className="rating_card_label">{label}</span>
                <span className="rating_card_score">{score.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}