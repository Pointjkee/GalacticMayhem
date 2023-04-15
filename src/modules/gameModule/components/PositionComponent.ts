import {AbstractComponent} from "./AbstractComponent";

export class PositionComponent extends AbstractComponent
{
    public x: number;
    public y: number;

    constructor(x: number, y: number)
    {
        super()
        this.name = "Position";
        this.x = x;
        this.y = y;
    }
}