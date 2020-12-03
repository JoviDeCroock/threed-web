import React from 'react';
import { styled } from 'goober';

export const TextField = ({ disabled, className, onChange, name, value, type, label, placeholder, cols }) => {
  return (
    <Wrapper className={className} multiline={type === 'multiline'}>
      {label && <label htmlFor={name}>{label}</label>}
      <Input
        as={type === 'multiline' ? 'textarea' : 'input'}
        cols={cols}
        disabled={disabled}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        type={type}
      />
    </Wrapper>
  );
}

const Wrapper = styled('div')`
  align-items: center;
  display: flex;
  margin-bottom: 12px;

  > label {
    align-self: ${p => (p.multiline ? 'flex-start' : 'unset')};
    width: 100px;
  }

  > input, textarea {
    width: 400px;
  }
`;

const Input = styled('input')`
  background-color: white;
  border: 0;
  border-bottom: 1px solid grey;
  &:focus {
    border-bottom-color: blue;
  }
`;


