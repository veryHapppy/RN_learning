import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { IconProps } from 'react-native-vector-icons/Icon';

const Container = styled.View`
    align-self: center;
    margin-bottom: 30px;
`;

interface StyledImageProps {
    rounded: boolean
}
const StyledImage = styled.Image<StyledImageProps>`
    background-color: ${({ theme }) => theme.imageBackground};
    width: 100px;
    height: 100px;
    border-radius: ${({ rounded }) => (rounded ? 50 : 0)}px;
`;
const ButtonContainer = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.imageButtonBackground};
    position: absolute;
    bottom: 0;
    right: 0;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
`;
const ButtonIcon = styled(MaterialIcons).attrs<Partial<IconProps>>(({ theme }) => ({
    name: 'photo-camera',
    size: 22,
}))`
    color: ${({ theme }) => theme.imageButtonIcon};
`;
interface PhotoButtonProps {
    onPress: () => void,
}
const PhotoButton = ( {onPress} : PhotoButtonProps) => {
    return (
        <ButtonContainer onPress={onPress}>
            <ButtonIcon />
        </ButtonContainer>
    )
}

interface ImageProps {
    uri?: string,
    imageStyle?: object,
    rounded?: boolean,
};

const Image = ({ uri, imageStyle, rounded=false}: ImageProps) => {
    return (
        <Container>
            <StyledImage source={{uri}} style={imageStyle} rounded={rounded}/>
        </Container>
    );
};

export default Image;