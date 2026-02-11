import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import config from '../../firebase.json'

const app = initializeApp(config);

const auth = getAuth(app);

export const login = async ({ email, password}) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
};

export const signup = async ({ email, password }) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    return user;
}