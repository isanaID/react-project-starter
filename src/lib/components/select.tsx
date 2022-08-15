/* eslint-disable react/require-default-props */

import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Select as ChakraSelect,
  } from '@chakra-ui/react';
  
  interface SelectProps {
    label?: string;
    name?: string;
    value?: string | number;
    errorMessage?: string;
    helperText?: string;
    placeholder?: string;
    id?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    inputProps?: any;
    disabled?: boolean;
    options: Array<any>;
    itemText?: string;
    itemValue?: string;
    returnObject?: boolean;
    [key: string]: any;
  }
  
  function Select({
    label,
    name,
    value,
    errorMessage,
    helperText,
    placeholder,
    id,
    onChange,
    inputProps,
    disabled,
    options,
    itemText = 'label',
    itemValue = 'value',
    returnObject = false,
    ...customProps
  }: SelectProps): JSX.Element {
    const isInvalid = !!errorMessage;
  
    return (
      <FormControl {...customProps} isInvalid={isInvalid}>
        {label && <FormLabel htmlFor={id || label}>{label}</FormLabel>}
        <ChakraSelect
          id={id || label}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          {...inputProps}
        >
          {options.map((option: any, index: number) => (
            <option
              key={`${option[itemText]}-${index + 1}`}
              value={returnObject ? option : option[itemValue]}
            >
              {option[itemText]}
            </option>
          ))}
        </ChakraSelect>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>
    );
  }
  
  export {Select};
  