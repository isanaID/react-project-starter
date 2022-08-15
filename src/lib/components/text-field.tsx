/* eslint-disable react/require-default-props */

import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
  } from '@chakra-ui/react';
  
  interface TextFieldProps {
    label?: string;
    name?: string;
    value?: string | number;
    errorMessage?: string;
    helperText?: string;
    placeholder?: string;
    id?: string;
    type?:
      | 'text'
      | 'number'
      | 'password'
      | 'email'
      | 'tel'
      | 'search'
      | 'url'
      | 'address'
      | 'date';
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    inputProps?: any;
    disabled?: boolean;
    [key: string]: any;
  }
  
  function TextField({
    label,
    name,
    value,
    errorMessage,
    helperText,
    placeholder,
    id,
    type = 'text',
    onChange,
    inputProps,
    disabled,
    ...customProps
  }: TextFieldProps): JSX.Element {
    const isInvalid = !!errorMessage;
  
    return (
      <FormControl {...customProps} isInvalid={isInvalid}>
        {label && <FormLabel htmlFor={id || label}>{label}</FormLabel>}
        <Input
          id={id || label}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          {...inputProps}
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>
    );
  }
  
  export {TextField};
  