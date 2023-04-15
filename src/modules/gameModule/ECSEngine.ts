import {ECSSystem, System} from "./systems/AbstractSystem";
import {BulletSystem} from "./systems/BulletSystem";
import {SpaceShipFlySystem} from "./systems/SpaceShipFlySystem";
import {ECSEntity} from "./ECSEntity";
import {Ticker} from "pixi.js";
import {StarsSystem} from "./systems/StarsSystem";
import {HealthControlSystem} from "./systems/HealthControlSystem";


export interface EngineEntityListener
{
    onEntityAdded(entity: ECSEntity): void;

    onEntityRemoved(entity: ECSEntity): void;
}

export class ECSEngine
{
    private _systems: System[];
    private _stopped = true;
    private _entities: ECSEntity[] = [];
    private readonly _entityListeners: EngineEntityListener[] = [];

    constructor()
    {
        this._systems = this.createSystemsInstances();

    }

    private createSystemsList(): ECSSystem[]
    {
        const result = [
            BulletSystem,
            SpaceShipFlySystem,
            StarsSystem,
            HealthControlSystem,
        ]
        return result;
    }

    public addEntity(entity: ECSEntity): void
    {
        this._entities.push(entity)
        for (let listener of this._entityListeners) {
            listener.onEntityAdded(entity);
        }
    }

    public addEntityListener(listener: EngineEntityListener)
    {
        if (this._entityListeners.indexOf(listener) === -1) {
            this._entityListeners.push(listener);
        }
    }

    private createSystemsInstances(): System[]
    {
        const systems = this.createSystemsList();
        const systemsInstances: System[] = [];
        systems.forEach(systemClass =>
        {
            const system = new systemClass(this);
            system.onAttach(this);
            systemsInstances.push(system);
        })

        return systemsInstances;
    }

    public start(): void
    {
        this._stopped = false;

        const ticker = new Ticker();
        ticker.add(this.update.bind(this));
        ticker.start()
    }

    private update(deltaTime: number): void
    {
        if (!this._stopped) {
            this._systems.forEach(system => system.update(deltaTime));
        }

    }

    public get stopped(): boolean
    {
        return this._stopped;
    }

    public set stopped(value: boolean)
    {
        this._stopped = value;
    }
}