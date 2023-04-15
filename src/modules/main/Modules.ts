import {PixiEngine} from "../../PIXI/pixiEngine/PixiEngine";
import {MainView} from "./view/MainView";
import {AbstractModule} from "../../core/AbstractModule";
import {MenuModule} from "../menuModule/MenuModule";
import {GameModule} from "../gameModule/GameModule";
import {MainModel} from "./models/MainModel";
import {WindowManager} from "../../PIXI/windowsManager/WindowManager";
import {MenuModel} from "../menuModule/model/MenuModel";
import {GameModel} from "../gameModule/models/GameModel";

export class Modules
{
    private readonly MainModel: MainModel;
    private readonly MenuModule: MenuModule;
    private readonly GameModule: GameModule;
    private _modules: AbstractModule<any>[] = [];

    private _menuModel: MenuModel;
    private _gameModel: GameModel;

    constructor(engine: PixiEngine)
    {
        this.MainModel = new MainModel(engine);
        this.MenuModule = new MenuModule(this.MainModel.windowsManager, this.MainModel);
        this.GameModule = new GameModule(this.MainModel.windowsManager);

        this._modules.push(this.MenuModule, this.GameModule);

        this.init();
        this.initializeModules();
    }

    public init(): void
    {
        this.MainModel.windowsManager.connect(MainView, this.MainModel);
    }

    private initializeModules(): void
    {
        this._modules.forEach(module =>
        {
            module.init()
            const modelName = module.model.constructor.name;
            this.model = {[modelName]: module.model}
        })
    }

    public get windowsManager(): WindowManager
    {
        return this.MainModel.windowsManager;
    }

    public get model()
    {
        return {
            MenuModel: this._menuModel,
            GameModel: this._gameModel,
        };
    }

    public set model(value: { MenuModel?: MenuModel; GameModel?: GameModel })
    {
        if (value.MenuModel !== undefined) {
            this._menuModel = value.MenuModel;
        }
        if (value.GameModel !== undefined) {
            this._gameModel = value.GameModel;
        }
    }

}