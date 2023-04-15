import {ECSEngine} from "../ECSEngine";
import {Strategy} from "./Strategy";
import {MeteorStrategy} from "./MeteorStrategy";
import {StarsStrategy} from "./StarsStrategy";

export class Strategies
{
    private _allStrategies: Strategy[] = [];

    constructor(engine: ECSEngine)
    {
        this._allStrategies.push(new MeteorStrategy(engine));
        this._allStrategies.push(new StarsStrategy(engine));
    }

    public start(): void
    {
        this._allStrategies.forEach(strategy => strategy.start());
    }

    public stop(): void
    {
        this._allStrategies.forEach(strategy => strategy.stop());
    }
}