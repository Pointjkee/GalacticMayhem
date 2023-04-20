import {System} from "./AbstractSystem";
import {ECSEngine} from "../ECSEngine";
import {EntitiesFactory} from "../factory/EntitiesFactory";
import {PositionComponent} from "../components/PositionComponent";
import {ECSEntity} from "../entities/ECSEntity";
import {ShootComponent} from "../components/ShootComponent";

export class ShootSystem extends System
{
    private _lastShotTime: number = 0;
    private onKeyDown: (event: KeyboardEvent) => void;
    private _intervalShoot;

    constructor(public engine: ECSEngine)
    {
        super(["ShipControl", "Shoot"], engine);

        this.onKeyDown = (event: KeyboardEvent) =>
        {
            this.handleKeyDown(event);
        };
        window.addEventListener("keydown", this.onKeyDown);
    }

    public onEntityAdded(entity: ECSEntity)
    {
        super.onEntityAdded(entity);
        this.addEntity(entity);
        const shootComponent = entity.getComponent("Shoot") as ShootComponent;
        if (shootComponent) {
            this._intervalShoot = shootComponent.interval;
        }
    }

    private handleKeyDown(event: KeyboardEvent): void
    {
        const now = Date.now();
        if (event.code === "Space" && now - this._lastShotTime >= this._intervalShoot) {
            this.shoot();
            this._lastShotTime = now;
        }
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

    public update(deltaTime: number): void
    {

    }
}