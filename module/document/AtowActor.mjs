export default class AtowActor extends Actor {
  /** @inheritdoc */
  prepareData() {
    super.prepareData();
  }

  /** @inheritdoc */
  getRollData() {
    const data = foundry.utils.deepClone(super.getRollData());

    return data;
  }
}
