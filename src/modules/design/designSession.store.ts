import { create } from "zustand";

export type DesignClass = {
  id: number;
  name: string;
  agentCount: number;
};

export type DesignFlow = {
  id: number;
  version: string;
  desainName: string;
  status: string;
  comment: string;
  last_updated: string;
}

export type FlowVersion = {
  id: string;
  version: string;
  createdAt: string;
  status: "DRAFT" | "PUBLISHED";
};

interface DesignClassState {
  classes: DesignClass[];
  dataFlow: DesignFlow[];
  selectedClass?: DesignClass;
  selectedFlow?: DesignFlow;
  isModalOpen: boolean;
  isModalFlowOpen: boolean;
  flowVersions: FlowVersion[];

  search: string;
  page: number;
  rowsPerPage: number;

  filteredClasses: DesignClass[];
  paginatedClasses: DesignClass[];
  totalPages: number;

  loadClasses: () => void;
  loadDesainFlow: () => void;
  setSearch: (value: string) => void;
  setPage: (page: number) => void;
  openClass: (cls: DesignClass) => void;
  closeModalFlow: () => void;
  closeModal: () => void;
  applyFilterAndPagination: () => void;
  selectClass: (cls: DesignClass) => void;
  openModal: () => void;
  openModalFlow: (flw: DesignFlow) => void;
}

export const useDesignClassStore = create<DesignClassState>((set, get) => ({
  classes: [],
  dataFlow: [],
  search: "",
  page: 1,
  rowsPerPage: 8,
  filteredClasses: [],
  paginatedClasses: [],
  totalPages: 1,
  selectedClass: undefined,
  selectedFlow: undefined,
  isModalOpen: false,
  isModalFlowOpen: false,
  flowVersions: [],
  flowDesainVersion: [],

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

  loadDesainFlow: () => {
    const dataFlow: DesignFlow[] = [
      { id: 1, version: "version 0.1", desainName: "Design 1", status: "Draft", comment: "this my comment", last_updated: "2/2/2024" },
      { id: 2, version: "version 0.2", desainName: "Design 2", status: "Draft", comment: "SPBU COCO", last_updated: "2/26/2024" },
      { id: 3, version: "version 0.3", desainName: "Design 3", status: "Draft", comment: "SPBU COCO", last_updated: "2/26/2024" },
      { id: 4, version: "version 0.4", desainName: "Design 4", status: "Draft", comment: "SPBU COCO", last_updated: "2/26/2024" },
      { id: 5, version: "version 0.5", desainName: "Design 5", status: "Draft", comment: "SPBU COCO", last_updated: "2/26/2024" },
      { id: 6, version: "version 0.6", desainName: "Design 6", status: "Draft", comment: "SPBU COCO", last_updated: "2/26/2024" },
      { id: 7, version: "version 0.7", desainName: "Design 7", status: "Draft", comment: "SPBU COCO", last_updated: "2/26/2024" },
      { id: 8, version: "version 0.8", desainName: "Design 8", status: "Draft", comment: "SPBU COCO", last_updated: "2/26/2024" },
      { id: 9, version: "version 0.9", desainName: "Design 9", status: "Draft", comment: "SPBU COCO", last_updated: "2/26/2024" },
    ];
    set({ dataFlow: dataFlow });
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

    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    set({
      filteredClasses: filtered,
      paginatedClasses: filtered.slice(start, end),
      totalPages,
    });
  },

  openClass: (cls) => {
    console.log("Pilih class ID:", cls.id)
    set({ selectedClass: cls });
    get().openModal();
  },

  selectClass: (cls) => {
    console.log("Klik class ID:", cls.id);
    set({ selectedClass: cls });
  },

  openModalFlow: (flw: DesignFlow) => {
    console.log("Flow ID:", flw.id)
    set({
      selectedFlow: flw,
      isModalFlowOpen: true
    });
  },

  closeModalFlow: () => {
    set({
      isModalFlowOpen: false
    })
  },

  openModal: () => {
    const cls = get().selectedClass;
    if (!cls) return;
    set({
      isModalOpen: true,
    });
  },

  closeModal: () =>
    set({
      isModalOpen: false,
      selectedClass: undefined,
      flowVersions: [],
    }),
}));
