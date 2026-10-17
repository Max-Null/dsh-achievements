import { AchievementsEngine, attachListeners, registerRoutes, registerTool } from "./engine.js";
export const name = '@max-null/dsh-achievements';
export const inject = ['tools', 'webServer', 'webStartup'];
export function apply(ctx) {
    const engine = new AchievementsEngine();
    attachListeners(ctx, engine);
    registerRoutes(ctx, engine);
    registerTool(ctx, engine);
    // 会话计数不再在此处订阅 `agent/session-start`：该事件在 DSH 0.1.7 已不存在
    // （0.1.5 在 `core/agent/src/runtime-types.ts`），而 cordis 对未知事件名静默，
    // 监听它不会报错、只是永不触发——`sessions` 因此恒为 0、`first-session` 永久
    // 不解锁。现改由 `attachListeners` 里的 `session/event` 按每会话首个 `turn/start`
    // 记账（不选 `agent/created`：那是可否决的 serial 监听，抛错会挡住 agent 创建）。
    ctx.on('agent/turn-stopping', (() => {
        engine.recordTurn();
        engine.flush();
    }));
}
export { AchievementsEngine } from "./engine.js";
export { ACHIEVEMENTS, checkUnlocks, emptyState, snapshot, viewOf } from "./rules.js";
