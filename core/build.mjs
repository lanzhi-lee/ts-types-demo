// @ts-check
import { $, fs, globby } from 'zx'

await main()

async function main() {
  await $`npx ttsc`
  await copyDts()
}

async function copyDts() {
  const dtsList = ['../../type.d.ts']

  // 扫描内部目录中的类型定义文件并自动复制至目标文件夹
  await globby('src/**/*.d.ts').then(async (declarationFiles) => {
    for await (const filePath of declarationFiles) {
      await $`cp ${filePath} ./dist/${filePath}`
      dtsList.push(filePath.replace('src/', ''))
    }
  })

  // 向类型定义文件的入口插入 dts 的引入
  const dtsStr = dtsList.map((dts) => `/// <reference path="${dts}" />`).join('\n') + '\n\n'
  const typesEntry = './dist/src/index.d.ts'
  fs.writeFileSync(typesEntry, Buffer.concat([Buffer.from(dtsStr), fs.readFileSync(typesEntry)]))
}
