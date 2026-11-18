import { test, expect } from "@playwright/test";

test("API_003 - Generate Authentication Token", async ({ request }) => {
  // Step 1: Prepare login credentials
  const authData = {
    username: "admin",
    password: "password123",
  };

  // Step 2: Send POST request
  const response = await request.post("/auth", {
    data: authData,
  });

  // Step 3: Validate status code
  expect(response.status()).toBe(200);

  // Step 4: Parse response body
  const responseBody = await response.json();

  // Step 5: Validate token exists
  expect(responseBody).toHaveProperty("token");

  // Step 6: Validate token is not empty
  expect(typeof responseBody.token).toBe("string");
  expect(responseBody.token.length).toBeGreaterThan(0);

  console.log("Authentication token generated successfully");
});

test("API_004 - Invalid Authentication Token Generation", async ({
  request,
}) => {
  const response = await request.post("/auth", {
    data: {
      username: "invalidUser",
      password: "wrongPassword",
    },
  });

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.reason).toBe("Bad credentials");
  expect(responseBody).not.toHaveProperty("token");
  console.log("Invalid credentials handled correctly");
});
