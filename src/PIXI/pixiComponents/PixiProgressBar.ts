import {Container, Graphics} from "pixi.js";

export class PixiProgressBar
{
    private _progress: number
    private _progressBar: Graphics;
    private _mask: Graphics;
    private _width: number;
    private _container: Container;

    constructor(x: number, y: number, width: number, height: number, radius: number, color: number, container: Container)
    {
        this._container = container;

        const progressBarBackground = new Graphics();
        progressBarBackground.beginFill(0x000000, 0.5);
        progressBarBackground.drawRoundedRect(x, y, width, height, radius);
        progressBarBackground.endFill();

        this._progressBar = new Graphics()
        this._progressBar.beginFill(color);
        this._progressBar.drawRoundedRect(x, y, width, height, radius);
        this._progressBar.endFill();

        this._mask = new Graphics();
        this._mask.beginFill(color, 1);
        this._mask.drawRoundedRect(x, y, width, height, radius);
        this._mask.endFill();

        this._progressBar.mask = this._mask;

        this._width = width;
        this._progress = 0;

        progressBarBackground.addChild(this._progressBar)
        progressBarBackground.addChild(this._mask)
        this._container.addChild(progressBarBackground)

        this.update()
    }

    public get progress(): number
    {
        return this._progress;
    }

    public set progress(value: number)
    {
        this._progress = value;
        this.update()
    }

    private update(): void
    {
        this._mask.width = this._progress * this._width;
    }

    public destroy(): void
    {
        this._container.children.forEach(child =>
        {
            child.destroy();
        })
    }
}