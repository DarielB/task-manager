import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: {
        translation: {
          my_day: "Meu Dia",
          important: "Importante",
          planned: "Planejado",
          completed: "Concluído",
          search: "Buscar tarefas...",
          add_task: "Adicionar uma tarefa...",
          create: "Criar Tarefa",
          cancel: "Cancelar",
          deadline: "Prazo",
          description: "Descrição",
          save: "Salvar Alterações",
          edit_task_details: "Detalhes da Tarefa",
          title_label: "Título",
          title_placeholder: "Título da tarefa",
          description_placeholder: "Adicione uma descrição detalhada...",
          today: "Hoje",
          loading: "Carregando...",
          logout: "Sair",
        },
      },
      en: {
        translation: {
          my_day: "My Day",
          important: "Important",
          planned: "Planned",
          completed: "Completed",
          search: "Search tasks...",
          add_task: "Add a task...",
          create: "Create Task",
          cancel: "Cancel",
          deadline: "Deadline",
          description: "Description",
          save: "Save Changes",
          edit_task_details: "Task Details",
          title_label: "Title",
          title_placeholder: "Task title",
          description_placeholder: "Add a detailed description...",
          today: "Today",
          loading: "Loading...",
          logout: "Logout",
        },
      },
      fr: {
        translation: {
          my_day: "Ma Journée",
          important: "Important",
          planned: "Planifié",
          completed: "Terminé",
          search: "Rechercher des tâches...",
          add_task: "Ajouter une tâche...",
          create: "Créer une tâche",
          cancel: "Annuler",
          deadline: "Échéance",
          description: "Description",
          save: "Enregistrer les modifications",
          edit_task_details: "Détails de la tâche",
          title_label: "Titre",
          title_placeholder: "Titre de la tâche",
          description_placeholder: "Ajouter une description détaillée...",
          today: "Aujourd'hui",
          loading: "Chargement...",
          logout: "Se déconnecter",
        },
      },
    },
    fallbackLng: "pt",
    interpolation: { escapeValue: false },
  });

export default i18n;
