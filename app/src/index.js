// @ts-check
import { moduleName, componentName, utilsName } from '@lanzhi/ts-core'

const obj = {
  moduleName,
  componentName,
  utilsName,
}

console.log(obj, moduleName, componentName, utilsName)

window.sayHello()

/** @type {UnknownObject} */
const fields = {}
