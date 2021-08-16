import { Shape } from "../Definitions/Definitions";
import { Visitor } from "../Visitors/BaseVisitor";

const metaNodes = ["visualizationData", "parent"];

export function traversNode(object: Shape, visitor: Visitor, parent?: Shape) {
    let beginVisitFn: any = (visitor as Visitor)[`beginVisit${object.type}`];

    if (!beginVisitFn) {
        beginVisitFn = visitor.beginVisitShape && visitor.beginVisitShape;
    }

    if (beginVisitFn) {
        beginVisitFn.bind(visitor)(object, parent);
    }

    const keys = Object.keys(object);
    keys.forEach((key) => {
        if (metaNodes.includes(key)) {
            return;
        }

        const childShape = (object as Shape)[key] as Shape;
        if (Array.isArray(childShape)) {
            childShape.forEach((subShape) => {
                if (!subShape.kind) {
                    return;
                }

                traversNode(subShape, visitor, object);
            });
            return;
        }

        if (!childShape.type) {
            return;
        }

        traversNode(childShape, visitor, object);
    });

    let endVisitFn: any = (visitor as Visitor)[`endVisit${object.type}`];
    if (!endVisitFn) {
        endVisitFn = visitor.endVisitShape && visitor.endVisitShape;
    }

    if (endVisitFn) {
        endVisitFn.bind(visitor)(object, parent);
    }
}