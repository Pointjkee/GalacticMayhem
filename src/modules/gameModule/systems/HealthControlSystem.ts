import {System} from "./AbstractSystem";
import {ECSEngine} from "../ECSEngine";
import { ECSEntity } from "../entities/ECSEntity";

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
        })
    }
}