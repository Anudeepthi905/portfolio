const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2025-05" -> "May 2025" */
export function formatMonth(value: string): string {
  const [year, month] = value.split("-");
  const name = MONTHS[Number(month) - 1];
  return name && year ? `${name} ${year}` : value;
}
