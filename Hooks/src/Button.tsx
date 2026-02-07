import React from 'react';
import styled from 'styled-components/native';

const Container = styled.Pressable`
    background-color: #3498db;
    border-radius: 15px;
    padding: 15px 30px;
    margin: 10px 0;
    justify-content: center;
`;

const Title = styled.Text`
    font-size: 24px;
    font-weight: 600;
    color: #ffffff;
`;

interface ButtonProps {
    title: string;
    onPress: () => void;
}

const Button = ({title, onPress}: ButtonProps) => {
    return (
        <Container onPress={onPress}>
            <Title>{title}</Title>
        </Container>
    );
};

export default Button;