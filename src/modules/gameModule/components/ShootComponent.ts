import {AbstractComponent} from "./AbstractComponent";

export class ShootComponent extends AbstractComponent
{
    private _interval: number;

    constructor(interval: number)
    {
        super();
        this.name = "Shoot";
        this._interval = interval;
    }

    public set interval(value: number)
    {
        this._interval = value;
    }

    public get interval(): number
    {
        return this._interval;
    }
}