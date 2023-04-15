import {System} from "./AbstractSystem";
import {ECSEngine} from "../ECSEngine";
import {ECSEntity} from "../entities/ECSEntity";
import {StarComponent} from "../components/StarComponent";
import {SpriteComponent} from "../components/SpriteComponent";
import {PIXIS} from "../../../index";
import {PositionComponent} from "../components/PositionComponent";

export class MeteorSystem extends System
{
    constructor(public engine: ECSEngine)
    {
        super(["Meteor", "Sprite", "Velocity", "Position", "HealthPoints"], engine);
    }

    public onEntityAdded(entity: ECSEntity): void
    {
        super.onEntityAdded(entity);
        this.addEntity(entity);
        if (entity.hasComponent("Meteor")) {
            const position = entity.getComponent<PositionComponent>("Position");
            const sprite = entity.getComponent<SpriteComponent>("Sprite").sprite;
            sprite.x = position.x;
            sprite.y = position.y;
        }
    }

    public update(deltaTime: number): void
    {
        this.entities.forEach((entity) =>
        {
            const meteor = entity.getComponent<StarComponent>("Meteor");
            const sprite = entity.getComponent<SpriteComponent>("Sprite").sprite;
            sprite.y += meteor.speed * deltaTime;

            if (sprite.y > PIXIS.windowHeight + sprite.height) {
                this.removeEntity(entity);
            }
        })
    }
}