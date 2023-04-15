import {DisplayObject} from "pixi.js";
import {PixiEvents} from "../PIXI/PixiEvents";
import {PixiContainer} from "../PIXI/pixiComponents/PixiContainer";

export class AbstractView
{
    public _container: PixiContainer;
    public name: string

    constructor(name: string)
    {
        this._container = new PixiContainer(name);
        this.name = name;
        this._container.visible = false;

    }

    public setVisible(value: boolean)
    {
        this._container.visible = value;
    }

    public addChild(child: DisplayObject): void
    {
        this._container.addChild(child);
        this._container.sortChildren();
    }

    public removeChild(child: DisplayObject): void
    {
        this._container.removeChild(child);
    }


    public registerListener(element: DisplayObject, event: PixiEvents, listener: Function)
    {
        if (element.listeners(event).length > 0) {
            return;
        }
        element.addEventListener(event, listener.bind(this));
    }

    public unregisterListener(element: DisplayObject, event: PixiEvents, listener: Function)
    {
        if (element.listeners(event).length == 0) {
            return;
        }
        element.removeListener(event, listener.bind(this));
    }
}