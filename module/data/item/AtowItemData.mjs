export default class AtowItemData extends foundry.abstract.DataModel {
  /** @inheritdoc */
  static defineSchema() {
    const fields = foundry.data.fields;

    return {
      description: new fields.HTMLField(),
      // FIXTHIS: Figure out how to use subclasses if possible
      xp: new fields.NumberField({
        required: true,
        initial: 0,
        integer: true,
      }),
      // Skill stuff
      link1: new fields.StringField({
        required: true,
        initial: "",
      }),
      link2: new fields.StringField({
        required: true,
        initial: "",
      }),
      complexity: new fields.StringField({
        required: true,
        initial: "sb",
      }),
    };
  }
}
