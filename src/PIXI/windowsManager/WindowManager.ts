import {AbstractView} from "../../core/AbstractView";
import {EventDispatcher} from "../../core/EventDispatcher";
import {PixiEngine} from "../pixiEngine/PixiEngine";

export class WindowManager
{
    private _windows: AbstractView[] = [];

    constructor(private engine: PixiEngine)
    {
    }

    //Соединяем view с моделью
    public connect<T extends EventDispatcher, V extends new (name: string, model: T) => any>(view: V, model: T): void
    {
        (async () => {
            const window = new view(view.name, model);
            this.addWindow(window);
        })();
    }

    public addWindow(window: AbstractView): void
    {
        this._windows.push(window);
        this.engine.add(window._container)
    }

    public removeWindow(window: AbstractView): void
    {
        const index = this._windows.indexOf(window);
        if (index !== -1) {
            this._windows.splice(index, 1);
            this.engine.remove(window._container);
        }
    }

    public getWindow(name: string): AbstractView | undefined
    {
        return this._windows.find(window => window.name === name)
    }

}