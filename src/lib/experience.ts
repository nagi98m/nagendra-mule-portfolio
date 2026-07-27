const EXPERIENCE_START_YEAR = 2021;
const EXPERIENCE_START_MONTH = 10;

export function getExperienceDuration(referenceDate = new Date()) {
  const totalMonths = Math.max(
    0,
    (referenceDate.getUTCFullYear() - EXPERIENCE_START_YEAR) * 12 +
      (referenceDate.getUTCMonth() - EXPERIENCE_START_MONTH),
  );
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return {
    years,
    months,
    totalMonths,
    label: `${years} ${years === 1 ? "year" : "years"}${months ? ` ${months} ${months === 1 ? "month" : "months"}` : ""}`,
    compact: `${years}y ${months}m`,
  };
}
