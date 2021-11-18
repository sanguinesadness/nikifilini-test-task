import Tag from "components/Tag";
import React from "react";
import { useGlobalState } from "~/screens/globalState";
import { find } from "lodash";
import { observer } from "mobx-react-lite";

interface StatusProps {
    code: string;
}

const ProductStatus = observer(
    ({ code }: StatusProps): JSX.Element => {
        const globalState = useGlobalState();
        const name = find(globalState.productStatuses, { code })?.name || code;

        let color: "blue" | "grey" | "green" | "red";
        switch (code) {
            case "failure":
            case "out-of-stock":
            case "product-is-damaged":
            case "assembly-not-delivery":
            case "lost":
                color = "red";
                break;
            case "sold":
                color = "green";
                break;
            default:
                color = "blue";
        }
        return <Tag text={name} color={color} />;
    }
);

export default ProductStatus;
