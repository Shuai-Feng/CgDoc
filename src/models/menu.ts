export default {
  namespace: 'Menu',
  state: {
    cityId: '/home',
    menuName: localStorage.menuItem || '首页',
  },
  reducers: {
    Switch(state: any, action: any) {
      if (action.menuName) {
        localStorage.menuName = action.menuName;
      }
      return {
        ...state,
        menuName: action.menuName,
      };
    },
  },
};
