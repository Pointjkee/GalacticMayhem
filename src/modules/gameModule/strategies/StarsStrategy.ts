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
        this._starsTimeoutId = setTimeout(() =>
        {
            this.createStar();
        }, 500);
    }

    private createStar(): void
    {
        this.engine.addEntity(EntitiesFactory.createStar());
        const interval = Utils.getRandomNumberInRange(50, 300);
        this._starsTimeoutId = setTimeout((() =>
        {
            this.createStar()
        }), interval);
    }

    public stop(): void
    {
        if (this._starsTimeoutId) {
            clearTimeout(this._starsTimeoutId);
            this._starsTimeoutId = null;
        }
    }
}