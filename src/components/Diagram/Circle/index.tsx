import {Circle} from "../../../definitions/Definitions";
import {ReactNode} from "react";
import {getComponents} from "../../../utils/utils";

export const RADIUS = 20;

interface CircleProps {
    model: Circle;
}

export function CircleC(props: CircleProps) {
    const { model } = props;

    const visualizationData = model.visualizationData;
    let children: ReactNode[] = [];

    model.children?.forEach(child => {
        children = getComponents(child);
    })
    const textY = (visualizationData?.bBox?.y && visualizationData?.bBox?.r) ? visualizationData?.bBox?.y -
        visualizationData?.bBox?.r : visualizationData?.bBox?.y;
    return (
        <>
            <circle
                cx={visualizationData?.bBox?.x}
                cy={visualizationData?.bBox?.y}
                r={visualizationData?.bBox?.r}
                stroke="black"
                stroke-width="3"
                fill="#fff"
            />
            <text x={visualizationData?.bBox?.x} y={textY} >{model.name}</text>
            {children}
        </>
    )
}
