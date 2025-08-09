import { Injectable } from '@nestjs/common';

@Injectable()
export class ZeptoService {
  async orderGroceries(list: Array<{ item: string; qty: number }>, address: string) {
    // TODO: integrate Zepto
    return { status: 'mocked', list, address };
  }
}


