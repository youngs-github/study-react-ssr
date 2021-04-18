// reducer-types
const HomeType = 'Home/GetList';
const AboutType = 'About/GetList';
const UserType = 'User/GetList';
// reducer-state
const homeState = {
  list: [],
  status: false
};
const aboutState = {
  list: [],
  status: false
};
const userState = {
  list: [],
  status: false,
  userinfo: null
};
// reducer-action
export const getHomeList = () => async (dispatch, getState, axios) => {
  const { data, status } = await axios.get(
    'http://localhost:3010/api/home-list'
  );
  dispatch({
    type: HomeType,
    list: data.list,
    status: status
  });
};
export const getAboutList = () => async (dispatch, getState, axios) => {
  const { data, status } = await axios.get(
    'http://localhost:3010/api/about-list'
  );
  dispatch({
    type: AboutType,
    list: data.list,
    status: status
  });
};
export const getUserList = () => async (dispatch, getState, axios) => {
  const { data, status } = await axios.get(
    'http://localhost:3010/api/user-list'
  );
  dispatch({
    type: UserType,
    list: data.list,
    status: status,
    userinfo: {
      id: 1,
      name: 'youngs'
    }
  });
};
// reducer-reducer
export const homeReducer = (state = homeState, action) => {
  switch (action.type) {
    case HomeType:
      return {
        ...state,
        list: action.list,
        status: action.status
      };
    default:
      return state;
  }
};
export const aboutReducer = (state = aboutState, action) => {
  switch (action.type) {
    case AboutType:
      return {
        ...state,
        list: action.list,
        status: action.status
      };
    default:
      return state;
  }
};
export const userReducer = (state = userState, action) => {
  switch (action.type) {
    case UserType:
      return {
        ...state,
        list: action.list,
        status: action.status,
        userinfo: action.userinfo
      };
    default:
      return state;
  }
};
