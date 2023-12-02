



export const getAuthOfStorage = () => Number(sessionStorage.getItem("authType")) || 0;

export const setAuthStorage = (authType:number) => sessionStorage.setItem("authType",String(authType))