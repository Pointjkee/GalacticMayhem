export class Utils
{
    public static _id = 0;

    public static getRandomNumberInRange(min: number, max: number): number
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static generateId(): number
    {
        return this._id++
    }

    public static resetId(): void
    {
        this._id = 0;
    }
}