export default class AtowItem extends Item {
  /** @inheritdoc */
  prepareData() {
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    this._prepareTraitData();
    this._prepareSkillData();
  }

  _prepareTraitData() {
    if (this.type !== "trait") return;
  }

  _prepareSkillData() {
    if (this.type !== "skill") return;

    this.system.tn = CONFIG.ATOW.skillTNs?.[this.system.complexity] || 7;
    this.system.linkMod = this._getLinkMod();

    this.system.total = this.system.rank + this.system.linkMod;
  }

  _getLinkMod() {
    const [link1, link2] = [this.system.link1, this.system.link2];

    const linkMod1 = this.actor.system.attributes?.[link1]?.linkMod || 0;
    const linkMod2 = this.actor.system.attributes?.[link2]?.linkMod || 0;

    return linkMod1 + linkMod2;
  }

  /** @inheritdoc */
  getRollData() {
    // If present, return the actor's roll data.
    if ( !this.actor ) return null;

    const rollData = this.actor.getRollData();
    rollData.item = foundry.utils.deepClone(this.system);

    return rollData;
  }
}
