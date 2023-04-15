import {Application, DisplayObject} from "pixi.js";
import {Resources} from "../../core/Resources";

export class PixiEngine
{
    private readonly _app: Application;
    private readonly _resource: Resources;

    constructor(width: number = 600, height: number = 400, backgroundColor: number = 0xd3d3d3, resource: Resources)
    {
        this._app = new Application({
            width,
            height,
            antialias: true,
            backgroundColor
        });

        (globalThis as any).__PIXI_APP__ = this._app;
        (globalThis as any).__PIXI_RENDERER__ = this._app.renderer;

        this._resource = resource

        this._app.renderer.render(this._app.stage);

        document.body.appendChild(this._app.view as HTMLCanvasElement);
    }

    public get resource(): Resources
    {
        return this._resource
    }

    public start(): void
    {
        this._app.ticker.add(() =>
        {
            this._app.renderer.render(this._app.stage);
        });
        this._app.ticker.start();
    }

    public getApp(): Application
    {
        return this._app;
    }

    public add(element: DisplayObject): void
    {
        this._app.stage.addChild(element);
    }

    public remove(element: DisplayObject): void
    {
        element.destroy({children: true});
    }

    public get windowHeight(): number
    {
        return this._app.renderer.height;
    }

    public get windowWidth(): number
    {
        return this._app.renderer.width;
    }
}