import {AbstractComponent} from "./AbstractComponent";
import {Assets, Graphics, Sprite} from "pixi.js";
import {Application} from "../../../index";

export class HealthBarComponent extends AbstractComponent
{
    private _mask: Graphics;

    constructor()
    {
        super();
        this.name = "HealthBar";

        this.init();
    }

    private init(): void
    {
        const barLineTexture = Assets.get("barLine");
        const line = Sprite.from(barLineTexture);
        line.x = 232;
        line.y = 74;
        line.anchor.set(0.5);
        line.width = 220;
        line.height = 14;

        const barTexture = Assets.get("bar");
        const bar = Sprite.from(barTexture);
        bar.width = 300;
        bar.height = 60;
        bar.x = 200;
        bar.y = 70;
        bar.anchor.set(0.5);

        this._mask = new Graphics();
        this._mask.beginFill(0xFFFFFF);

        this._mask.drawRect(0, 0, 60, 4);
        this._mask.endFill();
        this._mask.position.set(-30, -2)
        line.mask = this._mask;

        const window = Application.windowsManager.getWindow("GameView");
        window?.addChild(line);
        window?.addChild(bar);
        line.addChild(this._mask);
    }

    public progress(value: number)
    {
        this._mask.width = 60 * value;
    }
}