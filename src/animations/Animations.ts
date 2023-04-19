import {AnimatedSprite, Assets, Sprite, Texture} from "pixi.js";
import {PIXIS} from "../index";

export class Animations
{
    public static explosion(target: Sprite): void
    {
        const ExplosionNames = [
            "Explosion_1",
            "Explosion_2",
            "Explosion_3",
            "Explosion_4",
            "Explosion_5",
            "Explosion_6",
            "Explosion_7",
        ];

        const textures = ExplosionNames.map((name) => Assets.get(name));
        const animatedTexture = new AnimatedSprite(textures);
        animatedTexture.width = animatedTexture.width / 2
        animatedTexture.height = animatedTexture.height / 2
        animatedTexture.anchor.set(0.5)
        animatedTexture.animationSpeed = 0.1;
        animatedTexture.x = target.x;
        animatedTexture.y = target.y;

        const app = PIXIS.getApp();
        app.stage.addChild(animatedTexture)
        animatedTexture.play();
        animatedTexture.loop = false;
        animatedTexture.onComplete = () =>
        {
            app.stage.removeChild(animatedTexture);
        };

    }
}