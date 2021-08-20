import { Visitor } from "./BaseVisitor";
import {Circle, Shape, Square} from "../definitions/Definitions";
import {SquareVisualizationData} from "../visualizationData/SquareVisualizationData";
import {SQUARE_SIDE} from "../components/Diagram/Square";
import {CircleVisualizationData} from "../visualizationData/CircleVisualizationData";
import {RADIUS} from "../components/Diagram/Circle";

class SizingVisitor implements Visitor {
    beginVisitSquare(shape: Square, parent?: Shape) {
        const squareVD: SquareVisualizationData | undefined = shape.visualizationData;
        if (squareVD?.bBox) {
            squareVD.bBox.w = SQUARE_SIDE;
            squareVD.bBox.h = SQUARE_SIDE;
        }
    }

    beginVisitCircle(shape: Circle, parent?: Shape) {
        const circleVD: CircleVisualizationData | undefined = shape.visualizationData;
        if (circleVD?.bBox) {
            circleVD.bBox.r = RADIUS;
        }
    }

    endVisitSquare(shape: Square, parent?: Shape) {
        let height = 0;

        if (shape.visualizationData?.bBox && shape.children) {
            shape.children.forEach(childShape => {
                if (childShape?.visualizationData?.bBox) {
                    height += childShape.visualizationData.bBox.h;
                }
            });
            shape.visualizationData.bBox.w = height;
            shape.visualizationData.bBox.h = height;
        }
    }

    endVisitCircle(shape: Circle, parent?: Shape) {
        let height = 0;
        if (shape.children && shape?.visualizationData?.bBox) {
            shape.children.forEach(childShape => {
                if (childShape?.visualizationData?.bBox?.h) {
                    height += childShape.visualizationData.bBox.h;
                }
            });
            shape.visualizationData.bBox.r = height;
        }
    }
}

export const visitor = new SizingVisitor();
