const GOOGLE_FORM_BASE = "https://docs.google.com/forms/d/e/1FAIpQLSc3ddEJK1dZX8Avte36Mwqzqj07AevUaO2ZN5WZjvHCYh3H_A/viewform";

interface BookingParams {
  tourName: string;
  price: number;
  travelers?: number;
  message?: string;
}

export function getBookingFormUrl({ tourName, price, travelers = 1, message = "" }: BookingParams): string {
  const params = new URLSearchParams({
    "usp": "pp_url",
    "entry.1373838771": tourName,
    "entry.1594262721": price.toString(),
    "entry.1849625111": travelers.toString(),
    "entry.17593334": message,
  });
  return `${GOOGLE_FORM_BASE}?${params.toString()}`;
}
