import {EventDispatcher} from "../../../core/EventDispatcher";
import {WindowManager} from "../../../PIXI/windowsManager/WindowManager";
import {PixiEngine} from "../../../PIXI/pixiEngine/PixiEngine";

export enum MainModelEvent
{
    INITED = "inited"
}

export class MainModel extends EventDispatcher
{
    private readonly _windowsManager: WindowManager;

    constructor(public engine: PixiEngine)
    {
        super()
        this._windowsManager = new WindowManager(engine);
    }

    public inited(): void
    {
        this.dispatchEvent(MainModelEvent.INITED);
    }

    public get windowsManager(): WindowManager
    {
        return this._windowsManager;
    }
}