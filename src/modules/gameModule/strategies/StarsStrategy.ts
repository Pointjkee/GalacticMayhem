import {Strategy} from "./Strategy";
import {ECSEngine} from "../ECSEngine";
import {EntitiesFactory} from "../factory/EntitiesFactory";
import {Utils} from "../../../utils/Utils";

export class StarsStrategy extends Strategy
{
    private _starsTimeoutId: NodeJS.Timeout | null = null;

    constructor(public engine: ECSEngine)
    {
        super();
    }

    public start(): void
    {
        const createStar = () =>
        {
            this.engine.addEntity(EntitiesFactory.createStar());
            const interval = Utils.getRandomNumberInRange(50, 300);
            this._starsTimeoutId = setTimeout(createStar, interval);
        };
        const interval = Utils.getRandomNumberInRange(0, 1);
        this._starsTimeoutId = setTimeout(createStar, interval);
    }

    public stop(): void
    {
        if (this._starsTimeoutId) {
            clearTimeout(this._starsTimeoutId);
            this._starsTimeoutId = null;
        }
    }
}