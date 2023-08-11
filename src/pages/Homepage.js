import { useSelector } from "react-redux";

function HomePage() {
  const user = useSelector((state) => state.sessionInfo.user);
  const name = user.username;
  return (
    <div>
      <h2>Homepage</h2>
      <div>Pippo</div>
      <div>
        <h3>Benvenuto!</h3>
        <h2>{`il tuo nome è ${name}`}</h2>
      </div>
      <p>An unuseful page, that I'm using as placeholder</p>
    </div>
  );
}

export { HomePage };
