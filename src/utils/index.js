function obj(date) {
  return {
    month: date.getMonth() + 1,
    day: date.getDate(),
    dateStrKey: formatDate(date),
    dateStr:
      "Dia " +
      date.getDate() +
      " de " +
      date.toLocaleString("pt-BR", { month: "long" }),

    dayName: date.toLocaleString("pt-BR", { weekday: "short" }).slice(0, -1),
  };
}
function formatDate(date) {
  return date.toISOString().split("T")[0];
}

const generateDates = (startDate, numDays, increment) => {
  const result = new Array(numDays).fill(null);

  if (increment === 1) {
    for (let i = 0; i < numDays; i++) {
      startDate.setDate(startDate.getDate() + increment);
      result[i] = obj(new Date(startDate));
    }
    return result;
  }

  for (let i = numDays - 1; i >= 0; i--) {
    startDate.setDate(startDate.getDate() + increment);
    result[i] = obj(startDate);
  }

  return result;
};

function getDates(currentDate, span) {
  const result = new Array(span * 2 + 1);

  const prevDates = generateDates(new Date(currentDate), span, -1);
  const futureDates = generateDates(new Date(currentDate), span, 1);

  for (let i = 0; i < span; i++) {
    result[i] = prevDates[i];
  }

  result[span] = obj(currentDate);

  for (let i = 0; i < span; i++) {
    result[span + 1 + i] = futureDates[i];
  }

  return result;
}

export { getDates, generateDates, formatDate };
