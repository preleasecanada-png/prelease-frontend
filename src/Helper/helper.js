export const imageBaseUrl = (fileName) => {
    if (fileName && fileName !== '') {
        return `${process.env.NEXT_PUBLIC_BASE_LOCAL_IMAGE_HOST}/${fileName}`;
    }
    return '';
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
    if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        localStorage.removeItem('user_picture');
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_id');
        window.dispatchEvent(new Event('logout'));
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
        return null;
    }
    return response.json();
};