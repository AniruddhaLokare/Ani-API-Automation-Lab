import { APIRequestContext, APIResponse } from "@playwright/test";

import { BookingData } from "../../test-data/bookingData";

export class BookingClient {
  constructor(private request: APIRequestContext) {}

  async createBooking(data: BookingData): Promise<APIResponse> {
    return this.request.post("/booking", {
      data,
    });
  }

  async getBooking(id: number): Promise<APIResponse> {
    return this.request.get(`/booking/${id}`);
  }

  async updateBooking(
    id: number,
    data: BookingData,
    token: string,
  ): Promise<APIResponse> {
    return this.request.put(`/booking/${id}`, {
      headers: {
        Cookie: `token=${token}`,
        Accept: "application/json",
      },
      data,
    });
  }

  async deleteBooking(id: number, token: string): Promise<APIResponse> {
    return this.request.delete(`/booking/${id}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
  }
}
