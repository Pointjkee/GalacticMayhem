import {AbstractView} from "../../../core/AbstractView";
import {GameModel, GameModelEvent} from "../models/GameModel";
import {PIXIS} from "../../../index";
import {Assets, Sprite} from "pixi.js";

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
        const texture = Assets.get("void");
        const image = new Sprite(texture);
        image.width = PIXIS.windowWidth
        this._container.addChild(image);
    }
}