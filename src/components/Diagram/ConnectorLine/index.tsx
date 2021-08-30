import {Circle} from "../../../definitions/Definitions";
import {ReactNode} from "react";
import {getComponents} from "../../../utils/utils";

export const RADIUS = 20;

interface LineProps {
    x: number| undefined;
    y: number| undefined;
    l: number| undefined;
}

export function ConnectorLine(props: LineProps) {
    const { x, y, l } = props;

    const y2 = (y && l) ? y+l : 0;
    return (
        <>
            <line x1={x} y1={y} x2={x} y2={y2} stroke="black" stroke-width="3" />
        </>
    )
}
