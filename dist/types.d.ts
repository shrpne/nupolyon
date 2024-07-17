
import { ModuleOptions } from './module'

declare module '@nuxt/schema' {
  interface NuxtConfig { ['nupolyon']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['nupolyon']?: ModuleOptions }
}

declare module 'nuxt/schema' {
  interface NuxtConfig { ['nupolyon']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['nupolyon']?: ModuleOptions }
}


export { ModuleOptions, default } from './module'
