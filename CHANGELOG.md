# Changelog

本项目遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/) 与[语义化版本](https://semver.org/lang/zh-CN/)。

## [0.1.5] - 2026-11-13

### Fixed

**设置页导航图标改成注册宿主的 `settings.section.icon` 插槽**（DSH 0.2.2-rc.1 起提供）。

旧方案用 `MutationObserver` 标记导航行、`::before` mask 画奖杯、并隐藏导航按钮的直接子 svg。0.2.2-rc.1 把图标包进 `span.navIcon` 之后 `> svg:first-child` 失配，齿轮重新露出，设置页「成就」一行会同时显示奖杯和齿轮。现在按 section id 注册图标组件，旧的 DOM 钩子与 CSS 一并删除。

**代价（有意为之）**：内核低于 0.2.2-rc.1 没有该插槽，图标退回宿主默认齿轮。

## [0.1.4] - 2026-10-18

### Changed

- 适配 DSH 0.2.1：`inject` 的 `webRuntime` 换成 `webStartup`，信任围栏改读 `ctx.webStartup.trustedHosts`。`webRuntime` 服务自 0.2.1-alpha.2 起被删除，保留旧名会让插件静默停在 PENDING（不报错、不崩溃，只是不加载）。
