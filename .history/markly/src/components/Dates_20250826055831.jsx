import React from "react";

export default function getUpcomingDates(daysArray, startDate, endDate) {
  const dayMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  const result = [];
  const current = new Date(startDate);

  while (current <= new Date(endDate)) {
    if (daysArray.includes(current.toLocaleDateString("en-US", { weekday: "long" }))) {
      result.push(new Date(current));
    }
    current.setDate(current.getDate() + 1);
  }

  return result;
}
