import { ReactNode } from "react";
import * as shapeComponents from '../components/Diagram';
import {Shape} from "../definitions/Definitions";
import {Visitor} from "../visitors/BaseVisitor";

const metaNodes = ["visualizationData", "parent"];

export function traversShape(object: Shape, visitor: Visitor, parent?: Shape) {
    let beginVisitFn: any = (visitor as any)[`beginVisit${object.type}`];

    if (!beginVisitFn) {
        beginVisitFn = visitor.beginVisitShape;
    }

    if (beginVisitFn) {
        beginVisitFn.bind(visitor)(object, parent);
    }

    const keys = Object.keys(object);
    keys.forEach((key) => {
        if (metaNodes.includes(key)) {
            return;
        }

        const childShape = (object as any)[key] as Shape;
        if (Array.isArray(childShape)) {
            childShape.forEach((subShape) => {
                if (!subShape.type) {
                    return;
                }

                traversShape(subShape, visitor, object);
            });
            return;
        }

        if (!childShape.type) {
            return;
        }

        traversShape(childShape, visitor, object);
    });

    let endVisitFn: any = (visitor as any)[`endVisit${object.type}`];
    if (!endVisitFn) {
        endVisitFn = visitor.endVisitShape;
    }

    if (endVisitFn) {
        endVisitFn.bind(visitor)(object, parent);
    }
}

export function getComponents(shapeArray: any): ReactNode[] {
    // Convert to array
    if (!(shapeArray instanceof Array)) {
        shapeArray = [shapeArray];
    }

    const children: any = [];
    shapeArray.forEach((shape: any) => {
        const ChildComp = (shapeComponents as any)[shape.type];
        if (!ChildComp) {
        } else {
            children.push(<ChildComp model={shape} />);
        }
    });

    return children;
}

export function getComponent(shape: any): ReactNode {
    const ChildComp = (shapeComponents as any)[shape.type];
    if (!ChildComp) {
    }
    return <ChildComp model={shape} />;
}
