import {Visitor} from "./BaseVisitor";
import {Circle, Shape, Square} from "../definitions/Definitions";
import {ShapeVisualizationData} from "../visualizationData/ShapeVisualizationData";
import {CircleVisualizationData} from "../visualizationData/CircleVisualizationData";
import {SquareVisualizationData} from "../visualizationData/SquareVisualizationData";

class InitVisitor implements Visitor {
    beginVisitShape(shape: Shape) {
        if (!shape.visualizationData) {
            shape.visualizationData = new ShapeVisualizationData();
        }
    }

    beginVisitCircle(circle: Circle) {
        if (!circle.visualizationData) {
            circle.visualizationData = new CircleVisualizationData();
        }
    }

    beginVisitSquare(square: Square) {
        if (!square.visualizationData) {
            square.visualizationData = new SquareVisualizationData();
        }
    }
}

export const visitor = new InitVisitor();
