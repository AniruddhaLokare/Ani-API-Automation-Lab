import { test, expect } from "@playwright/test";

test("API_006 - Delete booking and verify deletion", async ({ request }) => {
  // STEP 1: Create booking
  const bookingData = {
    firstname: "Ani",
    lastname: "Automation",
    totalprice: 2000,
    depositpaid: true,
    bookingdates: {
      checkin: "2027-02-10",
      checkout: "2027-02-15",
    },
    additionalneeds: "Breakfast",
  };

  const createResponse = await request.post("/booking", {
    data: bookingData,
  });

  expect(createResponse.status()).toBe(200);

  const createBody = await createResponse.json();
  const bookingId = createBody.bookingid;

  expect(bookingId).toBeGreaterThan(0);

  // STEP 2: Generate authentication token
  const authResponse = await request.post("/auth", {
    data: {
      username: "admin",
      password: "password123",
    },
  });

  expect(authResponse.status()).toBe(200);

  const authBody = await authResponse.json();
  const token = authBody.token;

  expect(typeof token).toBe("string");
  expect(token.length).toBeGreaterThan(0);

  // STEP 3: Delete booking
  const deleteResponse = await request.delete(`/booking/${bookingId}`, {
    headers: {
      Cookie: `token=${token}`,
    },
  });

  // Restful Booker returns 201 on successful DELETE
  expect(deleteResponse.status()).toBe(201);

  // STEP 4: Verify booking no longer exists
  const getResponse = await request.get(`/booking/${bookingId}`);

  expect(getResponse.status()).toBe(404);

  console.log("Booking deleted and verified successfully");
});
