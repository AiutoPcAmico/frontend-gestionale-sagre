import axios from "./axios";
import { store } from "../stores/store";
import { destroySession } from "../stores/sessionInfo";

function retrieveErrors(statusCode, data) {
  var isError = false;
  var messageError = null;

  switch (statusCode) {
    case 200:
      //request ok
      break;
    case 201:
      //created element
      break;

    case 400:
      //Bad Request
      isError = true;
      messageError =
        "Errore della piattaforma.\nNello specifico, è stata inviata una richiesta non valida.\n\nRiprova";
      break;

    case 401:
      //Unauthorized Access
      isError = true;
      messageError = "La sessione è scaduta.\nPrego, rieffettuare il login.";
      store.dispatch(destroySession());
      break;

    case 403:
      //user not authorizated (or not found)
      isError = true;
      messageError = "Username o Password errati.\nRiprova";
      break;

    case 404:
      isError = true;
      messageError = "Elemento non trovato nel sistema.\nRiprova!";
      break;

    case 409:
      isError = true;
      messageError =
        "L'utente indicato risulta già iscritto al portale.\nRiprova!";
      break;

    case 418:
      isError = true;
      messageError =
        "La quantità richiesta non è più disponibile. Ci scusiamo per il disagio";
      break;

    case 426:
      isError = true;
      messageError = "L'account è stato disabilitato.\nContattare il supporto";
      break;

    case 500:
      isError = true;
      messageError = "Errore del Server.\nRiprova!";
      break;

    default:
      isError = true;
      messageError =
        "Errore sconosciuto.\nContattare l'assistenza e fornire il seguente codice.\n" +
        statusCode;
      break;
  }

  return {
    isError: isError,
    messageError: messageError,
    status: statusCode,
    data: data,
  };
}

//replace with all funcitons/apis
const postLogin = async (username, password) => {
  const base64encodedData = btoa(`${username}:${password}`);

  try {
    const response = await axios.post("/login", undefined, {
      headers: {
        Authorization: "Basic " + base64encodedData,
      },
    });
    return retrieveErrors(response.status, response.data);
  } catch (error) {
    console.log({ error });
    return retrieveErrors(error.response.status, error.response.data.result);
  }
};

export { postLogin };
