export abstract class AbstractModule<T>
{
    protected _model: T

    public abstract init(): void

    public abstract get model(): T
}