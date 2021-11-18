import React, { useEffect } from "react";
import OrdersShowStore from "./store";
import { observer } from "mobx-react-lite";
import { useHistory, useParams } from "react-router-dom";
import styles from "./styles.m.styl";
import DeliveryType from "~/components/DeliveryType";
import ProductStatus from "~/components/ProductStatus";
import OrderStatus from "~/components/OrderStatus";
import Button from "~/components/Button";
import AngleLeftIcon from "../../../assets/icons/angle-left-solid.svg";

type ShowParams = {
    id: string;
};

const OrdersShow = observer(
    (): JSX.Element => {
        const [state] = React.useState(new OrdersShowStore());

        const params = useParams<ShowParams>();
        const history = useHistory();

        useEffect(() => {
            if (state.initialized) return;
            state.initialize(params.id.toString());
        });

        return (
            <div className={styles.screenWrapper}>
                <div className={styles.screen}>
                    {state.loading && <span>Loading...</span>}
                    {!state.loading && state.order && (
                        <div className={styles.content}>
                            <div className={styles.orderInfo}>
                                <div className={styles.title}>Информация о заказе</div>
                                <div className={styles.orderProp}>
                                    <span className={styles.propName}>Номер</span>
                                    <span>{state.order.number}</span>
                                </div>
                                <div className={styles.orderProp}>
                                    <span className={styles.propName}>Доставка</span>
                                    <span>
                                        <DeliveryType code={state.order.delivery.code} />
                                    </span>
                                </div>
                                <div className={styles.orderProp}>
                                    <span className={styles.propName}>Статус</span>
                                    <span>
                                        <OrderStatus code={state.order.status} />
                                    </span>
                                </div>
                            </div>
                            <div className={styles.table}>
                                <div className={styles.title}>Предметы</div>
                                <div className={styles.head}>
                                    <div className={styles.row}>
                                        <div>Название</div>
                                        <div>Статус</div>
                                    </div>
                                </div>
                                <div className={styles.body}>
                                    {state.order.items.map(item => (
                                        <div key={item.id} className={styles.row}>
                                            <div className={styles.name}>{item.offer.displayName}</div>
                                            <ProductStatus code={item.status} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.backButtonWrapper}>
                                <Button
                                    small
                                    text="BACK"
                                    icon={AngleLeftIcon}
                                    resting
                                    onClick={() => history.goBack()}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

export default OrdersShow;
