export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "deployedURL";

export const LOCAL_STORAGE_TOKEN_NAME = "learnIT MERN";
