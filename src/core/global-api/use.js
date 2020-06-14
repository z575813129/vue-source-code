/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  // 执行install方法，然后存在installedPlugins方法里面
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      // 执行install方法
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    // 缓存所有插件
    installedPlugins.push(plugin)
    return this
  }
}
