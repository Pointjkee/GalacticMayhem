import {EventDispatcher} from "../../../core/EventDispatcher";
import {MainModel, MainModelEvent} from "../../main/models/MainModel";

export enum MenuModelEvent
{
    INIT = "init"
}

export class MenuModel extends EventDispatcher
{
    constructor(gameModel: MainModel)
    {
        super();
        gameModel.addEventListener(MainModelEvent.INITED, this.init.bind(this));
    }

    private init(): void
    {
        this.dispatchEvent(MenuModelEvent.INIT);
    }
}