import {System} from "./AbstractSystem";
import {ECSEngine} from "../ECSEngine";
import {PositionComponent} from "../components/PositionComponent";
import {SpriteComponent} from "../components/SpriteComponent";
import {PIXIS} from "../../../index";
import {StarComponent} from "../components/StarComponent";
import {ECSEntity} from "../entities/ECSEntity";

export class StarsSystem extends System
{
    constructor(public engine: ECSEngine)
    {
        super(["Position", "Velocity", "Star", "Sprite"], engine);
    }

    public onEntityAdded(entity: ECSEntity)
    {
        super.onEntityAdded(entity);
        this.addEntity(entity);
        if (entity.hasComponent("Star")) {
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
            const star = entity.getComponent<StarComponent>("Star");
            const sprite = entity.getComponent<SpriteComponent>("Sprite").sprite;
            sprite.y += star.speed * deltaTime;

            if (sprite.y > PIXIS.windowHeight + sprite.height) {
                this.removeEntity(entity);
            }
        })
    }
}