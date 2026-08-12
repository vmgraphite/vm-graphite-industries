import { defineType, defineField } from 'sanity';

export const specRowObject = defineType({
  name: 'specRow',
  title: 'Specification Row',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Specification Name / Attribute',
      type: 'string',
      description: 'e.g. Material, Maximum Temperature, Carbon Content, Density, Tensile Strength',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Specification Value / Standard',
      type: 'string',
      description: 'e.g. High Purity Synthetic Graphite, 3000°C, 99.9%, 1.85 g/cm³',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'value',
    },
  },
});
