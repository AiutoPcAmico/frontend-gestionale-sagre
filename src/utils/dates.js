function formatDateTime(value) {
  const data = new Date(value);
  const onlyDate =
    ("0" + data.getDate()).slice(-2) +
    "/" +
    ("0" + (data.getMonth() + 1)).slice(-2) +
    "/" +
    data.getFullYear();
  return onlyDate + " " + data.toLocaleTimeString("it-IT");
}

export { formatDateTime };
