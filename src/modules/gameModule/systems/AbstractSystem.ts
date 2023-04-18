import {ECSEngine, EngineEntityListener} from "../ECSEngine";
import {SpriteComponent} from "../components/SpriteComponent";
import {ECSEntity} from "../entities/ECSEntity";
import {CollisionComponent} from "../components/CollisionComponent";

export type ECSSystem = new (engine: ECSEngine) => System;

export abstract class System implements EngineEntityListener
{
    entities: Set<ECSEntity>;
    requiredComponents: Array<string>;
    public engine: ECSEngine;

    constructor(requiredComponents: Array<string>, engine: ECSEngine)
    {
        this.entities = new Set();
        this.requiredComponents = requiredComponents;
        this.engine = engine;
    }

    public onAttach(engine: ECSEngine): void
    {
        engine.addEntityListener(this);
    }

    public onEntityAdded(entity: ECSEntity)
    {

    }

    public onEntityRemoved(entity: ECSEntity)
    {

    }

    public addEntity(entity: ECSEntity): void
    {
        if (this.requiredComponents.every((component) => entity.hasComponent(component))) {
            this.entities.add(entity);
        }
    }

    public removeEntity(entity: ECSEntity): void
    {
        this.entities.delete(entity);
        if (entity.hasComponent("Sprite")) {
            entity.getComponent<SpriteComponent>("Sprite").removeSprite();
        }
        if (entity.hasComponent("Collision")) {
            const body = entity.getComponent<CollisionComponent>("Collision").body;
            this.engine.p2World.removeBody(body);
        }
    }

    public abstract update(deltaTime: number): void;
}