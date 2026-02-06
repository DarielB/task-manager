import { useState } from "react";
import { Plus, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next"; // 1. Importar o hook
import "./CreateTaskCard.css";
import "../../i18n";
interface CreateTaskCardProps {
  onAdd: (title: string, description: string, deadline: Date | null) => void;
}

export function CreateTaskCard({ onAdd }: CreateTaskCardProps) {
  const { t } = useTranslation(); // 2. Inicializar a tradução
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [isExpanding, setIsExpanding] = useState(false);

  function handleAdd() {
    if (!title.trim()) return;
    onAdd(title, description, deadline);
    setTitle("");
    setDescription("");
    setDeadline(null);
    setIsExpanding(false);
  }

  function handleCancel() {
    setIsExpanding(false);
    setDescription("");
    setTitle("");
    setDeadline(null);
  }

  return (
    <div className={`task-input-card ${isExpanding ? "expanded" : ""}`}>
      <div className="input-main-row">
        <Plus size={20} className="plus-icon" />
        <input
          type="text"
          placeholder={t("add_task")} // 3. Traduzido
          value={title}
          onFocus={() => setIsExpanding(true)}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleAdd()}
        />
        {!isExpanding && title.trim() && (
          <button className="add-task-btn-simple" onClick={handleAdd}>
            {t("create")} {/* 4. Traduzido */}
          </button>
        )}
      </div>

      {isExpanding && (
        <div className="input-expanded-content">
          <textarea
            placeholder={t("description")} // 5. Traduzido
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            autoFocus
          />

          <div className="input-footer-row">
            <div className="input-group-date">
              <label htmlFor="deadline">
                <Calendar size={14} /> {t("deadline")} {/* 6. Traduzido */}
              </label>
              <input
                id="deadline"
                type="date"
                value={deadline ? deadline.toISOString().split("T")[0] : ""}
                onChange={(e) =>
                  setDeadline(e.target.value ? new Date(e.target.value) : null)
                }
              />
            </div>

            <div className="input-actions">
              <button className="btn-minimal" onClick={handleCancel}>
                {t("cancel")} {/* 7. Traduzido */}
              </button>
              <button
                className="add-task-btn"
                onClick={handleAdd}
                disabled={!title.trim()}
              >
                {t("create")} {/* 8. Traduzido */}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
