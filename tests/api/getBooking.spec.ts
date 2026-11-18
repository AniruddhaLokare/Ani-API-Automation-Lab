import { test, expect } from "@playwright/test";

test("Get Booking", async ({ request }) => {
  const booking = await request.get("/booking");

  expect(booking.status()).toBe(200);
  const responseBody = await booking.json();
  expect(Array.isArray(responseBody)).toBe(true);
  console.log(responseBody);
  expect(responseBody.length).toBeGreaterThan(0);

  // Validate properties & types of each booking object in the response
  responseBody.forEach((booking: any) => {
    expect(booking).toHaveProperty("bookingid");
    expect(booking.bookingid).not.toBeNull();
    expect(typeof booking.bookingid).toBe("number");
  });
});
