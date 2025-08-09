import { Injectable } from '@nestjs/common';

@Injectable()
export class UberService {
  async bookRide(opts: { pickup: string; dropoff: string; when?: Date }) {
    // TODO: integrate Uber API
    return { status: 'mocked', provider: 'uber', request: opts };
  }
}


