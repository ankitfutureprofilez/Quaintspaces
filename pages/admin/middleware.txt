export const checkAuthentication = async () => {
    const token = localStorage.getItem("Admintoken");
    const isAuthenticated = !!token;
    return isAuthenticated;
};