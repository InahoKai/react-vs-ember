import Resolver from 'ember-resolver/resolvers/fallback';
// import Resolver from 'ember-resolver/resolvers/glimmer-wrapper';

import { merge } from '@ember/polyfills';

import buildResolverConfig from 'ember-resolver/ember-config';
import config from '../config/environment';

let moduleConfig = buildResolverConfig(config.modulePrefix);
/*
 * If your application has custom types and collections, modify moduleConfig here
 * to add support for them.
 */

merge(moduleConfig.types, {
  config: { definitiveCollection: 'main' },
  mixin: { definitiveCollection: 'main' },
  util: { definitiveCollection: 'utils' },
});

moduleConfig.collections.main.types.push('config');

export default Resolver.extend({
  config: moduleConfig,
});
