"use client";
import { useState, useEffect } from "react";

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}
function isSameDay(a, b) {
  return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isBetween(date, start, end) {
  if (!start || !end) return false;
  const s = new Date(start);
  const e = new Date(end);
  s.setHours(0, 0, 0, 0);
  e.setHours(0, 0, 0, 0);
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);

  const [min, max] = s <= e ? [s, e] : [e, s];
  return d > min && d < max;
}

export default function DateRangePicker({ externalStartDate, externalEndDate }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hovered, setHovered] = useState(null);

  // Sync view with external dates
  useEffect(() => {
    if (externalStartDate) {
      const start = new Date(externalStartDate);
      setViewYear(start.getFullYear());
      setViewMonth(start.getMonth());
    }
  }, [externalStartDate]);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const daysInPrev = getDaysInMonth(viewYear, viewMonth - 1);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const handleDayClick = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date); setEndDate(null);
    } else {
      if (date < startDate) { setEndDate(startDate); setStartDate(date); }
      else setEndDate(date);
    }
  };

  const clearDates = () => { setStartDate(null); setEndDate(null); setHovered(null); };

  // Build calendar cells
  const cells = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrev - i, currentMonth: false, date: new Date(viewYear, viewMonth - 1, daysInPrev - i) });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, currentMonth: true, date: new Date(viewYear, viewMonth, d) });
  }
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, currentMonth: false, date: new Date(viewYear, viewMonth + 1, d) });
  }

  // Use external dates if provided
  const effectiveStart = externalStartDate ? new Date(externalStartDate) : startDate;
  const effectiveEnd = externalEndDate ? new Date(externalEndDate) : (endDate || hovered);

  return (
    <>
      <div className="drp_wrapper">
        <h1 className="drp_title">Toronto</h1>
        <p className="drp_subtitle">Select check-in and check-out dates.</p>

        <div className="drp_card">
          {/* Navigation */}
          <div className="drp_nav">
            <button className="drp_nav_btn" onClick={prevMonth}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <span className="drp_month_label">{MONTHS[viewMonth]} {viewYear}</span>
            <button className="drp_nav_btn" onClick={nextMonth}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Day headers */}
          <div className="drp_days_header">
            {DAYS.map((d, i) => <div key={i} className="drp_day_name">{d}</div>)}
          </div>

          {/* Calendar grid */}
          <div className="drp_grid">
            {cells.map(({ day, currentMonth, date }, idx) => {
              const isStart = isSameDay(date, effectiveStart);
              const isEnd = isSameDay(date, effectiveEnd);
              const isToday = isSameDay(date, today);
              const inRange = isBetween(date, effectiveStart, effectiveEnd);
              const isOther = !currentMonth;

              let cls = "drp_cell";
              if (isOther) cls += " other_month";
              if (isToday && !isStart && !isEnd) cls += " today";
              if (isStart) cls += " start_date" + (effectiveEnd ? " in_range_start" : " start_only");
              if (isEnd) cls += " end_date in_range_end";
              if (inRange) cls += " in_range";

              return (
                <div
                  key={idx}
                  className={cls}
                  onClick={() => !isOther && handleDayClick(date)}
                  onMouseEnter={() => effectiveStart && !effectiveEnd && setHovered(date)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {day}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="drp_footer">
            <button className="drp_clear_btn" onClick={clearDates}>Clear Dates</button>
            {effectiveStart && (
              <p className="drp_selected_info">
                {effectiveStart.toDateString()}
                {effectiveEnd ? ` → ${effectiveEnd.toDateString()}` : " (select checkout)"}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}