const scenarios = [
  {
    task: "今晚 7 点和朋友吃饭，帮我安排路线、提醒和预算。",
    agents: ["意图解析 Agent：识别时间、地点、人际关系", "地图 Agent：估算通勤路线", "日历 Agent：写入提醒", "预算 Agent：生成消费上限"],
    plan: ["询问/读取餐厅位置并计算出发时间", "创建 18:20 出发提醒和 19:00 聚餐日历", "估算交通 + 餐费预算 180 元", "⚠️ 发出最终确认，不自动付款或发消息"]
  },
  {
    task: "我明天要早起出差，帮我整理手机里的行程安排。",
    agents: ["邮件 Agent：提取机票和酒店信息", "日历 Agent：生成时间线", "闹钟 Agent：设置早起提醒", "风险校验 Agent：确认敏感操作"],
    plan: ["提取航班、酒店、会议地址", "生成从起床到抵达的行动清单", "设置 2 个闹钟和出门提醒", "⚠️ 行程摘要保存到备忘录前确认"]
  },
  {
    task: "帮我把今天拍的照片整理成朋友圈文案，但先别发布。",
    agents: ["相册 Agent：筛选清晰照片", "视觉 Agent：识别场景主题", "文案 Agent：生成 3 种风格", "发布守门 Agent：禁止自动发布"],
    plan: ["选出 9 张构图最佳照片", "提炼关键词：城市、夜景、朋友", "生成松弛感 / 高级感 / 幽默版文案", "⚠️ 等待用户确认后再跳转发布页"]
  },
  {
    task: "周末想约人打羽毛球，帮我找场地、凑人、发通知。",
    agents: ["搜索 Agent：查找附近羽毛球馆", "通讯录 Agent：筛选球友", "消息 Agent：起草群发邀请", "风险校验 Agent：确认发送对象"],
    plan: ["查询 3 公里内场馆空余时段", "从通讯录筛选标记为「球友」的联系人", "生成包含时间地点的邀请消息", "⚠️ 群发前逐条确认接收人"]
  },
  {
    task: "月底了，帮我汇总这个月的消费情况，生成报告。",
    agents: ["支付 Agent：读取账单流水", "分类 Agent：归类消费类型", "图表 Agent：生成可视化摘要", "隐私 Agent：脱敏金额信息"],
    plan: ["拉取本月支付宝 + 微信账单", "按餐饮/交通/购物/娱乐分类汇总", "生成消费占比图和趋势曲线", "⚠️ 报告仅本地保存，不上传云端"]
  }
];

const taskText = document.querySelector('#taskText');
const agentList = document.querySelector('#agentList');
const planList = document.querySelector('#planList');
const taskCard = document.querySelector('#taskCard');
const planCard = document.querySelector('#planCard');
const agentStatus = document.querySelector('#agentStatus');
let index = 0;

function renderScenario(scenario, animate = true) {
  taskText.textContent = scenario.task;

  agentList.innerHTML = scenario.agents.map(agent =>
    `<div class="agent"><span class="dot"></span>${agent}</div>`
  ).join('');

  planList.innerHTML = scenario.plan.map(item =>
    `<li>${item}</li>`
  ).join('');

  if (animate) {
    agentStatus.textContent = '正在切换任务…';
    taskCard.classList.add('fade-out');
    planCard.classList.add('fade-out');
    agentList.style.opacity = '0';

    requestAnimationFrame(() => {
      taskCard.classList.remove('fade-out');
      taskCard.classList.add('fade-in');
      agentList.style.opacity = '1';
      planCard.classList.remove('fade-out');
      planCard.classList.add('fade-in');
    });

    setTimeout(() => {
      agentStatus.textContent = '多 Agent 正在协作';
      taskCard.classList.remove('fade-in');
      planCard.classList.remove('fade-in');
    }, 600);
  }
}

document.querySelector('#randomTaskBtn').addEventListener('click', () => {
  index = (index + 1) % scenarios.length;
  renderScenario(scenarios[index]);
});

renderScenario(scenarios[index], false);
