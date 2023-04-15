import {AbstractComponent} from "./AbstractComponent";

export class StarComponent extends AbstractComponent
{
    public speed: number;

    constructor(speed: number)
    {
        super();
        this.name = "Star";
        this.speed = speed;
    }
}