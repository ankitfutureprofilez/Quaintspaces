import React from "react";
import { create } from "zustand";

const pageOptions = ['DASHBOARD', 'INTEGRATIONS', 'SETTINGS', 'CALENDAR', 'TIMEOFF', 'PROJECTS',  'BENEFITS', 'DOCUMENTS', 'SUPPORT'];

const useCentralStore = create((set, get) => ({
    activePage: 'DASHBOARD',
    setActivePage: (page) => set({ activePage: page }),

    isSidebarOpen: false,
    toggleSidebar: () => set({ isSidebarOpen: !get().isSidebarOpen }),
    setIsSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen })
}));

const Store = () => {
    return <div>
    </div>;
}

export default Store;
