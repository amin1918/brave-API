export function getApiURL(expected){
    return process.env.API_URL?? `http://localhost:8000/${expected}`;
}
