import {AbstractComponent} from "./AbstractComponent";

export class MeteorComponent extends AbstractComponent
{
    public speed: number;

    constructor(speed: number)
    {
        super();
        this.name = "Meteor";
        this.speed = speed;
    }
}