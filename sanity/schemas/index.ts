import { seoObject } from './objects/seo';
import { specRowObject } from './objects/specRow';
import { siteSettingsSchema } from './siteSettings';
import { homePageSchema } from './homePage';
import { aboutPageSchema } from './aboutPage';
import { contactPageSchema } from './contactPage';
import { downloadsPageSchema } from './downloadsPage';
import { categorySchema } from './category';
import { productSchema } from './product';
import { resourceSchema } from './resource';

export const schemaTypes = [
  seoObject,
  specRowObject,
  homePageSchema,
  aboutPageSchema,
  contactPageSchema,
  downloadsPageSchema,
  siteSettingsSchema,
  categorySchema,
  productSchema,
  resourceSchema,
];
