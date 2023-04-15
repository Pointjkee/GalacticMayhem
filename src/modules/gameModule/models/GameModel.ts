import {EventDispatcher} from "../../../core/EventDispatcher";
import {ECSEngine} from "../ECSEngine";
import {EntitiesFactory} from "../factory/EntitiesFactory";
import {Utils} from "../../../utils/Utils";

export enum GameModelEvent
{
    START = "start"
}

export class GameModel extends EventDispatcher
{
    private _ECSEngine: ECSEngine;
    private _starsTimeoutId: NodeJS.Timeout | null = null;

    constructor()
    {
        super();
        this._ECSEngine = new ECSEngine();
    }

    public start(): void
    {
        this.dispatchEvent(GameModelEvent.START)
        this._ECSEngine.start();
        this.starsStrategy();
        this._ECSEngine.addEntity(EntitiesFactory.createSpaceShip())
        this._ECSEngine.addEntity(EntitiesFactory.createHeathBar())
    }

    private starsStrategy(): void
    {
        const createStar = () =>
        {
            this._ECSEngine.addEntity(EntitiesFactory.createStar());
            const interval = Utils.getRandomNumberInRange(50, 300);
            this._starsTimeoutId = setTimeout(createStar, interval);
        };
        const interval = Utils.getRandomNumberInRange(0, 1);
        this._starsTimeoutId = setTimeout(createStar, interval);
    }

    public stopStarsStrategy(): void
    {
        if (this._starsTimeoutId) {
            clearTimeout(this._starsTimeoutId);
            this._starsTimeoutId = null;
        }
    }
}