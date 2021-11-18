import { Injectable } from '@nestjs/common'
import { RetailService } from './retail_api/retail.service';

@Injectable()
export class AppService {
    constructor() { }

    getHello(): string {
        return 'Hello World!'
    }
}
