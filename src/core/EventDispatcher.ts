export class EventDispatcher
{
    private listeners: { [key: string]: Function[] };

    constructor()
    {
        this.listeners = {};
    }

    public addEventListener(eventType: string, listener: Function): void
    {
        if (!this.listeners[eventType]) {
            this.listeners[eventType] = [];
        }

        this.listeners[eventType].push(listener);
    }

    public removeEventListener(eventType: string, listener: Function): void
    {
        if (!this.listeners[eventType]) {
            return;
        }

        const index = this.listeners[eventType].indexOf(listener);

        if (index !== -1) {
            this.listeners[eventType].splice(index, 1);
        }
    }

    public dispatchEvent(eventType: string, ...args: any[]): void
    {
        if (!this.listeners[eventType]) {
            return;
        }

        const listeners = this.listeners[eventType].slice();

        for (const listener of listeners) {
            listener.apply(null, args);
        }
    }
}