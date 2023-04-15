import {Assets, Container, Sprite, Text} from "pixi.js";
import {AbstractView} from "../../../core/AbstractView";
import {MainModel} from "../models/MainModel";
import {PixiContainer} from "../../../PIXI/pixiComponents/PixiContainer";
import {PixiProgressBar} from "../../../PIXI/pixiComponents/PixiProgressBar";
import {PIXIS} from "../../../index";

export class MainView extends AbstractView
{

    private _percentText: Text;
    private _animationStartTime: number = 0;
    private _model: MainModel;
    private _bar: PixiProgressBar;

    constructor(name: string, model: MainModel)
    {
        super(name);
        this._model = model;
        this.initialize()

        this._percentText = new Text("0%", {
            fontFamily: "Arial",
            fontSize: 24,
            fill: 0xffffff,
        });
    }

    private async initialize(): Promise<void>
    {
        this.setVisible(true);
        await this.loadBg();
        this.init();
    }

    private async loadBg(): Promise<void>
    {
        const texture = await Assets.get("bg");
        const image = new Sprite(texture);
        image.scale.set(Math.min(PIXIS.windowWidth / texture.width, PIXIS.windowHeight))
        const container = new PixiContainer("bg");
        container.addChild(image);
        this._container.addChild(container)
        this._model.engine.start();
    }

    private init(): void
    {
        const progressBarContainer = new Container();
        this._percentText.anchor.set(0.5);
        this._percentText.position.set(200, 20);
        progressBarContainer.position.set(window.innerWidth / 2 - 200, window.innerHeight / 2 + 300);
        this._container.addChild(progressBarContainer);

        this._bar = new PixiProgressBar(0, 0, 400, 40, 20, 0xf555f, progressBarContainer)
        progressBarContainer.addChild(this._percentText);

        //Для красоты, костыльный лоадинг не зависящий от скорости загрузки ресурсов
        this.animate()
    }

    private animate(): void
    {
        if (this._animationStartTime === 0) {
            this._animationStartTime = Date.now();
        }

        const animationDuration = 1000; // 10 секунд
        const now = Date.now();
        const elapsed = now - this._animationStartTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        const percent = Math.round(progress * 100);

        this._bar.progress = progress;
        this._percentText.text = percent + "%";

        if (progress < 1) {
            requestAnimationFrame(this.animate.bind(this));
        } else {
            this._bar.destroy();
            this._percentText.destroy();
            this._model.inited();
        }
    }
}