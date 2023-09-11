import { useSelector } from "react-redux";

function HomePage() {
  const user = useSelector((state) => state.sessionInfo.user);
  const name = user.username;
  return (
    <div>
      <h2>Benvenuto!</h2>
      <div>Questo è il gestionale delle sagre dell'Oratorio di Cividate!</div>
      <div>
        <p>Al momento risulti {name ? "loggato" : " non ancora loggato"}</p>
        {name && <p>Seleziona, dal menu superiore, la postazione associata</p>}
        {!name && (
          <p>
            Per accedere, seleziona l'icona grigia in alto a destra e premi su
            login!
          </p>
        )}
      </div>
    </div>
  );
}

export { HomePage };
