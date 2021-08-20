import {Square} from "../../../definitions/Definitions";
import {ReactNode} from "react";
import {getComponents} from "../../../utils/utils";

export const SQUARE_SIDE = 100;

interface SquareProps {
    model: Square;
}

export function SquareC(props: SquareProps) {
    const { model } = props;

    const visualizationData = model.visualizationData;
    let children: ReactNode[] = [];

    model.children?.forEach(child => {
        children = getComponents(child);
    })

    return (
        <>
            <rect
                x={visualizationData?.bBox?.x}
                y={visualizationData?.bBox?.y}
                width={visualizationData?.bBox?.w}
                height={visualizationData?.bBox?.h}
                fill='#fff'
                stroke="black"
                stroke-width="3"
            />
            {children}
        </>
    )
}
