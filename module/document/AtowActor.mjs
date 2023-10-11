export default class AtowActor extends Actor {
  /** @inheritdoc */
  prepareData() {
    super.prepareData();
  }

  prepareBaseData() {
    // const flags = this.flags.atow || {};

    this._prepareAttributes();

    this.system.xpTotal = this.calcXpTotal();
  }

  _prepareAttributes() {
    const attributes = this.system.attributes;

    // Calculate attribute values from XP
    Object.values(attributes).forEach(
        (a) => a.value = Math.max(Math.trunc(a.xp / 100), 0),
    );

    // Calculate link modifiers
    Object.values(attributes).forEach(
        (a) => a.linkMod = AtowActor.calcLinkMod(a.value),
    );
  }

  static calcLinkMod(attribute) {
    if (attribute <= 0) {
      return -4;
    }

    switch (attribute) {
      case 1:
        return -2;
      case 2:
      case 3:
        return -1;
      case 4:
      case 5:
      case 6:
        return 0;
      case 7:
      case 8:
      case 9:
        return 1;
      case 10:
        return 2;
      default:
        return Math.min(Math.floor(attribute / 3), 5);
    }
  }

  calcXpTotal() {
    const attributes = this.system.attributes;

    const attribXp = Object.values(attributes).reduce((total, a) => total + a.xp, 0);

    const traits = this.items.filter((i) => i.type === "trait");

    const traitXp = traits.reduce((total, trait) => total + trait.xp, 0);

    const skills = this.items.filter((i) => i.type === "skill");

    const skillXp = skills.reduce((total, skill) => total + skill.xp, 0);

    return attribXp + traitXp + skillXp;
  }

  /** @inheritdoc */
  getRollData() {
    const data = foundry.utils.deepClone(super.getRollData());

    return data;
  }
}
