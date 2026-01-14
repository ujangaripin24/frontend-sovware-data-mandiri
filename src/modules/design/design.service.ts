import { DESIGN_CLASSES } from "./design.mock";

export const DesignService = {
  getClasses: async () => {
    await new Promise((r) => setTimeout(r, 500));
    return DESIGN_CLASSES;
  },

  getFlowsByClass: async (classId: string) => {
    await new Promise((r) => setTimeout(r, 500));
    return DESIGN_CLASSES.find(c => c.id === classId)?.flows ?? [];
  },
};