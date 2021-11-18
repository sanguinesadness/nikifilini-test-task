import { createContext, useContext } from "react";
import client from "api/gql";
import {
  DELIVERY_TYPES_QUERY,
  ORDER_STATUSES_QUERY,
  PRODUCT_STATUSES_QUERY,
} from "~/screens/queries";
import { CrmType } from "~/api/types/crmType";
import { makeAutoObservable } from "mobx";

type Status = null | Promise<any> | true;

export class GlobalState {
  initialized = false;
  data: {
    orderStatuses: CrmType[];
    deliveryTypes: CrmType[];
    productStatuses: CrmType[];
  } = {
    orderStatuses: [],
    deliveryTypes: [],
    productStatuses: [],
  };

  status: {
    orderStatuses: Status;
    deliveryTypes: Status;
    productStatuses: Status;
  } = {
    orderStatuses: null,
    deliveryTypes: null,
    productStatuses: null,
  };

  constructor() {
    makeAutoObservable(this);
  }

  setInitialized(val: boolean) {
    this.initialized = val;
  }

  setOrderStatuses(statuses: CrmType[]) {
    this.data.orderStatuses = statuses;
    this.status.orderStatuses = true;
  }

  setProductStatuses(statuses: CrmType[]) {
    this.data.productStatuses = statuses;
    this.status.productStatuses = true;
  }

  setDeliveryTypes(types: CrmType[]) {
    this.data.deliveryTypes = types;
    this.status.deliveryTypes = true;
  }

  get productStatuses() {
    if (this.status.productStatuses === null) {
    }
    return this.data.productStatuses;
  }

  get deliveryTypes() {
    if (this.status.deliveryTypes === null) {
    }
    return this.data.deliveryTypes;
  }

  get orderStatuses() {
    if (this.status.orderStatuses === null) {
    }
    return this.data.orderStatuses;
  }

  async loadOrderStatuses() {
      this.status.orderStatuses = client.query(ORDER_STATUSES_QUERY).toPromise();

      const resp = await this.status.orderStatuses;

      this.setOrderStatuses(resp.data.orderStatuses);
  }

  async loadProductStatuses() {
      this.status.productStatuses = client.query(PRODUCT_STATUSES_QUERY).toPromise();

      const resp = await this.status.productStatuses;

      this.setProductStatuses(resp.data.productStatuses);
  }

  async loadDeliveryTypes() {
      this.status.deliveryTypes = client.query(DELIVERY_TYPES_QUERY).toPromise();

      const resp = await this.status.deliveryTypes;

      this.setDeliveryTypes(resp.data.deliveryTypes);
  }

  initialize() {
    if (this.initialized) return;
    this.setInitialized(true);

    this.loadDeliveryTypes();
    this.loadOrderStatuses();
    this.loadProductStatuses();
  }
}

export const GlobalStateContext = createContext(new GlobalState());
export const GlobalStateProvider = GlobalStateContext.Provider;

export function useGlobalState() {
  return useContext(GlobalStateContext);
}
