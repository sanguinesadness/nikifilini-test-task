import { Injectable } from '@nestjs/common'
import { CrmType, Order, OrdersFilter, RetailPagination } from './types'
import axios, { AxiosInstance } from 'axios'
import { serialize } from '../tools'
import { plainToClass } from 'class-transformer'

@Injectable()
export class RetailService {
    private readonly axios: AxiosInstance

    constructor() {
        this.axios = axios.create({
            baseURL: `${process.env.RETAIL_URL}/api/v5`,
            timeout: 10000,
            headers: {},
        })

        this.axios.interceptors.request.use((config) => {
            // console.log(config.url)
            return config
        })
        this.axios.interceptors.response.use(
            (r) => {
                // console.log("Result:", r)
                return r
            },
            (r) => {
                // console.log("Error:", r)
                return r
            },
        )
    }

    async orders(filter?: OrdersFilter): Promise<[Order[], RetailPagination]> {
        const params = serialize(filter, '')
        const resp = await this.axios.get(`/orders?apiKey=${process.env.RETAIL_KEY}&` + params)

        if (!resp.data) throw new Error('RETAIL CRM ERROR')

        const orders = plainToClass(Order, resp.data.orders as Array<any>)
        const pagination: RetailPagination = resp.data.pagination

        return [orders, pagination]
    }

    async findOrder(id: string): Promise<Order | null> {
        const filter: OrdersFilter = {
            filter: {
                ids: [Number.parseInt(id)]
            }
        }

        const [orders, _] = await this.orders(filter)
        
        return orders[0] || null
    }

    async orderStatuses(): Promise<CrmType[]> {
        const resp = await this.axios.get(`/reference/statuses?apiKey=${process.env.RETAIL_KEY}`)

        if (!resp.data) throw new Error('RETAIL SRM ERROR')

        const result = plainToClass(CrmType, Object.values(resp.data.statuses) as Array<any>)
        
        return result
    }

    async productStatuses(): Promise<CrmType[]> {
        const resp = await this.axios.get(`/reference/product-statuses?apiKey=${process.env.RETAIL_KEY}`)

        if (!resp.data) throw new Error('RETAIL SRM ERROR')

        const result = plainToClass(CrmType, Object.values(resp.data.productStatuses) as Array<any>)
        
        return result
    }

    async deliveryTypes(): Promise<CrmType[]> {
        const resp = await this.axios.get(`/reference/delivery-types?apiKey=${process.env.RETAIL_KEY}`)

        if (!resp.data) throw new Error('RETAIL SRM ERROR')

        const result = plainToClass(CrmType, Object.values(resp.data.deliveryTypes) as Array<any>)
        
        return result
    }
}
