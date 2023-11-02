export default class AtowActor extends Actor {
  /** @inheritdoc */
  prepareData() {
    super.prepareData();
  }

  prepareBaseData() {
    // const flags = this.flags.atow || {};

    this._prepareAttributes();
  }

  _prepareAttributes() {
    const attributes = this.system.attributes;

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

  /** @inheritdoc */
  getRollData() {
    const data = foundry.utils.deepClone(super.getRollData());

    for (const [k, v] of Object.entries(data.attributes)) {
      data[k] = v.value;
      data[`${k}Link`] = v.linkMod;
    }

    data.initMod = this.system.initiativeMod || 0;

    return data;
  }
}
