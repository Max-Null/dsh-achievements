/**
 * @max-null/dsh-achievements host half: the achievements engine for the SSiD
 * family. Observes the session/tool event plane, folds leaf scalars into
 * durable counters, unlocks trophies (toast queue + HTTP + tool view), and
 * serves /achievements/api to the browser half. Privacy: counters only —
 * tool names, event kinds, token counts; message/file/error content is never
 * read. The GenUI category is merged by the client reading the genui
 * plugin's own localStorage counters.
 */
import type { Context } from '@deepseek-ai/cordis'
import { AchievementsEngine, attachListeners, registerRoutes, registerTool } from './engine.ts'

export const name = '@max-null/dsh-achievements'
export const inject = ['tools', 'webServer', 'webStartup']

export function apply(ctx: Context): void {
  const engine = new AchievementsEngine()
  attachListeners(ctx, engine)
  registerRoutes(ctx, engine)
  registerTool(ctx, engine)
  // 会话计数不再在此处订阅 `agent/session-start`：该事件在 DSH 0.1.7 已不存在
  // （0.1.5 在 `core/agent/src/runtime-types.ts`），而 cordis 对未知事件名静默，
  // 监听它不会报错、只是永不触发——`sessions` 因此恒为 0、`first-session` 永久
  // 不解锁。现改由 `attachListeners` 里的 `session/event` 按每会话首个 `turn/start`
  // 记账（不选 `agent/created`：那是可否决的 serial 监听，抛错会挡住 agent 创建）。
  ctx.on('agent/turn-stopping' as never, (() => {
    engine.recordTurn()
    engine.flush()
  }) as never)
}

export { AchievementsEngine } from './engine.ts'
export { ACHIEVEMENTS, checkUnlocks, emptyState, snapshot, viewOf } from './rules.ts'
export type { AchieveState, AchievementDef, Category, Rarity } from './rules.ts'
