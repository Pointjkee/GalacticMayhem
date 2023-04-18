import {System} from "./AbstractSystem";
import {ECSEngine} from "../ECSEngine";
import {ECSEntity} from "../entities/ECSEntity";
import {SpriteComponent} from "../components/SpriteComponent";
import {Point} from "pixi.js";
import * as p2 from "p2";
import {CollisionComponent} from "../components/CollisionComponent";
import {HealthPointsComponent} from "../components/HealthPointsComponent";

export class CollisionSystem extends System
{
    private _arrayEntities: ECSEntity[] = [];
    private _count = 0;
    private _mapCollisions = new Map<number, ECSEntity>();

    constructor(public engine: ECSEngine)
    {
        super(["Collision"], engine);
    }

    public onEntityAdded(entity: ECSEntity): void
    {
        super.onEntityAdded(entity);
        this.addEntity(entity);
        const body = entity.getComponent<CollisionComponent>("Collision")?.body ;
        if (body) {
            this._arrayEntities.push(entity);
            this.engine.p2World.addBody(body);
            this._mapCollisions.set(body.id, entity)

            //костылёк
            this._count++
            if (this._count === 1) {
                this.engine.p2World.on('beginContact', this.contactSprites.bind(this));
            }
        }
    }

    private contactSprites(event: p2Event): void
    {
        const entityA = this._mapCollisions.get(event.bodyA.id);
        const entityB = this._mapCollisions.get(event.bodyB.id);
        const healthComponentA = entityA.getComponent<HealthPointsComponent>("HealthPoints");
        healthComponentA.damage(20);
        const healthComponentB = entityB.getComponent<HealthPointsComponent>("HealthPoints");
        healthComponentB.damage(20);
    }


    public update(deltaTime: number): void
    {
        this._arrayEntities.forEach(entity =>
        {
            const {body} = entity.getComponent<CollisionComponent>("Collision");
            const sprite = entity.getComponent<SpriteComponent>("Sprite").sprite;
            body.position[0] = sprite.x + sprite.width / 2;
            body.position[1] = sprite.y - sprite.height / 2;
        })
    }
}

export type p2Event = {
    contactEquations: p2.ContactEquation[];
    bodyA: p2.Body;
    bodyB: p2.Body;
    shapeA: p2.Convex;
    shapeB: p2.Convex;
    target: p2.World;
    type: string;
}