export default function extractNumbersFromString(str: string) {
  return str?.replace(/[^0-9+]/g, '') || '';
}
