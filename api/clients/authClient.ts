import { APIRequestContext, expect } from "@playwright/test";

export class AuthClient {
  constructor(private request: APIRequestContext) {}

  async generateToken(): Promise<string> {
    const response = await this.request.post("/auth", {
      data: {
        username: "admin",
        password: "password123",
      },
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(typeof responseBody.token).toBe("string");
    expect(responseBody.token.length).toBeGreaterThan(0);

    return responseBody.token;
  }
}
