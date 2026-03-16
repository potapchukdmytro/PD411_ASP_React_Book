export const setCookie = (key, value, expires = null) => {  
    if(expires) {
        document.cookie = `${key}=${value}; path=/; expires=${new Date(expires * 1000).toUTCString()};`;
    } else {
        document.cookie = `${key}=${value}; path=/;`;
    }
};

export const getCookie = (key) => {
    const nameEQ = key + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") {
            // Remove leading spaces
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            // Check if cookie name matches
            return c.substring(nameEQ.length, c.length); // Return the value
        }
    }
    return null; // Return null if not found
};

export const deleteCookie = (key) => {
    // Set a date in the past for immediate expiration
    document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
