import {Assets, Sprite} from "pixi.js";
import {AbstractComponent} from "./AbstractComponent";
import {Application} from "../../../index";
import {AbstractView} from "../../../core/AbstractView";

export class SpriteComponent extends AbstractComponent
{
    private _sprite: Sprite;
    private _window: AbstractView | undefined

    constructor(name: string)
    {
        super();
        this.name = "Sprite";
        const texture = Assets.get(name);
        this._sprite = Sprite.from(texture);
        this._sprite.anchor.set(0.5);

        this._window = Application.windowsManager.getWindow("GameView");
        this._window?.addChild(this._sprite);
    }

    public get sprite(): Sprite
    {
        return this._sprite;
    }

    public removeSprite(): void
    {
        this._window?.removeChild(this._sprite);
    }
}