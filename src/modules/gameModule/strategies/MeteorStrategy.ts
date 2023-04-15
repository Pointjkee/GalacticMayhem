import {ECSEngine} from "../ECSEngine";
import {Strategy} from "./Strategy";
import {EntitiesFactory} from "../factory/EntitiesFactory";
import {Utils} from "../../../utils/Utils";

export class MeteorStrategy extends Strategy
{
    private _meteorsTimeoutId: NodeJS.Timeout | null = null;

    constructor(public engine: ECSEngine)
    {
        super();
    }

    public start(): void
    {
        this._meteorsTimeoutId = setTimeout(() =>
        {
            this.createMeteor();
        }, 500);
    }

    private createMeteor(): void
    {
        this.engine.addEntity(EntitiesFactory.createMeteor());
        const interval = Utils.getRandomNumberInRange(1000, 5000);
        this._meteorsTimeoutId = setTimeout((() =>
        {
            this.createMeteor()
        }), interval);
    }

    public stop(): void
    {
        if (this._meteorsTimeoutId) {
            clearTimeout(this._meteorsTimeoutId);
            this._meteorsTimeoutId = null;
        }
    }
}