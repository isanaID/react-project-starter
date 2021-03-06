import * as storage from '../../storage';

import {TOKEN_STORAGE_KEY, USER_STORAGE_KEY, User} from '../constants';

type userPersistance = [(payload: User) => void, () => User, () => void];
type tokenPersistance = [(token: string) => void, () => string, () => void];

export function userPersistance(): userPersistance {
  function set(payload: User): void {
    return storage.setStorage(USER_STORAGE_KEY, payload);
  }

  function get(): User {
    return storage.getStorage(USER_STORAGE_KEY);
  }

  function remove(): void {
    storage.removeItemStorage(USER_STORAGE_KEY);
  }

  return [set, get, remove];
}

export function tokenPersistance(): tokenPersistance {
  function set(token: string): void {
    return storage.setStorage(TOKEN_STORAGE_KEY, token);
  }

  function get(): string {
    return storage.getStorage(TOKEN_STORAGE_KEY);
  }

  function remove(): void {
    storage.removeItemStorage(TOKEN_STORAGE_KEY);
  }

  return [set, get, remove];
}
