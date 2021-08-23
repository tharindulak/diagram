import { Visitor } from "./BaseVisitor";
import {Circle, Shape, Square} from "../definitions/Definitions";
import {TRIANGLE_SIZE} from "../components/Diagram/Triangle";

class PositioningVisitor implements Visitor {

    beginVisitCircle(circle: Circle, parent?: Shape) {
        if (circle?.visualizationData?.bBox && circle?.children) {
            circle.visualizationData.bBox.x = 400;
            circle.visualizationData.bBox.y = 400;

            const componentStartX = 350;
            const componentStartY = 250;

            let height = 0;
            const componentGap = 50;
            circle.children.forEach((child, index) => {
                if (child.visualizationData?.bBox) {
                    child.visualizationData.bBox.x = componentStartX;
                    child.visualizationData.bBox.y = componentStartY + height;
                    if (index !== circle.children?.length) {
                        height += (child.visualizationData.bBox.h + componentGap);
                    }
                }
            });
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
