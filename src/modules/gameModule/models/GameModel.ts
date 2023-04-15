import {EventDispatcher} from "../../../core/EventDispatcher";
import {ECSEngine} from "../ECSEngine";
import {EntitiesFactory} from "../factory/EntitiesFactory";
import {Strategies} from "../strategies/Strategies";

export enum GameModelEvent
{
    START = "start"
}

export class GameModel extends EventDispatcher
{
    private readonly _ECSEngine: ECSEngine;
    private _strategies: Strategies;

    constructor()
    {
        super();
        this._ECSEngine = new ECSEngine();

        this._strategies = new Strategies(this._ECSEngine);
    }

    public start(): void
    {
        this.dispatchEvent(GameModelEvent.START)
        this._ECSEngine.start();
        this._strategies.start();
        this._ECSEngine.addEntity(EntitiesFactory.createSpaceShip());
        this._ECSEngine.addEntity(EntitiesFactory.createHeathBar());
    }
}