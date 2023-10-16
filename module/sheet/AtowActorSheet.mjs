import {onManageActiveEffect, prepareActiveEffectCategories} from "../config/active-effects.mjs";
import {attributeRoll} from "../helpers/dice.mjs";

export default class AtowActorSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["atow", "sheet", "actor"],
      template: "systems/atow/templates/actor/actor-sheet.hbs",
      width: 800,
      height: 800,
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "main"}],
    });
  }

  /** @override */
  getData() {
    const context = super.getData();

    const actorData = this.actor.toObject(false);

    // Add the actor's data to context.data for easier access, as well as flags
    const system = actorData.system;
    const flags = actorData.flags;

    // Add global config data
    const ATOW = CONFIG.ATOW;

    // Add roll data for TinyMCE editors
    const rollData = context.actor.getRollData();

    // Prepare active effects
    const effects = prepareActiveEffectCategories(this.actor.effects);

    const traits = context.items.filter((i) => i.type === "trait");

    Object.assign(context, {
      system, flags, rollData, effects, traits, ATOW,
    });

    return context;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Render the item sheet for viewing/editing prior to the editable check.
    html.find(".item-edit").click((ev) => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      item.sheet.render(true);
    });

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Add Inventory Item
    html.find(".item-create").click(this.#onItemCreate.bind(this));

    // Delete Inventory Item
    html.find(".item-delete").click((ev) => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      item.delete();
      li.slideUp(200, () => this.render(false));
    });

    // Active Effect management
    html.find(".effect-control").click((ev) => onManageActiveEffect(ev, this.actor));

    // Drag events for macros.
    if (this.actor.isOwner) {
      const handler = (ev) => this._onDragStart(ev);
      html.find("li.item").each((_, li) => {
        if (li.classList.contains("inventory-header")) return;
        li.setAttribute("draggable", true);
        li.addEventListener("dragstart", handler, false);
      });
    }

    html.find(".attribute-roll").click((ev) => this.#onAttributeRoll(ev));
    html.find(".item-xp-field").change((ev) => this.#onItemXpUpdate(ev));
  }

  /**
     * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
     * @param {Event} event   The originating click event
     * @private
     */
  async #onItemCreate(event) {
    event.preventDefault();
    const element = event.currentTarget;
    // Get the type of item to create.
    const type = element.dataset.type;
    // Grab any data associated with this control.
    const system = duplicate(element.dataset);
    // Initialize a default name.
    const itemName = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: itemName,
      type,
      system,
    };
      // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.system["type"];

    // Finally, create the item!
    return await Item.create(itemData, {parent: this.actor});
  }

  async #onAttributeRoll(event) {
    // Show dialog to enter mod + choose second attr (or don't if shift is held)
    // 2d6+attr vs. TN 12, or 2d6+attr1+attr2 vs. TN 18
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    const attr = dataset.attr;

    if (!attr) return;

    return await attributeRoll(this.actor.getRollData(), attr);
  }

  async #onItemXpUpdate(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const itemId = element.closest(".item").dataset.itemId;
    const item = this.actor.items.get(itemId);

    const xp = parseInt(element.value) || 0;

    await item.update({"system.xp": xp});
    await this.render(false);
  }
}
