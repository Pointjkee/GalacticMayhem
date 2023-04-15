import {AbstractView} from "../../../core/AbstractView";
import {GameModel, GameModelEvent} from "../models/GameModel";
import {PIXIS} from "../../../index";
import {Graphics} from "pixi.js";

export class GameView extends AbstractView
{
    private _model: GameModel;

    constructor(name: string, model: GameModel)
    {
        super(name);
        this._model = model;

        this.initialize()
    }

    private initialize(): void
    {
        this._model.addEventListener(GameModelEvent.START, this.start.bind(this));
    }

    private start(): void
    {
        this._container.visible = true;
        const graphics = new Graphics();
        graphics.beginFill(0x000000);
        graphics.drawRect(0, 0, PIXIS.windowWidth, PIXIS.windowHeight);
        graphics.endFill();
        this._container.addChild(graphics);
    }
}