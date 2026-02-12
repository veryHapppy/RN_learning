import { useContext } from "react";
import styled from "styled-components/native";
import { Button } from "react-native";
import { logout } from "../utils/firebase";
import { UserContext } from "../contexts";

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background}
`;

const Profile = () => {
    const { dispatch } = useContext(UserContext);

    const _handleLogoutButtonPress = async () => {
        try {
            await logout();
        } catch (e) {
            if (e instanceof Error) {
                console.log("[Profile] logout: ", e.message);
            };
        } finally {
            dispatch({email: null, uid: null});
        }
    }
    return (
        <Container>
            <Button title="logout" onPress={_handleLogoutButtonPress} />
        </Container>
    );
};

export default Profile;