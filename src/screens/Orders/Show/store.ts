import { makeAutoObservable } from "mobx";
import client from "~/api/gql";
import { SingleOrder } from "~/screens/Orders/Show/types";
import { ORDER_QUERY } from "./queries";

export default class OrdersShowStore {
    initialized = false;
    loading = false;
    order: SingleOrder | null = null;
    id: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setInitialized(val: boolean) {
        this.initialized = val;
    }

    setOrderId(val: string) {
        this.id = val;
    }

    setLoading(val: boolean) {
        this.loading = val;
    }

    startLoading(): void {
        this.loading = true;
    }

    stopLoading(): void {
        this.loading = false;
    }

    setOrder(order: SingleOrder) {
        this.order = order;
    }

    async loadOrder() {
        this.startLoading();
        
        const resp = await client.query(ORDER_QUERY, { number: this.id }).toPromise();

        this.setOrder(resp.data.order);
        this.stopLoading();
    }

    initialize(orderId: string) {
        if (this.initialized) return;
        this.setInitialized(true);

        this.setOrderId(orderId);
        this.loadOrder()
    }
}
