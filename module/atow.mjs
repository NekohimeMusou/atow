// Import data model classes
import AtowActorData from "./data/actor/AtowActorData.mjs";
import AtowItemData from "./data/item/AtowItemData.mjs";
// Import document classes
import AtowActor from "./document/AtowActor.mjs";
import AtowItem from "./document/AtowItem.mjs";
// Import sheet classes
import AtowActorSheet from "./sheet/AtowActorSheet.mjs";
import AtowItemSheet from "./sheet/AtowItemSheet.mjs";
// Import helper/utility classes and constants
import {ATOW} from "./config/config.mjs";
import preloadHandlebarsTemplates from "./config/templates.mjs";


Hooks.once("init", async function() {
  console.log("ATOW | Initializing BattleTech: A Time of War game system");
  // Add utility classes to global object
  game.atow = {
    AtowActor,
    AtowItem,
  };

  // Add custom config constants
  CONFIG.ATOW = ATOW;

  registerDataModels();
  registerDocumentClasses();
  registerSheetApplications();
  preloadHandlebarsTemplates();
});

function registerDocumentClasses() {
  CONFIG.Actor.documentClass = AtowActor;
  CONFIG.Item.documentClass = AtowItem;
}

function registerDataModels() {
  CONFIG.Actor.dataModels.pc = AtowActorData;
  CONFIG.Item.dataModels.skill = AtowItemData;
  CONFIG.Item.dataModels.trait = AtowItemData;
}

function registerSheetApplications() {
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("atow", AtowActorSheet, {makeDefault: true});
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("atow", AtowItemSheet, {makeDefault: true});
}
