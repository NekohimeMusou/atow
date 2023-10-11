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
          selected: new fields.BooleanField({
            required: true,
            initial: false,
          }),
        }),
        bod: new fields.SchemaField({
          xp: new fields.NumberField({
            required: true,
            initial: 0,
            integer: true,
          }),
          selected: new fields.BooleanField({
            required: true,
            initial: false,
          }),
        }),
        rfl: new fields.SchemaField({
          xp: new fields.NumberField({
            required: true,
            initial: 0,
            integer: true,
          }),
          selected: new fields.BooleanField({
            required: true,
            initial: false,
          }),
        }),
        dex: new fields.SchemaField({
          xp: new fields.NumberField({
            required: true,
            initial: 0,
            integer: true,
          }),
          selected: new fields.BooleanField({
            required: true,
            initial: false,
          }),
        }),
        int: new fields.SchemaField({
          xp: new fields.NumberField({
            required: true,
            initial: 0,
            integer: true,
          }),
          selected: new fields.BooleanField({
            required: true,
            initial: false,
          }),
          linkMod: new fields.NumberField({
            initial: 0,
            integer: true,
          }),
          value: new fields.NumberField({
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
          selected: new fields.BooleanField({
            required: true,
            initial: false,
          }),
        }),
        cha: new fields.SchemaField({
          xp: new fields.NumberField({
            required: true,
            initial: 0,
            integer: true,
          }),
          selected: new fields.BooleanField({
            required: true,
            initial: false,
          }),
        }),
        edg: new fields.SchemaField({
          xp: new fields.NumberField({
            required: true,
            initial: 0,
            integer: true,
          }),
          selected: new fields.BooleanField({
            required: true,
            initial: false,
          }),
        }),
      })
    };
  }
}
