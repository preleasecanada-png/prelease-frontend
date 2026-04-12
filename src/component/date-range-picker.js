import React, { useState } from "react";
import { addMonths, format, isBefore, startOfDay, subMonths } from "date-fns";

function DateRangePicker({ id, activePopover, setActivePopover, dateRange: dateRangeProp, setDateRange: setDateRangeProp }) {
  const isOpen = activePopover === id;
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [arrivalDateInternal, setArrivalDateInternal] = useState('');

  const arrivalDate = dateRangeProp?.start_date ?? arrivalDateInternal;
  const setArrivalDate = (date) => {
    if (setDateRangeProp) {
      setDateRangeProp({ start_date: date, end_date: '' });
    } else {
      setArrivalDateInternal(date);
    }
  };

  const handleDateClick = (date) => {
    const selectedDate = startOfDay(date);
    setArrivalDate(selectedDate);
    setActivePopover(null);
  };

  const renderCalendar = (month) => {
    const today = startOfDay(new Date());
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="day-cell"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(month.getFullYear(), month.getMonth(), i);
      const isSelected = arrivalDate && new Date(arrivalDate).toDateString() === date.toDateString();
      const isDisabled = isBefore(date, today);

      days.push(
        <button
          type="button"
          key={i}
          onClick={() => !isDisabled && handleDateClick(date)}
          className={`day-cell ${isDisabled ? "disabled" : ""} ${isSelected ? "selected" : "hoverable"}`}
          disabled={isDisabled}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="calendar-container">
        <div className="month-title">{format(month, "MMMM yyyy")}</div>
        <div className="calendar-grid">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="day-cell day-header">
              {day}
            </div>
          ))}
          {days}
        </div>
      </div>
    );
  };

  const disablePreviousButton = () => {
    return currentMonth.getMonth() === 0;
  };
  const handleToggle = () => {
    if (isOpen) {
      setActivePopover(null);
    } else {
      setActivePopover(id);
    }
  };
  return (
    <>
      <button
        type="button"
        className="row_selector"
        onClick={handleToggle}
      >
        <div className="dropDown_area_button">
          <img className="form_icon" src="/images/checkin.png" alt="" />
          <div className="form_heads">
            <h3>Arrival Date</h3>
            {arrivalDate ? (
              <input
                key={`${arrivalDate}`}
                type="text"
                placeholder="Add Date"
                value={format(new Date(arrivalDate), "MMMM dd")}
                readOnly
                className="pointer-event-none"
              />
            ) : (
              <input
                type="text"
                placeholder="Add Date"
                readOnly
                className="pointer-event-none"
              />
            )}
          </div>
        </div>
      </button>
      {isOpen && (
        <div className="popover-container">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <button
              type="button"
              className="button_change"
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              disabled={disablePreviousButton()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" /></svg>            
            </button>
            <button
              type="button"
              className="button_change"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg>
            </button>
          </div>
          <div className="row_date_picker">
            {renderCalendar(currentMonth)}
          </div>
        </div>
      )}
    </>
  );
}

export default DateRangePicker;
