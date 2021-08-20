import { Visitor } from "./BaseVisitor";
import {Circle, Shape} from "../definitions/Definitions";

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
}

export const visitor = new PositioningVisitor();
