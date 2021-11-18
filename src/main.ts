import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

require('dotenv').config()

process.env.RETAIL_KEY = "EpgGiVOdto8tnlcSqr2AOPDbd0OTlt7U"
process.env.RETAIL_URL = "https://example.retailcrm.ru"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    await app.listen(3000)
}
bootstrap()
