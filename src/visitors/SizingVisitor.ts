import { Visitor } from "./BaseVisitor";
import {Circle, Shape, Square, Triangle} from "../definitions/Definitions";
import {SquareVisualizationData} from "../visualizationData/SquareVisualizationData";
import {SQUARE_SIDE} from "../components/Diagram/Square";
import {CircleVisualizationData} from "../visualizationData/CircleVisualizationData";
import {RADIUS} from "../components/Diagram/Circle";
import {TriangleVisualizationData} from "../visualizationData/TriangleVisualizationData";
import {TRIANGLE_SIZE} from "../components/Diagram/Triangle";

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

        if (shape.visualizationData?.bBox && shape.children) {
            let width = shape.visualizationData.bBox.w;
            let height = shape.visualizationData.bBox.h;
            shape.children.forEach(childShape => {
                if (childShape?.visualizationData?.bBox) {
                    height += childShape.visualizationData.bBox.h;
                }
                if (childShape?.visualizationData?.bBox && (childShape.visualizationData.bBox.w > width)) {
                    width = childShape.visualizationData.bBox.w
                }
            });
            shape.visualizationData.bBox.w = width;
            if (shape.visualizationData.bBox.h < height) {
                shape.visualizationData.bBox.h = height;
            }
            if (height > width) {
                shape.visualizationData.bBox.w = shape.visualizationData.bBox.h;
            } else {
                shape.visualizationData.bBox.h = shape.visualizationData.bBox.w;
            }
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

    beginVisitTriangle?(shape: Triangle, parent?: Shape) {
        const circleVD: TriangleVisualizationData | undefined = shape.visualizationData;
        if (circleVD?.bBox) {
            circleVD.bBox.h = TRIANGLE_SIZE;
        }
    }
}

export const visitor = new SizingVisitor();
