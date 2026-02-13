import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut} from 'firebase/auth';
import config from '../../firebase.json'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

const app = initializeApp(config);

const auth = getAuth(app);

export const login = async ({ email, password}) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
};

const uploadImage = async uri => {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            resolve(xhr.response);
        };
        xhr.onerror = function(e) {
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });

    const user = auth.currentUser;
    const storage = getStorage();
    const ref = ref(storage, `/profile/${user.uid}/photo.png`);
    const snapshot = await uploadBytes(ref, blob, {contentType: 'image/png'});

    blob.close();
    return await getDownloadURL(snapshot.ref);
};

export const signup = async ({ email, password, name, photoUrl }) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    const storageUrl = photoUrl.startsWith("https")
        ? photoUrl
        : await uploadImage(photoUrl);

    await updateProfile(user, {
        displayName: name,
        photoURL: storageUrl,
    });
    
    return user;
};

export const logout = async () => {
    return await signOut(auth);
};

export const getCurrentUser = () => {
    const { uid, displayName, email, photoURL} = auth.currentUser;
    return { uid, name: displayName, email, photoUrl: photoURL };
};

export const updateUserPhoto = async photoUrl => {
    const user = auth.currentUser;
    const storageUrl = photoUrl.startsWith("https") ? photoUrl : await uploadImage(photoUrl);
    await user.updateProfile({ photoURL: storageUrl });
    return { name: user.displayName, email: user.email, photoUrl: user.photoURL};
};

export const DB = getFirestore(app);

export const createChannel = async ({title, description}) => {
    const newChannelRef = doc(collection(DB, "Channels"));
    const id = newChannelRef.id;
    const newChannel = {
        id,
        title,
        description,
        createAt: Date.now(),
    };
    await setDoc(newChannelRef, newChannel);
    return id;
}