import create, {SetState, GetState} from 'zustand';

import {userPersistance, tokenPersistance} from '../persistance';

import {User} from '../constants';

const [setUserPersistance, getUserPersistance, removeUserPersistance] =
  userPersistance();

const [setTokenPersistance, getTokenPersistance, removeTokenPersistance] =
  tokenPersistance();

interface AuthState {
  user: User;
  isAuth: boolean;
  token: string;
}

interface AuthActions {
  getAuth: () => AuthState;
  setAuth: (payload: {data: User; token: string}) => void;
  setUser: (payload: User) => void;
  clearSession: () => void;
}

interface authContext extends AuthState, AuthActions {}

const stateDefault: AuthState = {
  user: {
    _id: '',
  email: '',
  name: '',
  role: '',
  fullname: '',
  phone: '',
  isActive: false,
  createAt: '',
  updateAt:  '',
  },
  token: '',
  isAuth: false,
};

const actions = (
  set: SetState<AuthState>,
  get: GetState<AuthState>,
): AuthActions => ({
  getAuth: () => {
    const currentState = get();
    let authState: AuthState = {...currentState};

    if (!currentState.isAuth) {
      const userProfile = getUserPersistance();
      const userToken = getTokenPersistance();

      if (userProfile?.email && userToken) {
        authState = {
          user: {...userProfile},
          token: userToken,
          isAuth: true,
        };
      }
    }

    set(state => ({
      ...state,
      user: {...authState.user},
      token: authState.token,
      isAuth: authState.isAuth,
    }));

    return authState;
  },

  setAuth: (payload: any) => {
    const token = payload.token.replace('Bearer ', '');

    setUserPersistance(payload);
    setTokenPersistance(token);

    set(state => ({
      ...state,
      user: {...payload},
      token,
      isAuth: true,
    }));
  },

  setUser: (payload: any) => {
    setUserPersistance(payload);

    set(state => ({
      ...state,
      user: {...payload},
    }));
  },

  clearSession: () => {
    removeUserPersistance();
    removeTokenPersistance();

    set(state => ({
      ...state,
      ...stateDefault,
    }));
  },
});

export const useAuth = create<authContext>((set, get) => ({
  ...stateDefault,
  ...actions(set, get),
}));
