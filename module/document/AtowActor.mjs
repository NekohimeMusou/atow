export default class AtowActor extends Actor {
  /** @inheritdoc */
  prepareData() {
    super.prepareData();
  }

  prepareDerivedData() {
    // const flags = this.flags.atow || {};

    this.system.xpTotal = 0;
  }

  /** @inheritdoc */
  getRollData() {
    const data = foundry.utils.deepClone(super.getRollData());

    return data;
  }
}
