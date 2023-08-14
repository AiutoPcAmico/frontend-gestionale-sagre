function formatDateTime(value) {
  const data = new Date(value);
  return (
    data.toLocaleDateString("it-IT") + " " + data.toLocaleTimeString("it-IT")
  );
}

export { formatDateTime };
