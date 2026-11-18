import { test, expect } from "@playwright/test";
import { BookingClient } from "../../api/clients/bookingClient";
import { AuthClient } from "../../api/clients/authClient";
import { createBookingData } from "../../test-data/bookingData";

test("API_001 - Create Booking", async ({ request }) => {
  const bookingClient = new BookingClient(request);
  const authClient = new AuthClient(request);
  const bookingData = createBookingData();

  let bookingId: number | undefined;
  let token: string | undefined;

  try {
    const response = await bookingClient.createBooking(bookingData);
    expect(response.status()).toBe(200);

    const body = await response.json();
    bookingId = body.bookingid;

    expect(Number.isInteger(bookingId)).toBe(true);
    expect(bookingId).toBeGreaterThan(0);
    expect(body.booking).toMatchObject({ ...bookingData });
  } finally {
    if (bookingId !== undefined) {
      token = await authClient.generateToken();
      const cleanup = await bookingClient.deleteBooking(bookingId, token);
      expect(cleanup.status()).toBe(201);
    }
  }
});

// import { test, expect } from "@playwright/test";

// test("Create Booking", async ({ request }) => {
//   const formatDate = (date: Date): string => date.toISOString().split("T")[0];

//   const checkin = new Date();
//   checkin.setUTCDate(checkin.getUTCDate() + 7);

//   const checkout = new Date(checkin);
//   checkout.setUTCDate(checkout.getUTCDate() + 2);

//   const bookingData = {
//     firstname: "Ani",
//     lastname: "Doe",
//     totalprice: 100,
//     depositpaid: true,
//     bookingdates: {
//       checkin: formatDate(checkin),
//       checkout: formatDate(checkout),
//     },
//     additionalneeds: "Breakfast",
//   };

//   const response = await request.post("/booking", {
//     data: bookingData,
//   });
//   const responseBody = await response.json();
//   expect(response.status()).toBe(200);
//   expect(responseBody).toHaveProperty("bookingid");
//   expect(typeof responseBody.bookingid).toBe("number");
//   expect(responseBody.booking.firstname).toBe("Ani");
//   expect(responseBody.booking.lastname).toBe("Doe");
//   expect(responseBody.booking.bookingdates.checkout).toBe(
//     bookingData.bookingdates.checkout,
//   );

//   //API Chaining - Post - Get

//   const bookingId = responseBody.bookingid;

//   const getResponse = await request.get(`/booking/${bookingId}`);
//   expect(getResponse.status()).toBe(200);
//   const getResponseBody = await getResponse.json();
//   expect(getResponseBody.firstname).toBe(bookingData.firstname);
//   expect(getResponseBody.lastname).toBe(bookingData.lastname);
//   expect(getResponseBody.totalprice).toBe(bookingData.totalprice);
// });
