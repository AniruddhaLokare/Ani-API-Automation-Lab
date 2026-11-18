export interface BookingData {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds: string;
}

function futureDate(daysFromToday: number): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + daysFromToday);
  return date.toISOString().split("T")[0];
}

export function createBookingData(): BookingData {
  return {
    firstname: "Ani",
    lastname: "Automation",
    totalprice: 1500,
    depositpaid: true,
    bookingdates: {
      checkin: futureDate(7),
      checkout: futureDate(10),
    },
    additionalneeds: "Breakfast",
  };
}
