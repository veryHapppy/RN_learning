import React from 'react';
import styled from 'styled-components/native';
import { useFetch } from './hooks/useFetch';
import Button from './Button';

const StyledImage = styled.Image`
    background-color: #7f8c8d;
    width: 300px;
    height: 300px;
`;
const ErrorMessage = styled.Text`
    font-size: 18px;
    color: #e74c3c;
`;
const LoadingMessage = styled.Text`
    font-size: 18px;
    color: #2ecc71;
`;

const URL = 'https://dog.ceo/api/breeds/image/random';


const Dog = () => {
    const {data, error, inProgress, setCount} = useFetch(URL);

    return (
        <>
            {inProgress && <LoadingMessage>Loading...</LoadingMessage>}
            <StyledImage source={data ? {uri: data.message} : undefined} />
            <ErrorMessage>{error?.message}</ErrorMessage>
            <Button 
                title="Fetch New Dog" 
                onPress={() => {
                    setCount((count) => count + 1);
                    }
                }
            />
        </>
    );
};

export default Dog;