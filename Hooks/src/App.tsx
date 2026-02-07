import React from 'react';
import styled from 'styled-components/native';
import Counter from './Counter';
import Form from './Form';
import Length from './Length';
import Dog from './Dog';

const Container = styled.View`
    flex: 1;
    background-color: #ffffff;
    justify-content: center;
    align-items: center;
`;

const App = () => {
    return <Container>
        <Dog />
    </Container>
}

export default App;