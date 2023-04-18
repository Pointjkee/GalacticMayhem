import {System} from "./AbstractSystem";
import {ECSEngine} from "../ECSEngine";
import {ECSEntity} from "../entities/ECSEntity";
import {SpriteComponent} from "../components/SpriteComponent";
import {Point} from "pixi.js";
import * as p2 from "p2";
import {CollisionComponent} from "../components/CollisionComponent";

export class CollisionSystem extends System
{
    private _arrayEntities: ECSEntity[] = [];
    private _count = 0;

    constructor(public engine: ECSEngine)
    {
        super(["Collision"], engine);
    }

    public onEntityAdded(entity: ECSEntity): void
    {
        super.onEntityAdded(entity);
        this.addEntity(entity);

        const collisionComponent = entity.getComponent("Collision") as CollisionComponent;
        if (collisionComponent) {
            this._arrayEntities.push(entity);
            this.engine.p2World.addBody(collisionComponent.body);
            this.connectBodyAndSprite(entity);

            //костылёк
            this._count++
            if (this._count === 1) {
                this.engine.p2World.on('beginContact', this.contactSprite.bind(this));
            }
        }
    }

    private connectBodyAndSprite(entity: ECSEntity): void
    {

    }


    private contactSprite(event: p2Event): void
    {
        let a = event.bodyA.id;
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