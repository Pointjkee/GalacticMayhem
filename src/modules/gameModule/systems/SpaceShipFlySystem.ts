import {System} from "./AbstractSystem";
import {VelocityComponent} from "../components/VelocityComponent";
import {PositionComponent} from "../components/PositionComponent";
import {SpaceShipControlComponent} from "../components/SpaceShipControlComponent";
import {SpriteComponent} from "../components/SpriteComponent";
import {ECSEngine} from "../ECSEngine";
import {EntitiesFactory} from "../factory/EntitiesFactory";
import {PIXIS} from "../../../index";
import {ECSEntity} from "../entities/ECSEntity";

export class SpaceShipFlySystem extends System
{
    private onKeyDown: (event: KeyboardEvent) => void;
    private onKeyUp: (event: KeyboardEvent) => void;

    constructor(public engine: ECSEngine)
    {
        super(["Position", "Velocity", "ShipControl", "Sprite"], engine);

        this.onKeyDown = (event: KeyboardEvent) =>
        {
            this.handleKeyDown(event);
        };

        this.onKeyUp = (event: KeyboardEvent) =>
        {
            this.handleKeyUp(event);
        };

        window.addEventListener("keydown", this.onKeyDown);
        window.addEventListener("keyup", this.onKeyUp);
    }

    public onEntityAdded(entity: ECSEntity)
    {
        super.onEntityAdded(entity);
        this.addEntity(entity);
        if (entity.hasComponent("ShipControl")) {
            entity.getComponent<SpriteComponent>("Sprite").sprite.zIndex = 10;
        }
    }

    public update(deltaTime: number): void
    {
        this.entities.forEach((entity) =>
            {
                const position = entity.getComponent<PositionComponent>("Position");
                const velocity = entity.getComponent<VelocityComponent>("Velocity");
                const shipControl = entity.getComponent<SpaceShipControlComponent>("ShipControl");
                const sprite = entity.getComponent<SpriteComponent>("Sprite").sprite;

                position.x += velocity.x * shipControl.speed * deltaTime;
                position.y += velocity.y * shipControl.speed * deltaTime;

                // Определяем границы спрайта
                const halfWidth = sprite.width / 2;
                const halfHeight = sprite.height / 2;
                const minX = halfWidth;
                const maxX = PIXIS.windowWidth - halfWidth;
                const minY = halfHeight;
                const maxY = PIXIS.windowHeight - halfHeight;

                // Ограничиваем перемещение спрайта, если его координаты выходят за пределы экрана
                if (position.x < minX) {
                    position.x = minX;
                } else if (position.x > maxX) {
                    position.x = maxX;
                }

                if (position.y < minY) {
                    position.y = minY;
                } else if (position.y > maxY) {
                    position.y = maxY;
                }


                //Обновляем позицию спрайта
                sprite.x = position.x;
                sprite.y = position.y;
            }
        )
    }


    private handleKeyDown(event: KeyboardEvent): void
    {
        if (event.code === "Space") {
            this.shoot();
        }
        this.setVelocity(event, true);
    }

    private shoot(): void
    {
        this.entities.forEach(entity =>
        {
            if (entity.hasComponent("ShipControl")) {
                const bullet = EntitiesFactory.createBullet(entity.getComponent<PositionComponent>("Position"))
                this.engine.addEntity(bullet)
            }
        })

    }

    private handleKeyUp(event: KeyboardEvent): void
    {
        this.setVelocity(event, false);
    }

    private setVelocity(event: KeyboardEvent, isKeyDown: boolean): void
    {
        this.entities.forEach((entity) =>
        {
            const velocity = entity.getComponent<VelocityComponent>("Velocity");

            switch (event.key) {
                case "w":
                    velocity.y = isKeyDown ? -1 : 0;
                    break;
                case "s":
                    velocity.y = isKeyDown ? 1 : 0;
                    break;
                case "a":
                    velocity.x = isKeyDown ? -1 : 0;
                    break;
                case "d":
                    velocity.x = isKeyDown ? 1 : 0;
                    break;
            }
        })
    }
}