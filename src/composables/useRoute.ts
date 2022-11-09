import { getCurrentInstance, computed } from "vue";

export default () => {
  const instance = getCurrentInstance();

  return {
    route: computed(() => instance?.proxy.$root.$route)
  };
};
