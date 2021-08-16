export interface BBox {
    x: number;
    y: number;
    height: number;
    width: number;
}

export interface Shape {
    name: string;
    type: string;
    visualizationData: BBox;
}

export interface Triangle extends Shape {
}

export interface Square extends Shape {
    children: Triangle[];
}

export interface Circle extends Shape {
    children: Square[];
}