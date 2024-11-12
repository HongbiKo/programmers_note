// Home.tsx

import Button from '../components/common/Button';
import InputText from '../components/common/InputText';
import Title from '../components/common/Title';

const Home = () => {
  return (
    <>
      <Title size="large">제목 테스트</Title>
      <Button size="large" scheme="primary">버튼 테스트</Button>
      <InputText placeholder='여기에 입력하세요'/>
      <div>home body</div>
    </>
  );
}

export default Home;

// Title.tsx

import { styled } from 'styled-components'
import { ColorKey, HeadingSize } from '../../style/theme';

interface Props {
  children: React.ReactNode;
  size: HeadingSize;
  color?: ColorKey;
}

const Title = ({ children, size, color }:Props) => {
  return (
    <TitleStyle size={size} color={color}>{children}</TitleStyle>
  )
}

const TitleStyle = styled.h1<Omit<Props, "children">>`
  font-size : ${({theme, size}) => theme.heading[size].fontSize};
  color :  ${({theme, color}) => (color ? theme.colors[color] : theme.colors.primary)};
`;

export default Title;

// Button.tsx

import { styled } from 'styled-components'
import { ButtonScheme, ButtonSize } from '../../style/theme';

interface Props {
  children: React.ReactNode
  size: ButtonSize;
  scheme: ButtonScheme;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button = ({ children, size, scheme, disabled, isLoading }:Props) => {
  return (
    <ButtonStyle size={size} scheme={scheme} disabled={disabled} isLoading={isLoading}>{children}</ButtonStyle>
  )
}

const ButtonStyle = styled.button<Omit<Props, "children">>`
  font-size : ${({theme, size}) => theme.button[size].fontSize};
  padding : ${({theme, size}) => theme.button[size].padding};
  color : ${({theme, scheme}) => theme.buttonScheme[scheme].color};
  background-color: ${({theme, scheme}) => theme.buttonScheme[scheme].backgroundColor};
  border: 0;
  border-radius : ${({theme}) => theme.borderRadius.default};
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
  pointer-events : ${({disabled}) => (disabled ? "none" : "auto")};
  cursor : ${({disabled}) => (disabled ? 'none' : "pointer")};
`;

export default Button

// InputText.tsx

import React, { ForwardedRef } from 'react';
import styled from 'styled-components';

interface Props {
  placeholder?: string;
}

const InputText = React.forwardRef(({ placeholder }: Props, ref: ForwardedRef<HTMLInputElement>) => {
  return(
    <InputTextStyle placeholder={placeholder} ref={ref} />
  );
})

const InputTextStyle = styled.input.attrs({ type: "text"})`
  padding : 0.25rem 0.75rem;
  border : 1px solid ${({theme}) => theme.colors.border};
  border-radius : ${({theme}) => theme.borderRadius.default};
  font-size : 1rem;
  line-height : 1.5;
  color :  ${({theme}) => theme.colors.text}
`;

export default InputText;
