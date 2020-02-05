import { DynamicPageSchema } from 'src/dynamic-renderer/dynamic-components.interfaces';
import { v4 as uuid } from 'uuid';

export class PageDefaults implements DynamicPageSchema {
  '@id' = uuid();
  '@type' = 'Page';
  title = '';
  slug = '';
  children = [];
  activeComponent = null;
  components = {};

  constructor(options) {
    Object.assign(this, options);
  }
}
