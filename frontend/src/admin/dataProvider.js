// in dataProvider.js
import { fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

const httpClient = (url, options = {}) => {
    // Modify query params
    const apiUrl = new URL(url);
    // Handle sort
    if (apiUrl.searchParams.get('sort')) {
        const [field = 'id', order = 'ASC'] = JSON.parse(apiUrl.searchParams.get('sort'));
        apiUrl.searchParams.set('sort', JSON.stringify({ [field]: order.toLowerCase() }));
    }
    // Handle limit and skip
    if (apiUrl.searchParams.get('range')) {
        const [start = 0, end = 9] = JSON.parse(apiUrl.searchParams.get('range'));
        apiUrl.searchParams.set('skip', start);
        apiUrl.searchParams.set('limit', end + 1 - start);
    }
    // Add authenticated user
    options.user = {
        authenticated: true,
        token: `Bearer ${localStorage.getItem('RA_AUTH_TOKEN')}` // Include the token
    };
    return fetchUtils.fetchJson(apiUrl, options);
};

export const dataProvider = simpleRestProvider(
    import.meta.env.VITE_BACKEND_URL,
    httpClient,
    'X-Total-Count'
);