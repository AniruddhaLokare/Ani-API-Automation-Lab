import { test, expect } from "@playwright/test";
import { BookingClient } from "../../api/clients/bookingClient";
import { AuthClient } from "../../api/clients/authClient";
import { createBookingData } from "../../test-data/bookingData";

test("API_007 - Get invalid booking ID", async ({ request }) => {
  const bookingClient = new BookingClient(request);

  const response = await bookingClient.getBooking(999999999);

  expect(response.status()).toBe(404);
});

test("API_008 - Update booking with invalid token", async ({ request }) => {
  const bookingClient = new BookingClient(request);
  const authClient = new AuthClient(request);
  const bookingData = createBookingData();

  let bookingId: number | undefined;

  try {
    // Step 1: Create booking
    const createResponse = await bookingClient.createBooking(bookingData);

    expect(createResponse.status()).toBe(200);

    const createBody = await createResponse.json();
    bookingId = createBody.bookingid;

    expect(Number.isInteger(bookingId)).toBe(true);
    expect(bookingId).toBeGreaterThan(0);

    // Step 2: PUT with invalid token
    const response = await request.put(`/booking/${bookingId}`, {
      data: bookingData,
      headers: {
        Cookie: "token=invalid-token",
        Accept: "application/json",
      },
    });

    // Step 3: Validate forbidden response
    expect(response.status()).toBe(403);
  } finally {
    // Step 4: Cleanup with valid token
    if (bookingId !== undefined) {
      const token = await authClient.generateToken();

      const cleanup = await bookingClient.deleteBooking(bookingId, token);

      expect(cleanup.status()).toBe(201);
    }
  }
});

test("API_009 - Delete booking with invalid token", async ({ request }) => {
  const bookingClient = new BookingClient(request);
  const authClient = new AuthClient(request);
  const bookingData = createBookingData();

  let bookingId: number | undefined;

  try {
    // Step 1: Create booking
    const createResponse = await bookingClient.createBooking(bookingData);

    expect(createResponse.status()).toBe(200);

    const createBody = await createResponse.json();
    bookingId = createBody.bookingid;

    expect(Number.isInteger(bookingId)).toBe(true);
    expect(bookingId).toBeGreaterThan(0);

    // Step 2: DELETE with invalid token
    const response = await request.delete(`/booking/${bookingId}`, {
      headers: {
        Cookie: "token=invalid-token",
      },
    });

    // Step 3: Validate forbidden response
    expect(response.status()).toBe(403);
  } finally {
    // Step 4: Cleanup with valid token
    if (bookingId !== undefined) {
      const token = await authClient.generateToken();

      const cleanup = await bookingClient.deleteBooking(bookingId, token);

      expect(cleanup.status()).toBe(201);
    }
  }
});
