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
            {name: "ship", path: "../../assets/plane.png"},
            {name: "bullet", path: "../../assets/bullet.png"},
            {name: "star1", path: "../../assets/star1.png"},
            {name: "star2", path: "../../assets/star2.png"},
            {name: "star3", path: "../../assets/star3.png"},
            {name: "bar", path: "../../assets/bar.png"},
            {name: "barLine", path: "../../assets/bar_line.png"},
            {name: "void", path: "../../assets/void.png"},
        ];

        for (let texture of textures) {
            Assets.add(texture.name, texture.path);
            await Assets.load(texture.name);
        }
    }
}