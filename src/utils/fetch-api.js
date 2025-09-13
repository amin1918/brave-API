export default async function fetchAPI(url, options) {
  const { method = "GET", authToken, body, next } = options;

  const fetchOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
    ...(next && { next }),
  };

  try {
    const response = await fetch(url, fetchOptions);
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json") && response.ok) {
      return await response.json();
    } else {
      return { status: response.status, statusText: response.statusText };
    }
  } catch (error) {
    console.error(`Error ${method} data:`, error);
    throw error;
  }
}
