import type { ForgeConfig } from '@electron-forge/shared-types'; // 导入 ForgeConfig
import { MakerSquirrel } from '@electron-forge/maker-squirrel'; // 导入 MakerSquirrel
import { MakerZIP } from '@electron-forge/maker-zip'; // 导入 MakerZIP
import { MakerDeb } from '@electron-forge/maker-deb'; // 导入 MakerDeb
import { MakerRpm } from '@electron-forge/maker-rpm'; // 导入 MakerRpm
import { VitePlugin } from '@electron-forge/plugin-vite'; // 导入 VitePlugin
import { FusesPlugin } from '@electron-forge/plugin-fuses'; // 导入 FusesPlugin
import { FuseV1Options, FuseVersion } from '@electron/fuses'; // 导入 FuseV1Options 和 FuseVersion

const config: ForgeConfig = {
  packagerConfig: {
    
    asar: true,
  }, // 打包配置
  rebuildConfig: {}, // 重新构建配置
  makers: [
    new MakerSquirrel({}),
    new MakerZIP({}, ['darwin']),
    new MakerRpm({}),
    new MakerDeb({}),
  ], // 制造商配置
  plugins: [
    new VitePlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar. 
      build: [
        {
          // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
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
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
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
};

export default config;
