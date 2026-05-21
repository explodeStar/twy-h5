
export const getTokenInfo = () => {
    const tokenInfo = localStorage.getItem("tokenInfo");
    return tokenInfo ? JSON.parse(tokenInfo) : null;
}

export const setTokenInfo = (tokenInfo) => {
    localStorage.setItem("tokenInfo", JSON.stringify(tokenInfo));
}

export const clearTokenInfo = () => {
    localStorage.removeItem("tokenInfo");
}

export const hasTokenInfo = () => {
    return !!getTokenInfo();
}