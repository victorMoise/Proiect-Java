export function getStoredUsername() {
  const username = localStorage.getItem("username");
  return username ? username : null;
}
