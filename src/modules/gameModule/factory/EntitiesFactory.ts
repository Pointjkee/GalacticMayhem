import {Bullet} from "../entities/Bullet";
import {Ship} from "../entities/Ship";
import {PositionComponent} from "../components/PositionComponent";
import {VelocityComponent} from "../components/VelocityComponent";
import {SpaceShipControlComponent} from "../components/SpaceShipControlComponent";
import {SpriteComponent} from "../components/SpriteComponent";
import {BulletComponent} from "../components/BulletComponent";
import {PIXIS} from "../../..";
import {Star} from "../entities/Star";
import {Utils} from "../../../utils/Utils";
import {StarComponent} from "../components/StarComponent";
import {HealthBar} from "../entities/HealthBar";
import {HealthPointsComponent} from "../components/HealthPointsComponent";
import {HealthBarComponent} from "../components/HealthBarComponent";

export class EntitiesFactory
{
    public static createBullet(position: PositionComponent): Bullet
    {
        const bullet = new Bullet();
        bullet.addComponent(new BulletComponent(10));
        bullet.addComponent(new PositionComponent(position.x, position.y - 80));
        bullet.addComponent(new SpriteComponent("bullet"));

        return bullet;
    }

    public static createSpaceShip(): Ship
    {
        const ship = new Ship();

        ship.addComponent(new PositionComponent(PIXIS.windowWidth / 2, PIXIS.windowHeight / 2 + 200));
        ship.addComponent(new VelocityComponent(0, 0));
        ship.addComponent(new SpaceShipControlComponent(10));
        ship.addComponent(new SpriteComponent("ship"));
        return ship;
    }

    public static createStar(): Star
    {
        const star = new Star();

        star.addComponent(new PositionComponent(Utils.getRandomNumberInRange(0, PIXIS.windowWidth), 0));
        star.addComponent(new VelocityComponent(0, 1));
        star.addComponent(new SpriteComponent(`star${Utils.getRandomNumberInRange(1, 3)}`));
        star.addComponent(new StarComponent(Utils.getRandomNumberInRange(5, 15)))

        return star;
    }

    public static createHeathBar(): HealthBar
    {
        const bar = new HealthBar();

        bar.addComponent(new HealthPointsComponent(100));
        bar.addComponent(new HealthBarComponent());


        return bar;
    }
}