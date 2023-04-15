import {AbstractModule} from "../../core/AbstractModule";
import {WindowManager} from "../../PIXI/windowsManager/WindowManager";
import {MenuView} from "./view/MenuView";
import {MenuModel} from "./model/MenuModel";
import {MainModel} from "../main/models/MainModel";

export class MenuModule extends AbstractModule<MenuModel>
{
    private _windowsManager: WindowManager;
    protected _model: MenuModel;

    constructor(manager: WindowManager, MainModel: MainModel)
    {
        super();
        this._windowsManager = manager;
        this._model = new MenuModel(MainModel);
    }

    public init(): void
    {
        this._windowsManager.connect(MenuView, this._model);
    }

    public get model(): MenuModel
    {
        return this._model;
    }
}