export default class AtowItemData extends foundry.abstract.DataModel {
  /** @inheritdoc */
  static defineSchema() {
    const fields = foundry.data.fields;

    return {
      description: new fields.HTMLField(),
      // FIXTHIS: Figure out how to use subclasses if possible
      xp: new fields.NumberField({
        required: false,
        integer: true,
      }),
      // Skill stuff
      link1: new fields.StringField({
        required: false,
      }),
      link2: new fields.StringField({
        required: false,
      }),
      complexity: new fields.StringField({
        required: true,
        initial: "sb",
      }),
      rank: new fields.NumberField({
        required: true,
        default: 0,
        integer: true,
      }),
      tn: new fields.NumberField({
        required: false,
        integer: true,
      }),
      linkMod: new fields.NumberField({
        required: false,
        integer: true,
      }),
    };
  }
}
