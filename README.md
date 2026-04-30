# PocketAgent · 手机 AI 任务执行官

一个多 Agent 协作的手机端 AI Demo。用户输入一句话需求，系统自动拆解任务、模拟调用手机 App 能力，并生成带安全确认的执行计划。

## 在线预览

推荐使用本地静态服务预览，避免 `file://` 方式下 CSS/JS 被浏览器拦截：

```bash
./start-preview.command
```

脚本会启动本地服务并自动打开浏览器到 `http://127.0.0.1:8123/`。
服务会在当前 Terminal 窗口保持运行，按 `Ctrl+C` 可停止。

如果只想看它将执行什么命令：

```bash
./start-preview.command --dry-run
```

## 核心逻辑流

| Agent | 职责 |
| --- | --- |
| 🧠 意图解析 Agent | 识别用户真实目标、时间、地点和约束 |
| 📐 任务规划 Agent | 拆分子任务，决定执行顺序和 Token 预算 |
| 📱 App 工具 Agent | 模拟地图、日历、相册、消息、支付等手机能力 |
| 🛡️ 风险校验 Agent | 在高风险操作（付款、发消息、下单）前二次确认 |

## 技术栈

- 纯前端实现：HTML + CSS + Vanilla JS
- 零依赖，无需构建工具
- 响应式布局，适配桌面与移动端

## License

MIT
