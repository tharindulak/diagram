import {ShapeVisualizationData} from "../visualizationData/ShapeVisualizationData";
import {SimpleBBox} from "../visualizationData/SimpleBBox";
import {VisualizationData} from "../visualizationData/VisualizationData";

export interface BBox {
    x: number;
    y: number;
    height: number;
    width: number;
}

export interface Shape {
    name: string;
    type: string;
    visualizationData?: VisualizationData;
}

export interface Triangle extends Shape {
}

export interface Square extends Shape {
    children?: Triangle[];
}

export interface Circle extends Shape {
    children?: Square[];
}

export interface ViewState {
    bBox?: SimpleBBox;
}
