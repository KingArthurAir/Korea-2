# Mac mini M5 每日新闻搜集任务

## 任务设置

**时间：** 每天早上 10:00  
**频道：** Telegram (当前会话)  
**内容：** Mac mini M5 最新发布信息前 10 条

## 执行方式

### 方案 1：系统 Cron（推荐）

```bash
# 编辑 crontab
crontab -e

# 添加以下行（每天 10 点执行）
0 10 * * * /Users/wangyiming/.openclaw/workspace/scripts/mac-mini-m5-daily.sh
```

### 方案 2：OpenClaw Heartbeat

在 `HEARTBEAT.md` 中添加：
```markdown
- [ ] 检查 Mac mini M5 最新新闻（每天 10 点）
```

## 搜索关键词

- Mac mini M5
- Mac mini M5 Pro
- Apple M5 chip 2026
- Mac mini 2026 release date
- 苹果 M5 Mac mini 发布时间

## 信息来源

- MacWorld
- IT 之家
- MacRumors
- 9to5Mac
- 彭博社 Mark Gurman
- 知乎/什么值得买

---

**创建时间：** 2026-03-29  
**状态：** ⏳ 待设置定时任务
