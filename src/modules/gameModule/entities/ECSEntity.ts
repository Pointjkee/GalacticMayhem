import {AbstractComponent} from "../components/AbstractComponent";

export class ECSEntity
{
    id: number = 0;
    components: Map<string, AbstractComponent>;

    constructor(id?: number)
    {
        this.id = id ?? 0;
        this.components = new Map();
    }

    public addComponent(component: AbstractComponent): AbstractComponent
    {
        this.components.set(component.name, component);
        return component;
    }

    public removeComponent(componentName: string): void
    {
        this.components.delete(componentName);
    }

    public getComponent<T extends AbstractComponent>(componentName: string): T
    {
        return this.components.get(componentName) as T;
    }

    public hasComponent(componentName: string): boolean
    {
        return this.components.has(componentName);
    }
}