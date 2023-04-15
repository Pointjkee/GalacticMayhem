import {System} from "./AbstractSystem";
import {ECSEngine} from "../ECSEngine";
import {ECSEntity} from "../entities/ECSEntity";
import {SpriteComponent} from "../components/SpriteComponent";

export class CollisionSystem extends System
{
    private _arrayEntities: ECSEntity[] = [];

    constructor(public engine: ECSEngine)
    {
        super(["HealthPoints"], engine);
    }

    public onEntityAdded(entity: ECSEntity): void
    {
        super.onEntityAdded(entity);
        this.addEntity(entity);
        if (entity.hasComponent("HealthPoints") && !entity.hasComponent("HealthBar")) {
            this._arrayEntities.push(entity);
        }

    }

    public update(deltaTime: number): void
    {
        for (let i = 0; i < this._arrayEntities.length - 1; i++) {
            const entityA = this._arrayEntities[i];
            const spriteA = entityA.getComponent<SpriteComponent>("Sprite").sprite;
            const bounds1 = spriteA.getBounds();
            for (let j = i + 1; j < this._arrayEntities.length; j++) {
                const entityB = this._arrayEntities[j];
                const spriteB = entityB.getComponent<SpriteComponent>("Sprite").sprite;
                const bounds2 = spriteB.getBounds();

                if (
                    bounds1.x < bounds2.x + bounds2.width
                    && bounds1.x + bounds1.width > bounds2.x
                    && bounds1.y < bounds2.y + bounds2.height
                    && bounds1.y + bounds1.height > bounds2.y
                ) {
                    if (entityA.hasComponent("Meteor")) {
                        this.removeEntity(entityA);
                        this._arrayEntities.splice(i, 1);
                    } else if (entityB.hasComponent("Meteor")) {
                        this.removeEntity(entityB)
                        this._arrayEntities.splice(j, 1);
                    }
                }
            }
        }
    }
}