import { isWebp } from "./modules";
import { Switch } from "./modules/switch";
import { menu } from "./modules/menu";
import { gclid } from "./modules/gclid";
import { git } from "./modules/general";

if (location.hostname === "localhost" || location.hostname === git) {
  menu();
}
Switch();
gclid();

window["FLS"] = location.hostname === "localhost";

isWebp();
