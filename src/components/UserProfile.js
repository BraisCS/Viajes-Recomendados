import { useState, useEffect } from "react";
import { getUserProfileService } from "../services";

export const UserProfile = (idUser) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);

        const data = await getUserProfileService(idUser);
        setUser(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [idUser]);

  return { user, loading, error };
};
