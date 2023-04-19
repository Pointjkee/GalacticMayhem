import {Assets} from "pixi.js";

type ArrayTextures = {
    name: string;
    path: string;
}

export class Resources
{
    public async load(): Promise<void>
    {
        let textures: ArrayTextures[] = [
            {name: "bg", path: "../../assets/bg.jpg"},
            {name: "ship", path: "../../assets/ship.png"},
            {name: "bullet", path: "../../assets/bullet.png"},
            {name: "star1", path: "../../assets/star1.png"},
            {name: "star2", path: "../../assets/star2.png"},
            {name: "star3", path: "../../assets/star3.png"},
            {name: "meteor1", path: "../../assets/meteor1.png"},
            {name: "meteor2", path: "../../assets/meteor2.png"},
            {name: "bar", path: "../../assets/bar.png"},
            {name: "barLine", path: "../../assets/bar_line.png"},
            {name: "void", path: "../../assets/void.png"},

            {name: "Explosion_1", path: "../../assets/animations/explosion/Explosion_1.png"},
            {name: "Explosion_2", path: "../../assets/animations/explosion/Explosion_2.png"},
            {name: "Explosion_3", path: "../../assets/animations/explosion/Explosion_3.png"},
            {name: "Explosion_4", path: "../../assets/animations/explosion/Explosion_4.png"},
            {name: "Explosion_5", path: "../../assets/animations/explosion/Explosion_5.png"},
            {name: "Explosion_6", path: "../../assets/animations/explosion/Explosion_6.png"},
            {name: "Explosion_7", path: "../../assets/animations/explosion/Explosion_7.png"},
        ];

        for (let texture of textures) {
            Assets.add(texture.name, texture.path);
            await Assets.load(texture.name);
        }
    }
}