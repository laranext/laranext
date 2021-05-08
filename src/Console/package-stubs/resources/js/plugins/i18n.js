import { createI18n } from 'vue-i18n'
import messages from '@intlify/vite-plugin-vue-i18n/messages'
// const messages = {}
// messages[Config.meta.locale] = Config.messages

console.log( Config.meta.locale )
// console.log(messages)

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  missingWarn: false,
  locale: Config.meta.locale,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})
