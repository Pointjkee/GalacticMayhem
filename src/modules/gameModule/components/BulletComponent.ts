import {AbstractComponent} from "./AbstractComponent";

export class BulletComponent extends AbstractComponent
{
    public speed: number;

    constructor(speed: number)
    {
        super();
        this.name = "Bullet";
        this.speed = speed;
    }
}