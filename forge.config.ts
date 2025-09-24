import type { ForgeConfig } from '@electron-forge/shared-types'
import { MakerZIP } from '@electron-forge/maker-zip'
import { MakerDMG } from '@electron-forge/maker-dmg'
import { VitePlugin } from '@electron-forge/plugin-vite'
import { FusesPlugin } from '@electron-forge/plugin-fuses'
import { FuseV1Options, FuseVersion } from '@electron/fuses'
import dotenv from 'dotenv'

dotenv.config() // 加载 .env 文件

const config: ForgeConfig = {
  packagerConfig: {
    name: 'VChat', // 应用名称
    icon: './src/asstes/icon', // 应用图标
    asar: true, // 启用 ASAR 打包
  }, // 打包配置
  rebuildConfig: {}, // 重新构建配置
  makers: [
    new MakerDMG({
      icon: './src/asstes/icon.icns', // 应用图标
      format: 'ULFO', // 格式
    }),
    new MakerZIP({}, ['darwin']),
  ], // 制造商配置

  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'Great-Qin-Dynasty',
          name: 'vchart',
        },
        prerelease: false,
        draft: true,
        authToken: process.env.GITHUB_TOKEN, // 设置 GitHub 认证令牌
      },
    },
  ],

  plugins: [
    new VitePlugin({
      // `build` 可以指定多个入口构建，可以是主进程、预加载脚本、工作进程等。
      // 如果你熟悉Vite的配置，它看起来会非常熟悉。
      build: [
        {
          // `entry` 只是 `config` 中相应文件的 `build.lib.entry` 的别名。
          entry: 'src/main.ts',
          config: 'vite.main.config.ts',
          target: 'main',
        },
        {
          entry: 'src/preload.ts',
          config: 'vite.preload.config.ts',
          target: 'preload',
        },
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'vite.renderer.config.ts',
        },
      ],
    }),
    // Fuses 用于在打包时启用/禁用各种 Electron 功能
    // 在打包时，在代码签名之前
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ], // 插件配置
}

export default config
