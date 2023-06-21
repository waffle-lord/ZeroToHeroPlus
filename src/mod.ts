import { DependencyContainer } from "tsyringe";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { LogTextColor } from "@spt-aki/models/spt/logging/LogTextColor";
import { LogBackgroundColor } from "@spt-aki/models/spt/logging/LogBackgroundColor";


import { readFileSync } from "fs";
import { join } from "path";

class Mod implements IPostDBLoadMod
{
    public postDBLoad(container: DependencyContainer): void 
    {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");

        const profileName = "Waffle's Zero To Hero+"
        
        const tables = databaseServer.getTables();
        
        const zthProfile = tables.templates.profiles["SPT Zero to hero"]
        
        const newInventoryData = JSON.parse(readFileSync(join(__dirname, "./inventory.json"), "utf-8"))
        
        zthProfile.bear.character.Inventory = newInventoryData;
        zthProfile.usec.character.Inventory = newInventoryData;

        tables.templates.profiles[profileName] = zthProfile;

        logger.logWithColor("[waffle.modder] ZTH+ Added", LogTextColor.MAGENTA)
    }
}

module.exports = { mod: new Mod() }