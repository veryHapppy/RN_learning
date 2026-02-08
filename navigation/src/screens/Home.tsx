import styled from 'styled-components/native';
import { Button } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

const Container = styled.View`
  align-items: center;
  background-color: #fff;
`;
const StyledText = styled.Text`
    font-size: 30px;
    margin-bottom: 10px;
`;

const Home = ({ navigation }: { navigation: NavigationProp<any> }) => {
    return (
        <Container>
            <StyledText>Home</StyledText>
            <Button 
                title="go to the list screen"
                onPress={() => navigation.navigate('List')} />
        </Container>
    );
};

export default Home;