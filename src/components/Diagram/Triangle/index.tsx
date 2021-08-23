import {Triangle} from "../../../definitions/Definitions";

export const TRIANGLE_SIZE = 50;

interface TriangleProps {
    model: Triangle;
}

export function TriangleC(props: TriangleProps) {
    const { model } = props;

    const visualizationData = model.visualizationData;

    return (
        <>
            <svg
                x={visualizationData?.bBox?.x}
                y={visualizationData?.bBox?.y}
                height={TRIANGLE_SIZE}
                width={TRIANGLE_SIZE}
            >
                <polygon
                    points={`${TRIANGLE_SIZE / 2},0 0,${TRIANGLE_SIZE} ${TRIANGLE_SIZE},${TRIANGLE_SIZE}`}
                    fill='#fff'
                    stroke="black"
                    stroke-width="3"
                />
            </svg>
            <text x={visualizationData?.bBox?.x} y={visualizationData?.bBox?.y} >{model.name}</text>
        </>
    )
}
