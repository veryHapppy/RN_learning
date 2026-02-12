import { useState, createContext, ReactNode } from "react";

const ProgressContext = createContext<ProgressContextType>({
    inProgress: false,
    spinner: {
        start: () => {},
        stop: () => {},
    },
});

interface ProgressContextType {
    inProgress: boolean,
    spinner: {
        start: () => void;
        stop: () => void;
    };
}
interface ProgressProviderProps {
    children: ReactNode;
}

const ProgressProvider = ( {children}: ProgressProviderProps) => {
    const [inProgress, setInProgress] = useState(false);
    const spinner = {
        start: () => setInProgress(true),
        stop: () => setInProgress(false),
    };
    const value: ProgressContextType = { inProgress, spinner};
    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    );
};

export { ProgressProvider, ProgressContext };