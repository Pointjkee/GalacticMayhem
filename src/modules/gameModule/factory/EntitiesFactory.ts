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
import {HealthPointsComponent} from "../components/HealthPointsComponent";
import {HealthBarComponent} from "../components/HealthBarComponent";
import {Meteor} from "../entities/Meteor";
import {MeteorComponent} from "../components/MeteorComponent";
import {CollisionComponent} from "../components/CollisionComponent";
import {ShootComponent} from "../components/ShootComponent";

export class EntitiesFactory
{
    public static createBullet(position: PositionComponent): Bullet
    {
        const bullet = new Bullet();
        bullet.addComponent(new BulletComponent(10));
        bullet.addComponent(new PositionComponent(position.x, position.y - 80));
        const spriteComponent =  bullet.addComponent(new SpriteComponent("bullet")) as SpriteComponent;
        bullet.addComponent(new HealthPointsComponent(20));
        bullet.addComponent(new CollisionComponent(spriteComponent.sprite.texture.textureCacheIds[1]));

        return bullet;
    }

    public static createSpaceShip(): Ship
    {
        const ship = new Ship();

        ship.addComponent(new PositionComponent(PIXIS.windowWidth / 2, PIXIS.windowHeight / 2 + 200));
        ship.addComponent(new VelocityComponent(0, 0));
        ship.addComponent(new SpaceShipControlComponent(10));
        const spriteComponent = ship.addComponent(new SpriteComponent("ship")) as SpriteComponent;
        ship.addComponent(new HealthPointsComponent(100));
        ship.addComponent(new CollisionComponent(spriteComponent.sprite.texture.textureCacheIds[1]));
        ship.addComponent(new HealthBarComponent());
        ship.addComponent(new ShootComponent(500));

        return ship;
    }

    public static createStar(): Star
    {
        const star = new Star();

        star.addComponent(new PositionComponent(Utils.getRandomNumberInRange(0, PIXIS.windowWidth), 0));
        star.addComponent(new VelocityComponent(0, 1));
        star.addComponent(new StarComponent(Utils.getRandomNumberInRange(5, 15)));
        const component = star.addComponent(new SpriteComponent(`star${Utils.getRandomNumberInRange(1, 3)}`)) as SpriteComponent;
        component.sprite.scale.set(0.5, 0.5);

        return star;
    }

    public static createMeteor(): Meteor
    {
        const meteor = new Meteor();
        meteor.addComponent(new VelocityComponent(0, 1));
        meteor.addComponent(new PositionComponent(Utils.getRandomNumberInRange(0, PIXIS.windowWidth), 0));
        meteor.addComponent(new HealthPointsComponent(20));
        meteor.addComponent(new MeteorComponent(Utils.getRandomNumberInRange(3, 6)));
        const spriteComponent = meteor.addComponent(new SpriteComponent(`meteor${Utils.getRandomNumberInRange(1, 2)}`)) as SpriteComponent;
        meteor.addComponent(new PositionComponent(Utils.getRandomNumberInRange(spriteComponent.sprite.width, PIXIS.windowWidth - spriteComponent.sprite.width), 0));
        meteor.addComponent(new CollisionComponent(spriteComponent.sprite.texture.textureCacheIds[1]));

        return meteor
    }
}