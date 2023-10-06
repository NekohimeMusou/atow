export default class AtowActorData extends foundry.abstract.DataModel {
  /** @inheritdoc */
  static defineSchema() {
    const fields = foundry.data.fields;

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
      attributes: new fields.SchemaField({
        str: new fields.SchemaField({
          xp: new fields.NumberField({
            required: true,
            initial: 0,
            integer: true,
          }),
        }),
        bod: new fields.SchemaField({
          xp: new fields.NumberField({
            required: true,
            initial: 0,
            integer: true,
          }),
        }),
        rfl: new fields.SchemaField({
          xp: new fields.NumberField({
            required: true,
            initial: 0,
            integer: true,
          }),
        }),
        dex: new fields.SchemaField({
          xp: new fields.NumberField({
            required: true,
            initial: 0,
            integer: true,
          }),
        }),
        int: new fields.SchemaField({
          xp: new fields.NumberField({
            required: true,
            initial: 0,
            integer: true,
          }),
        }),
        wil: new fields.SchemaField({
          xp: new fields.NumberField({
            required: true,
            initial: 0,
            integer: true,
          }),
        }),
        cha: new fields.SchemaField({
          xp: new fields.NumberField({
            required: true,
            initial: 0,
            integer: true,
          }),
        }),
        edg: new fields.SchemaField({
          xp: new fields.NumberField({
            required: true,
            initial: 0,
            integer: true,
          }),
        }),
      }),
      sheetLocked: new fields.BooleanField({
        required: true,
        initial: false,
      }),
    };
  }
}
