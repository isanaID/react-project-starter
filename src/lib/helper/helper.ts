import {get} from 'lodash';

/**
 * Get the value of a key in an object, or a default value if the key does not exist
 * @param obj - The object to search.
 * @param key - The key to get the value for.
 * @param defaultValue - The default value to return if the key is not found.
 * @returns The value of the key in the object.
 */
export const getValueByKey = (
  obj: Record<string, unknown>,
  key: string,
  defaultValue: any,
): any => {
  return get(obj, key, defaultValue);
};

export const formatDateTime = (date: string): string => {
  const dateTime = new Date(date);
  return Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(dateTime);
};