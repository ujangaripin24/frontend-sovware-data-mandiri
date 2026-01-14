import { create } from "zustand";

export type DesignClass = {
  id: number;
  name: string;
  agentCount: number;
};

interface DesignClassState {
  applyFilterAndPagination(): unknown;
  classes: DesignClass[];

  search: string;
  page: number;
  rowsPerPage: number;

  filteredClasses: DesignClass[];
  paginatedClasses: DesignClass[];
  totalPages: number;

  loadClasses: () => void;
  setSearch: (value: string) => void;
  setPage: (page: number) => void;
}

export const useDesignClassStore = create<DesignClassState>((set, get) => ({
  classes: [],

  search: "",
  page: 1,
  rowsPerPage: 8,

  filteredClasses: [],
  paginatedClasses: [],
  totalPages: 1,

  loadClasses: () => {
    const data: DesignClass[] = [
      { id: 1, name: "S2RE", agentCount: 1 },
      { id: 2, name: "S2REDV", agentCount: 1 },
      { id: 3, name: "MULTIRPGTEST", agentCount: 1 },
      { id: 4, name: "MULTIRPG", agentCount: 1 },
      { id: 5, name: "S2RE-COCO", agentCount: 1 },
      { id: 6, name: "S2RE-DODO", agentCount: 1 },
      { id: 7, name: "METRICTEST", agentCount: 6 },
      { id: 8, name: "S2RE-SIMULATOR", agentCount: 6001 },
      { id: 9, name: "S2REGENT-1.1.0", agentCount: 1 },
      { id: 10, name: "DATATESTING", agentCount: 1 },
    ];

    set({ classes: data });
    get().applyFilterAndPagination();
  },

  setSearch: (value) => {
    set({ search: value, page: 1 });
    get().applyFilterAndPagination();
  },

  setPage: (page) => {
    set({ page });
    get().applyFilterAndPagination();
  },

  applyFilterAndPagination: () => {
    const { classes, search, page, rowsPerPage } = get();

    const filtered = classes.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.max(
      1,
      Math.ceil(filtered.length / rowsPerPage)
    );

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    set({
      filteredClasses: filtered,
      paginatedClasses: filtered.slice(start, end),
      totalPages,
    });
  },
}));
