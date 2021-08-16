import { Circle, Shape, Square, Triangle } from "../Definitions/Definitions";

export interface Visitor {
    beginVisitShape?(node: Shape, parent?: Shape): void;
    endVisitShape?(node: Shape, parent?: Shape): void;

    beginVisitTriangle?(node: Triangle, parent?: Shape): void;
    endVisitTriangle?(node: Triangle, parent?: Shape): void;

    beginVisitSquare?(node: Square, parent?: Shape): void;
    endVisitSquare?(node: Square, parent?: Shape): void;

    beginVisitCircle?(node: Circle, parent?: Shape): void;
    endVisitCircle?(node: Circle, parent?: Shape): void;
}