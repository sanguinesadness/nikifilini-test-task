import Tag from "components/Tag";
import React from "react";
import { useGlobalState } from "~/screens/globalState";
import { find } from "lodash";
import { observer } from "mobx-react-lite";

interface StatusProps {
    code: string;
}

const OrderStatus = observer(
    ({ code }: StatusProps): JSX.Element => {
        const globalState = useGlobalState();
        const name = find(globalState.orderStatuses, { code })?.name || code;

        let color: "blue" | "grey" | "green" | "red";
        switch (code) {
            case "availability-confirmed":
            case "offer-analog":
            case "client-confirmed":
            case "prepayed":
            case "send-to-assembling":
            case "assembling":
            case "assembling-complete":
            case "send-to-delivery":
            case "delivering":
            case "new":
                color = "blue";
                break;
            case "delyvery-did-not-suit":
            case "prices-did-not-suit":
            case "cancel-other":
                color = "red";
                break;
            case "complete":
                color = "green";
                break;
            default:
                color = "grey";
        }
        return <Tag text={name} color={color} />;
    }
);

export default OrderStatus;
