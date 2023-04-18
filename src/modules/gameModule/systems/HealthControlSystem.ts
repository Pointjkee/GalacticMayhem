import {System} from "./AbstractSystem";
import {ECSEngine} from "../ECSEngine";
import {ECSEntity} from "../entities/ECSEntity";
import {HealthPointsComponent} from "../components/HealthPointsComponent";
import {HealthBarComponent} from "../components/HealthBarComponent";

export class HealthControlSystem extends System
{
    constructor(public engine: ECSEngine)
    {
        super(["HealthPoints"], engine);
    }

    public onEntityAdded(entity: ECSEntity)
    {
        super.onEntityAdded(entity);
        this.addEntity(entity);
    }

    public update(deltaTime: number): void
    {
        this.entities.forEach((entity) =>
        {
            //добавить логику дамага при столкновении и уменьшение hp, и в healthBare тоже
            const healthComponent = entity.getComponent<HealthPointsComponent>("HealthPoints");
            if (healthComponent) {
                const hp = healthComponent.hp;
                const barComponent = entity.getComponent<HealthBarComponent>("HealthBar");
                if (barComponent) {
                    barComponent.progress(hp / 100);
                }
                if (hp === 0) {
                    this.removeEntity(entity);
                }
            }
        })
    }
}