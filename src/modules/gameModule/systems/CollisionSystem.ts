import {System} from "./AbstractSystem";
import {ECSEngine} from "../ECSEngine";
import {ECSEntity} from "../entities/ECSEntity";
import {SpriteComponent} from "../components/SpriteComponent";
import {Point} from "pixi.js";
import * as p2 from "p2";
import {CollisionComponent} from "../components/CollisionComponent";
import {HealthPointsComponent} from "../components/HealthPointsComponent";
import {Animations} from "../../../animations/Animations";

export class CollisionSystem extends System
{
    private _arrayEntities: ECSEntity[] = [];
    private _count = 0;
    private _mapCollisions = new Map<number, ECSEntity>();
    private _contacts = new Map();

    constructor(public engine: ECSEngine)
    {
        super(["Collision"], engine);
    }

    public onEntityAdded(entity: ECSEntity): void
    {
        super.onEntityAdded(entity);
        this.addEntity(entity);
        const body = entity.getComponent<CollisionComponent>("Collision")?.body;
        if (body) {
            this._arrayEntities.push(entity);
            this.engine.p2World.addBody(body);
            this._mapCollisions.set(body.id, entity)

            //костылёк
            this._count++
            if (this._count === 1) {
                this.engine.p2World.on('beginContact', this.contactSprites.bind(this));
                this.engine.p2World.on('endContact', this.end.bind(this));
            }
        }
    }

    private contactSprites(event: p2Event): void
    {
        const entityA = this._mapCollisions.get(event.bodyA.id);
        const entityB = this._mapCollisions.get(event.bodyB.id);
        const contactKey = `${event.bodyA.id}-${event.bodyB.id}`;
        if (this._contacts.has(contactKey)) {
            return;
        }
        this._contacts.set(contactKey, true);
        const healthComponentA = entityA.getComponent<HealthPointsComponent>("HealthPoints");
        const hpA = healthComponentA.damage(10);
        const healthComponentB = entityB.getComponent<HealthPointsComponent>("HealthPoints");
        const hpB = healthComponentB.damage(10);

        if (hpA === 0 && entityA.hasComponent("Meteor")) {
            const spriteA = entityA.getComponent<SpriteComponent>("Sprite").sprite;
            Animations.explosion(spriteA);
        }
        if (hpB === 0 && entityB.hasComponent("Meteor")) {
            const spriteB = entityB.getComponent<SpriteComponent>("Sprite").sprite;
            Animations.explosion(spriteB);
        }

        if (hpA === 0 && entityA.hasComponent("ShipControl")) {
            const spriteA = entityA.getComponent<SpriteComponent>("Sprite").sprite;
            Animations.explosion(spriteA);
        }
        if (hpB === 0 && entityB.hasComponent("ShipControl")) {
            const spriteB = entityB.getComponent<SpriteComponent>("Sprite").sprite;
            Animations.explosion1(spriteB);
        }
    }

    private end(event: p2Event): void
    {
        const contactKey = `${event.bodyA.id}-${event.bodyB.id}`;
        this._contacts.delete(contactKey);
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