import {AbstractView} from "../../../core/AbstractView";
import {MenuModel, MenuModelEvent} from "../model/MenuModel";
import {Application, PIXIS} from "../../../index";
import {Graphics, Text, TextStyle} from "pixi.js";
import {PixiEvents} from "../../../PIXI/PixiEvents";

export class MenuView extends AbstractView
{
    private _model: MenuModel

    constructor(name: string, model: MenuModel)
    {
        super(name);
        this._model = model;
        this._model.addEventListener(MenuModelEvent.INIT, this.init.bind(this));
        this.initialize()
    }

    private initialize(): void
    {
        PIXIS.add(this._container);
        const graphics = new Graphics();
        graphics.beginFill(0xffffff);
        graphics.drawRoundedRect(-200, -300, 400, 600, 10);
        graphics.endFill();
        graphics.x = PIXIS.windowWidth / 2;
        graphics.y = PIXIS.windowHeight / 2;
        this._container.addChild(graphics);

        const style = new TextStyle({
            fontFamily: "Arial Black",
            fontSize: 32,
            fontVariant: "small-caps",
            fontWeight: "bold",
            letterSpacing: 3,
            lineJoin: "bevel",
            stroke: "#ff0000",
            strokeThickness: 2
        });

        const startText = new Text("Start game", style)
        startText.anchor.set(0.5)
        startText.interactive = true;
        startText.on("mouseover", () =>
        {
            startText.cursor = "pointer";
        });

        this.registerListener(startText, PixiEvents.CLICK, this.startGame.bind(this));

        graphics.addChild(startText)
    }

    private startGame(): void
    {
        this._container.visible = false;
        Application.model.GameModel?.start();
    }


    private init(): void
    {
        this._container.visible = true;
    }
}