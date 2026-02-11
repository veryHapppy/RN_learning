import styled from "styled-components/native";
import { StyleProp, ViewStyle } from 'react-native';

const TRANSPARENT = 'transparent';

interface ContainerProps {
    isFilled: boolean,
    disabled: boolean,
}
interface TitleProps {
    isFilled: boolean,
}
const Container = styled.TouchableOpacity<ContainerProps>`
    background-color: ${({ theme, isFilled})=> isFilled ? theme.buttonBackground : TRANSPARENT};
    align-items: center;
    border-radius: 4px;
    width: 100%;
    padding: 10px;
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)}
`;
const Title = styled.Text<TitleProps>`
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    color: ${({theme, isFilled}) => isFilled ? theme.buttonTitle : theme.buttonUndefilledTitle};
`;

interface ButtonProps {
    containerStyle?: StyleProp<ViewStyle>,
    title?: string,
    onPress: () => void,
    isFilled?: boolean,
    disabled?: boolean,
};
const Button = ({ containerStyle, title, onPress, isFilled=true, disabled=false}: ButtonProps) => {
    return (
        <Container
            style={containerStyle}
            onPress={onPress}
            isFilled={isFilled}
            disabled={disabled}>
                <Title isFilled={isFilled}>{title}</Title>
        </Container>
    );
};

export default Button;