import {Circle, Shape, Square, Triangle} from "../definitions/Definitions";

export interface Visitor {
    beginVisitShape?(shape: Shape, parent?: Shape): void;
    endVisitShape?(shape: Shape, parent?: Shape): void;

    beginVisitTriangle?(shape: Triangle, parent?: Shape): void;
    endVisitTriangle?(shape: Triangle, parent?: Shape): void;

    beginVisitSquare?(shape: Square, parent?: Shape): void;
    endVisitSquare?(shape: Square, parent?: Shape): void;

    beginVisitCircle?(shape: Circle, parent?: Shape): void;
    endVisitCircle?(shape: Circle, parent?: Shape): void;
}