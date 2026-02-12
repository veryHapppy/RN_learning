import { StatusBar} from "react-native";
import { ThemeProvider } from 'styled-components/native';
import { theme } from "./theme";
import Navigation from "./navigations";
import { ProgressProvider } from "./contexts";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <ProgressProvider>
                <StatusBar barStyle="dark-content" />
                <Navigation />
            </ProgressProvider>
        </ThemeProvider>
    );
};

export default App;