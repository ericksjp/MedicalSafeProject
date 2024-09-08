/**
 * Formats a date to (dd/mm/yyyy) format.
 *
 * @param {Date} date - The date to be formatted
 * @return {string} The formatted date
 */
function formatDate(date) {
  if (!(date instanceof Date)) date = new Date(date);
  return date.toLocaleDateString("pt-BR", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

/**
 * Formats an hour to (hh:mm) format.
 *
 * @param {Date} date - The date to be formatted
 * @return {string} The formatted date
 */
function formatHora(date) {
  if (!(date instanceof Date)) date = new Date(date);
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * This function takes a date object and returns an object with various date formats.
 *
 * @param {Date} date - The date object.
 * @returns {Object} An object containing:
 *   - month: The month of the date (1-12).
 *   - day: The day of the month (1-31).
 *   - dateStrKey: The date formatted as a string (using the formatDate function).
 *   - dateStr: The date formatted as a string in the format "Dia dd de MMMM".
 *   - dayName: The short name of the weekday.
 *   - date: The original date object.
 */
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
    date,
  };
}

/**
 * This function generates an array of date objects, starting from a given date and incrementing by a specified amount.
 *
 * @param {Date} startDate - The date to start from.
 * @param {number} numDays - The number of days to generate.
 * @param {number} increment - The amount to increment each date by.
 * @returns {Array} An array of date objects, each incremented by the specified amount from the previous one.
 */
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

/**
 * Generates an array of dates centered around a given date.
 *
 * @param {Date} currentDate - The date around which the array is centered.
 * @param {number} span - The number of dates before and after the current date to include in the array.
 * @return {Array} An array of dates. The length of the array is (span * 2 + 1).
 */
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

/**
 * Generates a list of medications based on the given parameters.
 *
 * @param {Date} dataInicio - The start date for the medication.
 * @param {Date} dataFim - The end date for the medication.
 * @param {Object} medicamento - The medication to generate.
 * @returns {Array} An array of medications, each containing the name, form, dose, time, status, and date.
 */
function generateMedMap(medicamento, currentMedMap) {
  const dataInicio =
    medicamento.primeiraDose instanceof Date
      ? dataInicio
      : new Date(medicamento.primeiraDose);

  const dataFim =
    medicamento.ultimaDose instanceof Date
      ? dataFim
      : new Date(medicamento.ultimaDose);

  const newMap = new Map(currentMedMap);

  let currentWeekDay = new Date().getDay();
  while (dataInicio < dataFim) {
    const dateKey = formatDate(dataInicio);
    if (medicamento.frequenciaDias[currentWeekDay] === 1) {
      let generate = medicamento.horarios.map((horario) => ({
        name: medicamento.nome,
        forma: medicamento.forma,
        hora: horario.hora,
        dose: horario.dose,
        status: 3,
        dia: dateKey,
      }));

      if (newMap.has(dateKey)) {
        let arr = newMap.get(dateKey);
        arr = arr.concat(generate).sort((a, b) => a.hora - b.hora);
        newMap.set(dateKey, arr);
      } else {
        generate.sort((a, b) => a.hora - b.hora);
        newMap.set(dateKey, [...generate]);
      }
    }

    currentWeekDay === 6 ? (currentWeekDay = 0) : currentWeekDay++;
    dataInicio.setDate(dataInicio.getDate() + 1);
  }

  return newMap;
}

/**
 * Returns the text and color associated with a given status.
 *
 * @param {number} status - The status to get the text and color for.
 * @returns {Object} An object containing the text and color associated with the status.
 */
const getStatusTextAndColor = (status) => {
  switch (status) {
    case 3:
      return { text: "Pendente", color: "text-blue-400" };
    case 2:
      return { text: "Atrasado", color: "text-yellow-400" };
    case 1:
      return { text: "Tomado", color: "text-green-400" };
    case 0:
      return { text: "Ignorado", color: "text-red-400" };
    default:
      return { text: "", color: "" };
  }
};

export {
  getDates,
  generateDates,
  formatDate,
  formatHora,
  generateMedMap,
  getStatusTextAndColor,
};
