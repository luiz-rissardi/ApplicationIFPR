



export const getAuthOfStorage = () => Number(sessionStorage.getItem("authType")) || 0;
export const getUserNameStorage = () => sessionStorage.getItem("userName") || "";

export const setAuthStorage = (authType: number) => sessionStorage.setItem("authType", String(authType))
export const setUserNameStorage = (userName: string) => sessionStorage.setItem("userName", userName)

export const setProductIdUserAnexed = (productId: number) => sessionStorage.setItem("productIdAnexed",String(productId));
export const getProductIdUserAnexed = () => sessionStorage.getItem("productIdAnexed") || "";