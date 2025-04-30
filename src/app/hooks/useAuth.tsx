import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useAuthToken = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const idToken = await user.getIdToken();
                    setToken(idToken);  // Store the token in your state
                } catch (error) {
                    console.error("Error fetching token: ", error);
                }
            } else {
                setToken(null);  // Clear token when user is logged out
            }
        });

        return () => unsubscribe();  // Cleanup on unmount
    }, []);

    return token;
};

export default useAuthToken;
