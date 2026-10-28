export const skillEditorDialogEn = {
  nameRequired: "Skill name is required.",
  contentRequired: "SKILL.md content is required.",
  editTitle: (name: string) => `Edit skill: ${name}`,
  newTitle: "New skill",
  editDescription:
    "Rewrite this skill's SKILL.md. Frontmatter (name, description) is validated on save.",
  createDescription:
    "Author a custom skill — YAML frontmatter plus markdown instructions. It becomes available to the agent and attachable to cron jobs.",
  name: "Name",
  categoryOptional: "Category (optional)",
  cancel: "Cancel",
  saving: "Saving…",
  saveChanges: "Save changes",
  createSkill: "Create skill",
} as const;
