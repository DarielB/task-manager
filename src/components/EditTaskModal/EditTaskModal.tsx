import { useState, useEffect } from "react";
import { X, AlignLeft, Type, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Todo } from "../../services/todos";

interface EditTaskModalProps {
  todo: Todo;
  onClose: () => void;
  onSave: (id: string, updates: Partial<Todo>) => Promise<void>;
}

export function EditTaskModal({ todo, onClose, onSave }: EditTaskModalProps) {
  const { t } = useTranslation();
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    if (todo.deadline) {
      const d = new Date(todo.deadline);
      setDeadline(d.toISOString().split("T")[0]);
    }
  }, [todo.deadline]);

  async function handleSave() {
    await onSave(todo.id, {
      title,
      description,
      deadline: deadline ? new Date(deadline + "T12:00:00") : null,
    });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{t("edit_task_details")}</h3>
          <button className="close-modal-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-input-group">
            <label>
              <Type size={16} /> {t("title_label")}
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("title_placeholder")}
            />
          </div>

          <div className="modal-input-group">
            <label>
              <AlignLeft size={16} /> {t("description")}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("description_placeholder")}
              rows={5}
            />
          </div>

          <div className="modal-input-group">
            <label>
              <Calendar size={16} /> {t("deadline")}
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="date-input"
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            {t("cancel")}
          </button>
          <button className="btn-save" onClick={handleSave}>
            {t("save")}
          </button>
        </div>
      </div>
    </div>
  );
}
