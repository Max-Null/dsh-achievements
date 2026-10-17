# Changelog

本项目遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/) 与[语义化版本](https://semver.org/lang/zh-CN/)。

## [0.1.4] - 2026-10-18

### Changed

- 适配 DSH 0.2.1：`inject` 的 `webRuntime` 换成 `webStartup`，信任围栏改读 `ctx.webStartup.trustedHosts`。`webRuntime` 服务自 0.2.1-alpha.2 起被删除，保留旧名会让插件静默停在 PENDING（不报错、不崩溃，只是不加载）。
