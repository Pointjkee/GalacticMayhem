import {AbstractComponent} from "./AbstractComponent";
import * as p2 from "p2";
import sheet from "../../../../assets/json/vertices.json"
import {Container, Graphics} from "pixi.js";

export class CollisionComponent extends AbstractComponent
{
    private _body: p2.Body;
    private _containerBody: Container;

    constructor(name: string, debug? = false)
    {
        super();
        this.name = "Collision";

        this._body = new p2.Body({
            mass: 1,
            position: [0, 0],
            collisionResponse: false
        });

        //Полигоны объекта
        let verticesArray;
        const convexes = sheet[name].fixtures[0].vertices.map(vertices =>
        {
            verticesArray = vertices.map(v => [v.y, v.x])
            return new p2.Convex({vertices: verticesArray});
        });
        for (let convex of convexes) {
            this._body.addShape(convex);
        }

        //для дебага
        if (debug) {
            this._containerBody = new Container();
            for (let i = 0; i < this._body.shapes.length; i++) {
                const shape = this._body.shapes[i];
                const vertices = shape.vertices;
                const ship = new Graphics();
                ship.beginFill(0x00FF00);
                ship.moveTo(vertices[0][0], vertices[0][1]);
                for (let i = 1; i < vertices.length; i++) {
                    ship.lineTo(vertices[i][0], vertices[i][1]);
                }
                ship.closePath();
                this._containerBody.addChild(ship)
            }
        }
    }

    public get debugContainer(): Container
    {
        return this._containerBody;
    }

    public get body(): p2.Body
    {
        return this._body;
    }
}