import React, {ReactNode} from "react"
import {Circle} from "../../definitions/Definitions";
import {getComponent, getComponents, traversShape} from "../../utils/utils";
import { visitor as InitVisitor } from "../../visitors/InitVisitor";
import { visitor as SizingVisitor } from "../../visitors/SizingVisitor";
import { visitor as PositioningVisitor } from "../../visitors/PositioningVisitor";

import './styles.css';

export function MainContainer() {

    const model: Circle = { type: "Circle", name: "circle1", children: [
            {name: "square1", type: "Square"},
            {name: "square2", type: "Square", children: [{name: "triangle1", type: "Triangle"}]}
        ]};

    traversShape(model, InitVisitor);
    traversShape(model, SizingVisitor);
    traversShape(model, PositioningVisitor);
    const mainComp: ReactNode = getComponent(model);
    const subComp: ReactNode[] = getComponents(model.children);

    return (
        <div className={'container-component'}>
            <svg width="1000" height="1000">
                {mainComp}
                {subComp}
            </svg>
        </div>
    )

}
