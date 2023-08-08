function HomePage() {
  const name = "Andrea";
  return (
    <div>
      <h2>Homepage</h2>
      <div>Pippo</div>
      <div>
        <h3>Benvenuto!</h3>
        <p>{`il tuo nome è ${name}`}</p>
      </div>
      <p>An unuseful page, that I'm using as placeholder</p>
    </div>
  );
}

export { HomePage };
