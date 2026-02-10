import styled from 'styled-components/native';

const Container = styled.View`
    align-self: center;
    margin-bottom: 30px;
`;

const StyledImage = styled.Image`
    background-color: ${({ theme }) => theme.imageBackground};
    width: 100px;
    height: 100px;
`;

interface ImageProps {
    uri?: string,
    imageStyle?: object,
};

const Image = ({ uri, imageStyle }: ImageProps) => {
    return (
        <Container>
            <StyledImage source={{uri}} style={imageStyle} />
        </Container>
    );
};

export default Image;