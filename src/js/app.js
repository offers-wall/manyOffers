/*
!(i) 
Код попадает в итоговый файл, только когда вызвана функция, например FLSFunctions.spollers();
Или когда импортирован весь файл, например import "files/script.js";
Неиспользуемый (не вызванный) код в итоговый файл не попадает.

Если мы хотим добавить модуль следует его расскоментировать
*/
import { isWebp } from "./modules";
import { Switch } from "./modules/switch";
import { menu } from "./modules/menu";

menu();
Switch()

window["FLS"] = location.hostname === "localhost";

isWebp();
