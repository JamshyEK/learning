export const addAuthHeader = (headers: Headers) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (user?.token) {
    headers.set("authorization", `Bearer ${user?.token}`);
  }

  return headers;
};
