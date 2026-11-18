import { test, expect } from "@playwright/test";
import { AuthClient } from "../../api/clients/authClient";
import { BookingClient } from "../../api/clients/bookingClient";
import { createBookingData } from "../../test-data/bookingData";

test("API_005 - Update booking using reusable clients", async ({ request }) => {
  const authClient = new AuthClient(request);
  const bookingClient = new BookingClient(request);

  // Create booking
  const bookingData = createBookingData();

  const createResponse = await bookingClient.createBooking(bookingData);

  expect(createResponse.status()).toBe(200);

  const createBody = await createResponse.json();
  const bookingId = createBody.bookingid;

  expect(Number.isInteger(bookingId)).toBe(true);
  expect(bookingId).toBeGreaterThan(0);

  // Generate token
  const token = await authClient.generateToken();

  // Update booking
  const updatedData = {
    ...bookingData,
    firstname: "Aniruddha",
    totalprice: 2500,
  };

  const updateResponse = await bookingClient.updateBooking(
    bookingId,
    updatedData,
    token,
  );

  expect(updateResponse.status()).toBe(200);

  // Verify persisted booking data
  const getResponse = await bookingClient.getBooking(bookingId);

  expect(getResponse.status()).toBe(200);

  const getBody = await getResponse.json();

  expect(getBody).toMatchObject(updatedData);

  // Cleanup
  const deleteResponse = await bookingClient.deleteBooking(bookingId, token);

  expect(deleteResponse.status()).toBe(201);
});

// import { test, expect } from "@playwright/test";

// test("API_005 - Update existing booking using PUT", async ({ request }) => {
//   // STEP 1: Create a booking
//   const bookingData = {
//     firstname: "Ani",
//     lastname: "QA",
//     totalprice: 1500,
//     depositpaid: true,
//     bookingdates: {
//       checkin: "2027-01-10",
//       checkout: "2027-01-15",
//     },
//     additionalneeds: "Breakfast",
//   };

//   const createResponse = await request.post("/booking", {
//     data: bookingData,
//   });

//   expect(createResponse.status()).toBe(200);

//   const createBody = await createResponse.json();
//   const bookingId = createBody.bookingid;

//   expect(bookingId).toBeGreaterThan(0);

//   // STEP 2: Generate authentication token
//   const authResponse = await request.post("/auth", {
//     data: {
//       username: "admin",
//       password: "password123",
//     },
//   });

//   expect(authResponse.status()).toBe(200);

//   const authBody = await authResponse.json();
//   const token = authBody.token;

//   expect(typeof token).toBe("string");
//   expect(token.length).toBeGreaterThan(0);

//   // STEP 3: Prepare updated booking data
//   const updatedBookingData = {
//     ...bookingData,
//     firstname: "Aniruddha",
//     lastname: "Automation",
//     totalprice: 2500,
//     additionalneeds: "Breakfast and Dinner",
//   };

//   // STEP 4: Send authenticated PUT request
//   const updateResponse = await request.put(`/booking/${bookingId}`, {
//     headers: {
//       Cookie: `token=${token}`,
//       Accept: "application/json",
//     },
//     data: updatedBookingData,
//   });

//   expect(updateResponse.status()).toBe(200);

//   const updateBody = await updateResponse.json();

//   // STEP 5: Validate PUT response
//   expect(updateBody.firstname).toBe(updatedBookingData.firstname);

//   expect(updateBody.lastname).toBe(updatedBookingData.lastname);

//   expect(updateBody.totalprice).toBe(updatedBookingData.totalprice);

//   // STEP 6: Verify updated booking using GET
//   const getResponse = await request.get(`/booking/${bookingId}`);

//   expect(getResponse.status()).toBe(200);

//   const getBody = await getResponse.json();

//   expect(getBody).toMatchObject(updatedBookingData);

//   console.log("Booking updated and verified successfully");
// });
