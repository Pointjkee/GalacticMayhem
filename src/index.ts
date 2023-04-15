import {PixiEngine} from "./PIXI/pixiEngine/PixiEngine";
import {Modules} from "./modules/main/Modules";
import {Resources} from "./core/Resources";

const resource = new Resources();
await resource.load();

export const PIXIS = new PixiEngine(window.innerWidth, window.innerHeight, 0x1099bb, resource)
export const Application = new Modules(PIXIS);