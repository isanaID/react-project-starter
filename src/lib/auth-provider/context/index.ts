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
  clearSession: () => void;
}

interface authContext extends AuthState, AuthActions {}

const stateDefault: AuthState = {
  user: {
    id: '',
    email: '',
    name: '',
    role: '',
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

  setAuth: (payload: {data: User; token: string}) => {
    const token = payload.token.replace('Bearer ', '');

    setUserPersistance(payload.data);
    setTokenPersistance(token);

    set(state => ({
      ...state,
      user: {...payload.data},
      token,
      isAuth: true,
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
