import React, { useEffect } from "react";
import styles from "./styles.m.styl";
import { map } from "lodash";
import { observer } from "mobx-react-lite";
import OrdersListState from "./store";
import { OrdersListItem } from "./types";

import Button from "../../../components/Button";
import AngleLeftIcon from "../../../assets/icons/angle-left-solid.svg";
import AngleRightIcon from "~/assets/icons/angle-right-solid.svg";
import ListItem from "./components/ListItem";

const getCurrentPage = (): number => {
    const url = new URL(window.location.href);
    const page = url.searchParams.get("page") || "1";

    return Number.parseInt(page);
}

const OrdersList = observer(
    (): JSX.Element => {
        const [state] = React.useState(new OrdersListState());

        useEffect(() => {
            if (state.initialized) return;

            state.setPage(getCurrentPage());
            state.initialize();
        });

        return (
            <React.Fragment>
                <div className={styles.screenWrapper}>
                    <div className={styles.screen}>
                        {state.loading && <span className={styles.loading}>Loading...</span>}
                        {!state.loading && (
                            <React.Fragment>
                                <div className={styles.title}>Список заказов</div>
                                <div className={styles.table}>
                                    <div className={styles.head}>
                                        <div className={styles.row}>
                                            <div>Номер</div>
                                            <div>Создан</div>
                                            <div>Доставка</div>
                                            <div>В работе</div>
                                            <div>Статус</div>
                                        </div>
                                    </div>
                                    <div className={styles.body}>
                                        {map(state.orders, (order: OrdersListItem, index: number) => (
                                            <ListItem order={order} key={index} />
                                        ))}
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                        <div className={styles.pagination}>
                            <Button
                                small
                                text="PREV"
                                icon={AngleLeftIcon}
                                resting
                                disabled={!state.canPrev}
                                onClick={() => state.prevPage()}
                            />
                            <Button
                                small
                                text="NEXT"
                                rightIcon={AngleRightIcon}
                                resting
                                disabled={!state.canNext}
                                onClick={() => state.nextPage()}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
);

export default OrdersList;
