import { Visitor } from "./BaseVisitor";
import {Circle, Shape, Square} from "../definitions/Definitions";
import {TRIANGLE_SIZE} from "../components/Diagram/Triangle";
import {CircleVisualizationData} from "../visualizationData/CircleVisualizationData";

class PositioningVisitor implements Visitor {

    beginVisitCircle(circle: Circle, parent?: Shape) {
        if (circle?.visualizationData?.bBox && circle?.children && (circle?.visualizationData as
            CircleVisualizationData)) {
            circle.visualizationData.bBox.x = 400;
            circle.visualizationData.bBox.y = 400;

            const componentStartX = 400;
            const componentStartY = 250;

            let height = 0;
            const componentGap = 50;
            (circle.visualizationData as any).lifeline.x = componentStartX;
            (circle.visualizationData as any).lifeline.y = componentStartY;
            circle.children.forEach((child, index) => {
                if (child.visualizationData?.bBox) {
                    child.visualizationData.bBox.x = componentStartX - (child.visualizationData.bBox.w / 2);
                    child.visualizationData.bBox.y = componentStartY + height;
                    if (circle.children?.length && (index !== (circle.children?.length - 1))) {
                        height += (child.visualizationData.bBox.h + componentGap);
                    }
                }
            });
            (circle.visualizationData as any).lifeline.h = height;
        }
    }

    beginVisitSquare(square: Square, parent?: Shape) {
        if (square?.visualizationData?.bBox && square?.children) {
            let height = 10;
            const componentGap = 50;
            square.children.forEach((child, index) => {
                if (child.visualizationData?.bBox && square?.visualizationData?.bBox) {
                    child.visualizationData.bBox.x = square.visualizationData.bBox.x +
                        (square.visualizationData.bBox.w / 2) - (TRIANGLE_SIZE / 2);
                    child.visualizationData.bBox.y = square.visualizationData.bBox.y + height;
                    if (index !== square.children?.length) {
                        height += (child.visualizationData.bBox.h + componentGap);
                    }
                }
            });
        }
    }
}

export const visitor = new PositioningVisitor();
