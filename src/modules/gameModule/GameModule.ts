import {AbstractModule} from "../../core/AbstractModule";
import {WindowManager} from "../../PIXI/windowsManager/WindowManager";
import {GameView} from "./view/GameView";
import {GameModel} from "./models/GameModel";

export class GameModule extends AbstractModule<GameModel>
{
    private _windowsManager: WindowManager;
    protected _model: GameModel;

    constructor(manager: WindowManager)
    {
        super();
        this._windowsManager = manager;
        this._model = new GameModel();
    }

    public init(): void
    {
        this._windowsManager.connect(GameView, this._model);
    }

    public get model(): GameModel
    {
        return this._model;
    }
}