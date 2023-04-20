import {AbstractComponent} from "./AbstractComponent";

export class HealthPointsComponent extends AbstractComponent
{
    private _hp: number;

    constructor(hp: number)
    {
        super();
        this.name = "HealthPoints";
        this._hp = hp;
    }

    public damage(value: number): number
    {
        this._hp =  this._hp - value <= 0 ? 0 : this._hp - value;
        return this._hp;
    }

    public get hp(): number
    {
        return this._hp
    }
}