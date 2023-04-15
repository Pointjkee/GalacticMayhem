import {System} from "./AbstractSystem";
import {BulletComponent} from "../components/BulletComponent";
import {ECSEngine} from "../ECSEngine";
import {SpriteComponent} from "../components/SpriteComponent";
import {PositionComponent} from "../components/PositionComponent";
import {PIXIS} from "../../../index";
import {ECSEntity} from "../entities/ECSEntity";

export class BulletSystem extends System
{
    constructor(engine: ECSEngine)
    {
        super(["Bullet", "Sprite", "Position"], engine);
    }

    public onEntityAdded(entity: ECSEntity)
    {
        super.onEntityAdded(entity);
        this.addEntity(entity);
        if (entity.hasComponent("Bullet")) {
            const position = entity.getComponent<PositionComponent>("Position");
            const sprite = entity.getComponent<SpriteComponent>("Sprite").sprite;
            sprite.x = position.x;
            sprite.y = position.y;
            sprite.zIndex = 5;
        }
    }

    public update(deltaTime: number): void
    {
        this.entities.forEach((entity) =>
        {
            const bullet = entity.getComponent<BulletComponent>("Bullet");
            const sprite = entity.getComponent<SpriteComponent>("Sprite").sprite;
            sprite.y -= bullet.speed * deltaTime;

            // Удаление пули при выходе за пределы игрового поля
            if (sprite.y < -sprite.height || sprite.y > PIXIS.windowHeight + sprite.height) {
                this.removeEntity(entity);
            }
        });
    }
}