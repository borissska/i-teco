import styles from "./BodyEl.module.scss"

export const statusClassMap: Record<string, string> = {
    "В процессе": styles.inProgress,
    "Завершено": styles.completed,
    "Отклонено": styles.rejected,
    "Работает": styles.operational,
    "Остановлено": styles.stopped,
    "Техническое обслуживание": styles.maintenance,
  };