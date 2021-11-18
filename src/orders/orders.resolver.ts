import { Args, Int, Query, Resolver } from '@nestjs/graphql'
import { RetailService } from '../retail_api/retail.service'
import { OrdersResponse } from '../graphql'
import { Order, OrdersFilter } from 'src/retail_api/types'

@Resolver('Orders')
export class OrdersResolver {
    constructor(private retailService: RetailService) { }

    @Query() 
    async getOrders(@Args('page', { type: () => Int }) page?: number) : Promise<OrdersResponse> {
        const filter: OrdersFilter = page ? 
            { page: page }
            : undefined

        const response = await this.retailService.orders(filter)

        return {
            orders: response[0],
            pagination: response[1]
        }
    }

    @Query()
    async order(@Args('number') id: string) : Promise<Order> {
        return this.retailService.findOrder(id)
    }
}
