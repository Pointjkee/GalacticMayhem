import {AbstractComponent} from "./AbstractComponent";

export class VelocityComponent extends AbstractComponent
{
public x: number;
public y: number;

    constructor(x: number, y: number)
    {
        super()
        this.name = "Velocity"
        this.x = x;
        this.y = y;
    }
}