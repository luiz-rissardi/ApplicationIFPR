



export const getAuthOfStorage = () => Number(sessionStorage.getItem("authType")) || 0;
export const getUserNameStorage = () => sessionStorage.getItem("userName") || "";

export const setAuthStorage = (authType: number) => sessionStorage.setItem("authType", String(authType))
export const setUserNameStorage = (userName: string) => sessionStorage.setItem("userName", userName)

export const setProductsIdUserAnexed = (productId: number) => sessionStorage.setItem("productIdAnexed",String(productId));
export const getProductsIdUserAnexed = () => sessionStorage.getItem("productIdAnexed") || "";