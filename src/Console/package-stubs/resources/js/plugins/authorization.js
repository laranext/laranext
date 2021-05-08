import { app } from 'Laranext/app'

app.provide('can', permission => {
  if (Config.meta.is_super_admin) return true

  return Config.permissions.includes(permission)
})

app.provide('cannot', permission => {
  if (Config.meta.is_super_admin) return false

  return ! Config.permissions.includes(permission)
})

app.config.globalProperties.can = permission => {
  if (Config.meta.is_super_admin) return true

  return Config.permissions.includes(permission)
}

app.config.globalProperties.cannot = permission => {
  if (Config.meta.is_super_admin) return false

  return ! Config.permissions.includes(permission)
}
