export default class AtowActorData extends foundry.abstract.DataModel {
  /** @inheritdoc */
  static defineSchema() {
    const fields = foundry.data.fields;

    const attributes = new fields.SchemaField(
        Object.fromEntries(
            ["str", "bod", "rfl", "dex", "int", "wil", "cha", "edg"].map(
                (a) => [a, new fields.SchemaField({
                  xp: new fields.NumberField({
                    required: true,
                    initial: 0,
                    integer: true,
                  }),
                  linkMod: new fields.NumberField({
                    initial: 0,
                    integer: true,
                  }),
                  value: new fields.NumberField({
                    initial: 0,
                    integer: true,
                  }),
                })],
            ),
        ));

    return {
      description: new fields.HTMLField(),
      affiliation: new fields.StringField(),
      stdDamage: new fields.SchemaField({
        min: new fields.NumberField({
          required: true,
          initial: 0,
          integer: true,
        }),
        max: new fields.NumberField({
          required: true,
          initial: 1,
          integer: true,
        }),
        value: new fields.NumberField({
          required: true,
          initial: 1,
        }),
      }),
      fatigueDamage: new fields.SchemaField({
        min: new fields.NumberField({
          required: true,
          initial: 0,
          integer: true,
        }),
        max: new fields.NumberField({
          required: true,
          initial: 1,
          integer: true,
        }),
        value: new fields.NumberField({
          required: true,
          initial: 1,
          integer: true,
        }),
      }),
      attributes,
    };
  }
}
