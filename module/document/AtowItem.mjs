export default class AtowItem extends Item {
  /** @inheritdoc */
  prepareData() {
    super.prepareData();
  }

  /** @override */
  prepareDerivedData() {
    this._prepareTraitData();
    this._prepareSkillData();
  }

  _prepareTraitData() {
    if (this.type !== "trait") return;

    this.system.rank = Math.trunc(this.system.xp / 100);
  }

  _prepareSkillData() {
    if (this.type !== "skill") return;

    this.system.tn = CONFIG.ATOW.skillTNs?.[this.system.complexity] || 7;
    this.system.linkMod = this._getLinkMod();
    // FIXTHIS: Add actual code for the rank
    this.system.rank = 0;
  }

  _getLinkMod() {
    const [link1, link2] = [this.system.link1, this.system.link2];

    const linkMod1 = this.actor?.attributes?.[link1]?.linkMod || 0;
    const linkMod2 = this.actor?.attributes?.[link2]?.linkMod || 0;

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
