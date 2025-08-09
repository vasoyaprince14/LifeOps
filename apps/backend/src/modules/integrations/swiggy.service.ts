import { Injectable } from '@nestjs/common';

@Injectable()
export class SwiggyService {
  async searchRestaurants(query: string, location?: string) {
    // TODO: integrate Swiggy
    return { query, location, results: [] };
  }
}


