import {AbstractComponent} from "./AbstractComponent";

export class SpaceShipControlComponent extends AbstractComponent
{
    speed: number;

    constructor(speed: number)
    {
        super()
        this.name = "ShipControl"
        this.speed = speed
    }
}