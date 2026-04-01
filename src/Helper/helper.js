export const imageBaseUrl = (fileName) => {
    if (fileName != '') {
        let fileBaseUrl = `${process.env.NEXT_PUBLIC_BASE_LOCAL_IMAGE_HOST}/${fileName}`;
        return fileBaseUrl;
    }
}

export const stringSplit = (str, maxLength = 12) => {
    if (!str) return '';
    return str.length > maxLength ? str.slice(0, maxLength - 3) + '...' : str;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_HOST;

export const authFetch = async (url, options = {}) => {
    const token = localStorage?.getItem("token");
    const headers = new Headers(options.headers || {});
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    const response = await fetch(`${baseUrl}${url}`, {
        ...options,
        headers,
    });
    return response.json();
};