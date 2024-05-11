import { defineStore } from "pinia";

export const useMiscStore = defineStore({
  id: "misc",
  state: () => {
    return {
      userMenuShown: true,
      menuCollapsed: false,
    };
  },
  persist: true,
  actions: {
    toggleUserMenu() {
      this.userMenuShown = !this.userMenuShown;
    },
    showMenu() {
      this.menuCollapsed = false;
    },
    hideMenu() {
      this.menuCollapsed = true;
    },
  },
});
