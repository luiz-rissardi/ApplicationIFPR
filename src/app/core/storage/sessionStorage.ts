



export const getUserNameStorage = () => sessionStorage.getItem("userName") || "";
export const setUserNameStorage = (userName: string) => sessionStorage.setItem("userName", userName)
