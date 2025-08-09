import { Injectable } from '@nestjs/common';

@Injectable()
export class ZomatoService {
  async searchRestaurants(query: string, location?: string) {
    // TODO: integrate Zomato API
    return { query, location, results: [] };
  }
}


