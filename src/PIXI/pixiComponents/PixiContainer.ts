import * as PIXI from 'pixi.js';

export class PixiContainer extends PIXI.Container
{
    private readonly _name: string

    constructor(name: string, width?: number, height?: number)
    {
        super();
        this._name = name;

        width && (this.width = width);
        height && (this.height = height);

        this.pivot.x = this.width / 2;
        this.pivot.y = this.height / 2;
    }

    public get name(): string
    {
        return this._name;
    }

}