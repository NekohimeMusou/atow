import {onManageActiveEffect, prepareActiveEffectCategories} from "../config/active-effects.mjs";
import {attributeRoll, skillRoll} from "../helpers/dice.mjs";

export default class AtowActorSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["atow", "sheet", "actor"],
      template: "systems/atow/templates/actor/actor-sheet.hbs",
      width: 1000,
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
    const skills = context.items.filter((i) => i.type === "skill");

    Object.assign(context, {
      system, flags, rollData, effects, traits, skills, ATOW,
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

    html.find(".attribute-roll").click((ev) => this.#onAttributeRoll(ev));
    html.find(".use-skill").click((ev) => this.#onSkillRoll(ev));
    html.find(".item-complexity-select").change((ev) => this.#onItemComplexitySelect(ev));
    html.find(".item-link-select").change((ev) => this.#onItemLinkSelect(ev));
    html.find(".item-rank-field").change((ev) => this.#onItemRankUpdate(ev));
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

    const rollData = this.actor.getRollData();

    return await attributeRoll(rollData, attr);
  }

  async #onSkillRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const itemId = element.closest(".item").dataset.itemId;
    const skill = this.actor.items.get(itemId);

    const rollData = this.actor.getRollData();
    const skillName = skill.name;
    const rank = skill.system.rank;
    const tn = skill.system.tn;
    const linkMod = skill.system.linkMod;

    skillRoll(rollData, skillName, rank, tn, linkMod);
  }

  async #onItemRankUpdate(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const itemId = element.closest(".item").dataset.itemId;
    const item = this.actor.items.get(itemId);

    const newRank = element.value;

    await item.update({"system.rank": newRank});
  }

  async #onItemComplexitySelect(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const itemId = element.closest(".item").dataset.itemId;
    const item = this.actor.items.get(itemId);

    const newRating = element.value;

    await item.update({"system.complexity": newRating});
    await this.render(false);
  }

  async #onItemLinkSelect(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const itemId = element.closest(".item").dataset.itemId;
    const item = this.actor.items.get(itemId);
    const linkField = element.dataset.linkField;

    const newLink = element.value;
    const updates = Object.fromEntries([[`system.${linkField}`, newLink]]);

    await item.update(updates);
  }
}
