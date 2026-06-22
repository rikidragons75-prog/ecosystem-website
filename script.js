// ===== ДАННЫЕ ЭТАПОВ =====
// Статусы: 'done', 'inprogress', 'todo', 'blocked'

const phases = [
  {
    id: 0,
    title: "Фаза 0: Фундамент",
    status: "done",
    tasks: [
      { text: "Создать GitHub репозиторий", done: true },
      { text: "Настроить Docker", done: true },
      { text: "Выбрать облачного провайдера", done: false },
      { text: "Создать сайт-витрину", done: true },
    ],
  },
  {
    id: 1,
    title: "Фаза 1: Ядро и безопасность",
    status: "inprogress",
    tasks: [
      { text: "Сервис авторизации (/register, /login)", done: false },
      { text: "JWT токены (Access + Refresh)", done: false },
      { text: "API Gateway (прокси для модулей)", done: false },
      { text: "База данных PostgreSQL", done: false },
    ],
  },
  {
    id: 2,
    title: "Фаза 2: Телеграм-Бот",
    status: "todo",
    tasks: [
      { text: "Создать бота в @BotFather", done: false },
      { text: "Привязка аккаунта через ссылку", done: false },
      { text: "Команды /profile и /remind", done: false },
      { text: "Оповещения пользователей", done: false },
    ],
  },
  {
    id: 3,
    title: "Фаза 3: ИИ-Модуль (Джарвис)",
    status: "todo",
    tasks: [
      { text: "Интеграция Whisper (голос → текст)", done: false },
      { text: "Настройка System Prompt для GPT", done: false },
      { text: "Создание задач из голоса", done: false },
      { text: "Векторная БД для памяти (RAG)", done: false },
    ],
  },
  {
    id: 4,
    title: "Фаза 4: Планировщик",
    status: "todo",
    tasks: [
      { text: "Модель данных (events, notes)", done: false },
      { text: "CRUD для событий", done: false },
      { text: "Связь заметок с календарем", done: false },
      { text: "Автоматические напоминания", done: false },
    ],
  },
  {
    id: 5,
    title: "Фаза 5: Игры и Мессенджер",
    status: "todo",
    tasks: [
      { text: "Создать комнаты (чат)", done: false },
      { text: "WebSocket для живых сообщений", done: false },
      { text: "Арендовать VPS под Minecraft", done: false },
      { text: "Вайтлист через API", done: false },
    ],
  },
  {
    id: 6,
    title: "Фаза 6: Монетизация и дизайн",
    status: "todo",
    tasks: [
      { text: "Баланс и подписки (ЮKassa)", done: false },
      { text: "Ограничения для ИИ", done: false },
      { text: "Сделать дизайн в Figma", done: false },
      { text: "Фронтенд на React", done: false },
    ],
  },
];

// ===== ФУНКЦИЯ РЕНДЕРИНГА =====

function renderPhases() {
  const container = document.getElementById("phases-container");
  if (!container) return;

  // Статусы для отображения
  const statusMap = {
    done: { label: "✅ Готово", class: "badge-done" },
    inprogress: { label: "⏳ В работе", class: "badge-inprogress" },
    todo: { label: "⬜ Не начато", class: "badge-todo" },
    blocked: { label: "❌ Заблокировано", class: "badge-blocked" },
  };

  let html = "";

  phases.forEach((phase) => {
    // Считаем прогресс
    const total = phase.tasks.length;
    const completed = phase.tasks.filter((t) => t.done).length;
    const progressPercent = total === 0 ? 0 : Math.round((completed / total) * 100);

    // Собираем задачи
    let tasksHtml = "";
    phase.tasks.forEach((task) => {
      let className = "";
      if (task.done) className = "done";
      // Если задача не выполнена, но фаза inprogress — помечаем как inprogress
      else if (phase.status === "inprogress") className = "inprogress";
      tasksHtml += `<li class="${className}">${task.text}</li>`;
    });

    const statusInfo = statusMap[phase.status] || statusMap.todo;

    html += `
      <div class="phase-card">
        <div class="phase-header">
          <h3>${phase.title}</h3>
          <span class="badge ${statusInfo.class}">${statusInfo.label}</span>
        </div>
        <ul class="task-list">
          ${tasksHtml}
        </ul>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progressPercent}%"></div>
        </div>
        <span class="progress-text">${progressPercent}%</span>
      </div>
    `;
  });

  container.innerHTML = html;
}

// ===== ЗАПУСК ПРИ ЗАГРУЗКЕ =====
document.addEventListener("DOMContentLoaded", renderPhases);