import { isWebp } from "./modules";
import { Switch } from "./modules/switch";
import { menu } from "./modules/menu";
import { gclid } from "./modules/gclid";
import { git } from "./modules/data.html";
import Loader from "./modules/loader.vitrinePL";

if (location.hostname === "localhost" || location.hostname === git) {
  menu();
}
Switch();
gclid();

window["FLS"] = location.hostname === "localhost";

isWebp();

Loader();
