export function getStoredUsername() {
  const username = localStorage.getItem("userRole");
  return username ? username : null;
}
