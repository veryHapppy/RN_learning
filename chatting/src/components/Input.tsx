import { useState, forwardRef } from "react";
import styled from "styled-components/native";
import { TextInput } from 'react-native';

const Container = styled.View`
    flex-direction: column;
    width: 100%;
    margin: 10px 0;
`;
interface LabelProps {
    isFocused:boolean,
};
const Label = styled.Text<LabelProps>`
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 6px;
    color: ${({ theme, isFocused }) => (isFocused ? theme.text : theme.label)}
`;

const StyledTextInput = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.inputPlaceholder,
}))<LabelProps>`
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    padding: 20px 10px;
    font-size: 16px;
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme, isFocused }) => (isFocused ? theme.text : theme.inputBorder)};
    border-radius: 4px;
`;
interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void; // 선택적 속성으로 처리 (Optional)
  onBlur?: () => void;           // 선택적 속성으로 처리
  placeholder?: string;
  isPassword?: boolean;
  returnKeyType?: 'done' | 'next';
  maxLength?: number;
}
const Input = forwardRef<TextInput, InputProps>(
    ({
    label,
    value,
    onChangeText,
    onSubmitEditing,
    onBlur,
    placeholder,
    isPassword,
    returnKeyType,
    maxLength,
}, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <Container>
            <Label isFocused={isFocused}>{label}</Label>
            <StyledTextInput
                ref={ref}
                isFocused={isFocused}
                value= {value}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmitEditing}
                onFocus={()=>setIsFocused(true)}
                onBlur={()=>{
                    setIsFocused(false);
                    onBlur?.();
                }}
                placeholder={placeholder}
                secureTextEntry={isPassword}
                returnKeyType={returnKeyType}
                maxLength={maxLength}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="none"
                underlineColorAndroid="transparent"
            />
        </Container>
    );
}
);

export default Input;