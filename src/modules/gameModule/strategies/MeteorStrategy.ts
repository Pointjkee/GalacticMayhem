import {ECSEngine} from "../ECSEngine";
import {Strategy} from "./Strategy";

export class MeteorStrategy extends Strategy
{
    constructor(public engine: ECSEngine)
    {
        super();
    }

    public start(): void
    {

    }

    public stop(): void
    {

    }
}