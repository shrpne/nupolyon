import * as _nuxt_schema from '@nuxt/schema';

type AnyString = (string & Record<never, never>);
interface ModuleOptions {
    target?: string | string[];
    host?: 'selfhost' | AnyString;
}
declare const _default: _nuxt_schema.NuxtModule<ModuleOptions>;

export { ModuleOptions, _default as default };
