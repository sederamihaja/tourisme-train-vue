export function formatHours(value: number) {
  const hours = Math.floor(value / 3600);

  const remainingSeconds = value % 3600;

  const minutes = Math.floor(remainingSeconds / 60);

  return `${hours}h${minutes}min`;
}
