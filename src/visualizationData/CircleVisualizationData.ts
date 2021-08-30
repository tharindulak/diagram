import {VisualizationData} from "./VisualizationData";
import {SimpleBBox} from "./SimpleBBox";

export class CircleVisualizationData extends VisualizationData {
    lifeline?: SimpleBBox = new SimpleBBox();
}
