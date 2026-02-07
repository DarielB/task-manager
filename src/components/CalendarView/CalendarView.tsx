import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../../i18n";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  parseISO,
} from "date-fns";

import { ptBR, fr, enUS } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Todo } from "../../services/todos";
import "./CalendarView.css";

interface CalendarViewProps {
  todos: Todo[];
  onEditTask: (task: Todo) => void;
}

export function CalendarView({ todos, onEditTask }: CalendarViewProps) {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language.startsWith("fr")
    ? fr
    : i18n.language.startsWith("en")
      ? enUS
      : ptBR;

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { locale: currentLocale });
  const endDate = endOfWeek(monthEnd, { locale: currentLocale });

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const weekDays = i18n.language.startsWith("fr")
    ? ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
    : i18n.language.startsWith("en")
      ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      : ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return (
    <div className="full-calendar-wrapper">
      <header className="calendar-header">
        {/* Mês e Ano traduzidos automaticamente pelo format + locale */}
        <h2>{format(currentMonth, "MMMM yyyy", { locale: currentLocale })}</h2>

        <div className="calendar-nav">
          <button onClick={prevMonth}>
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setCurrentMonth(new Date())}
            className="btn-today"
          >
            {t("today")} {/* Traduzido do i18n.ts */}
          </button>
          <button onClick={nextMonth}>
            <ChevronRight size={20} />
          </button>
        </div>
      </header>

      <div className="calendar-grid">
        {/* Dias da Semana dinâmicos */}
        {weekDays.map((day) => (
          <div key={day} className="weekday-label">
            {day}
          </div>
        ))}

        {/* Células dos Dias */}
        {calendarDays.map((day) => {
          const dayTodos = todos.filter((todo) => {
            if (!todo.deadline) return false;
            const d =
              typeof todo.deadline === "string"
                ? parseISO(todo.deadline)
                : todo.deadline;
            return isSameDay(d, day);
          });

          return (
            <div
              key={day.toString()}
              className={`calendar-day ${!isSameMonth(day, monthStart) ? "off-month" : ""} ${isSameDay(day, new Date()) ? "today" : ""}`}
            >
              <span className="day-number">{format(day, "d")}</span>
              <div className="day-tasks">
                {dayTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`calendar-task-item ${todo.completed ? "task-done" : ""}`}
                    onClick={() => onEditTask(todo)}
                  >
                    {todo.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
