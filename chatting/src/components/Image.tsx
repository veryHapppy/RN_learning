import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { IconProps } from 'react-native-vector-icons/Icon';
import { useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';

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
    onPress?: () => void,
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
    showButton?: boolean,
    onChangeImage?: (uri:string) => void,
};

const Image = ({ uri, imageStyle, rounded=false, showButton=false, onChangeImage=(uri:string)=>{}}: ImageProps) => {
    const _handleEditButton = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                selectionLimit: 1,
                quality: 1,
            })

            if (!result.didCancel) {
                onChangeImage(result.assets?.[0]?.uri || '');
            }
        } catch (e) {
            if (e instanceof Error) {
                Alert.alert('Photo Error', e.message)
            }
        }
    };

    return (
        <Container>
            <StyledImage source={{uri}} style={imageStyle} rounded={rounded}/>
            {showButton && <PhotoButton onPress={_handleEditButton  }/>}
        </Container>
    );
};

export default Image;