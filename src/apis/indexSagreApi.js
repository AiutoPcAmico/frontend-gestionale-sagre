import axios from "./axios";
import { store } from "../stores/store";
import sessionInfo, { destroySession } from "../stores/sessionInfo";

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
      messageError = "Non autorizzato.\nRiprova";
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

    case 503:
      isError = true;
      messageError =
        "Il server non è al momento raggiungibile. Controlla la rete e riprova tra qualche minuto!";
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
    if (error.code === "ERR_NETWORK") {
      return retrieveErrors(503, "Network not available!");
    } else {
      return retrieveErrors(error.response.status, error.response.data.result);
    }
  }
};

const getMyPages = async () => {
  const access = store.getState(sessionInfo).sessionInfo.sessionToken;
  console.log(access);
  try {
    const response = await axios.get("/roles/getMyPages", {
      headers: {
        Authorization: "Bearer " + access,
      },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    console.log({ e });
    if (e.code === "ERR_NETWORK") {
      return retrieveErrors(503, "Network not available!");
    } else {
      return retrieveErrors(e.response.status, e.response.data.result);
    }
  }
};

const getAllReservations = async () => {
  const access = store.getState(sessionInfo).sessionInfo.sessionToken;
  try {
    const response = await axios.get("/reservations/allReservations", {
      headers: {
        Authorization: "Bearer " + access,
      },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    console.log({ e });
    if (e.code === "ERR_NETWORK") {
      return retrieveErrors(503, "Network not available!");
    } else {
      return retrieveErrors(e.response.status, e.response.data.result);
    }
  }
};

const getPreparationOfReservation = async (reservationId) => {
  if (!reservationId) {
    return retrieveErrors(400, {
      isError: true,
      data: "Id not passed to function!",
    });
  }
  const access = store.getState(sessionInfo).sessionInfo.sessionToken;
  try {
    const response = await axios.get(
      "/reservations/foods/getpreparations/" + reservationId,
      {
        headers: {
          Authorization: "Bearer " + access,
        },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    console.log({ e });
    if (e.code === "ERR_NETWORK") {
      return retrieveErrors(503, "Network not available!");
    } else {
      return retrieveErrors(e.response.status, e.response.data);
    }
  }
};

const getDispensingOfReservation = async (reservationId) => {
  if (!reservationId) {
    return retrieveErrors(400, {
      isError: true,
      data: "Id not passed to function!",
    });
  }
  const access = store.getState(sessionInfo).sessionInfo.sessionToken;
  try {
    const response = await axios.get(
      "/reservations/beverages/getdispensing/" + reservationId,
      {
        headers: {
          Authorization: "Bearer " + access,
        },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    console.log({ e });
    if (e.code === "ERR_NETWORK") {
      return retrieveErrors(503, "Network not available!");
    } else {
      return retrieveErrors(e.response.status, e.response.data);
    }
  }
};

const getAllBeverages = async () => {
  const access = store.getState(sessionInfo).sessionInfo.sessionToken;
  try {
    const response = await axios.get("/beverages/allBeverages", {
      headers: {
        Authorization: "Bearer " + access,
      },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    console.log({ e });
    if (e.code === "ERR_NETWORK") {
      return retrieveErrors(503, "Network not available!");
    } else {
      return retrieveErrors(e.response.status, e.response.data.result);
    }
  }
};

const getAllFoods = async () => {
  const access = store.getState(sessionInfo).sessionInfo.sessionToken;
  try {
    const response = await axios.get("/foods/allFoods", {
      headers: {
        Authorization: "Bearer " + access,
      },
    });

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    console.log({ e });
    if (e.code === "ERR_NETWORK") {
      return retrieveErrors(503, "Network not available!");
    } else {
      return retrieveErrors(e.response.status, e.response.data.result);
    }
  }
};

const addCompleteReservation = async (complete) => {
  const access = store.getState(sessionInfo).sessionInfo.sessionToken;
  try {
    const response = await axios.put(
      "/reservations/addCompleteReservation",
      {
        reservation: {
          table: complete.table,
          name: complete.name,
          coverCharge: complete.coverCharge,
          isPaid: complete.isPaid,
        },
        beverages: complete.beverages,
        foods: complete.foods,
      },
      {
        headers: {
          Authorization: "Bearer " + access,
        },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    console.log({ e });
    if (e.code === "ERR_NETWORK") {
      return retrieveErrors(503, "Network not available!");
    } else {
      return retrieveErrors(e.response.status, e.response.data.result);
    }
  }
};

const updateIsPaid = async (isPaid, idReservation) => {
  const access = store.getState(sessionInfo).sessionInfo.sessionToken;
  try {
    const response = await axios.post(
      "/reservations/updateIsPaid",
      {
        isPaid: isPaid,
        idReservation: idReservation,
      },
      {
        headers: {
          Authorization: "Bearer " + access,
        },
      }
    );

    return retrieveErrors(response.status, response.data);
  } catch (e) {
    if (e.code === "ERR_NETWORK") {
      return retrieveErrors(503, "Network not available!");
    } else {
      return retrieveErrors(e.response.status, e.response.data.result);
    }
  }
};

const getOfCategory = async (type, category) => {
  //if (!type || !category) {
  //  return retrieveErrors(
  //    400,
  //    "categoria o tipologia del prodotto non passata alla funzione!"
  //  );
  //}
  const access = store.getState(sessionInfo).sessionInfo.sessionToken;

  try {
    const response = await axios.get(
      `/reservations/${type}/getOfCategory/${category}`,
      {
        headers: {
          Authorization: "Bearer " + access,
        },
      }
    );
    return retrieveErrors(response.status, response.data);
  } catch (e) {
    console.log({ e });
    if (e.code === "ERR_NETWORK") {
      return retrieveErrors(503, "Network not available!");
    } else {
      return retrieveErrors(e.response.status, e.response.data.result);
    }
  }
};

const deliverProduct = async (
  type,
  quantityDelivered,
  idProduct,
  idReservation
) => {
  if (!type || !idProduct || !idReservation || !quantityDelivered) {
    return retrieveErrors(400, "Parametri mancanti per la chiamata api!");
  }
  const access = store.getState(sessionInfo).sessionInfo.sessionToken;

  var apiUrl = null;
  var obj = {};

  if (type === "foods") {
    apiUrl = "/reservations/foods/updateDeliveryFood";
    obj = {
      idReservation: parseInt(idReservation),
      idFood: parseInt(idProduct),
      quantityDelivered: parseInt(quantityDelivered),
    };
  } else {
    if (type === "beverages") {
      apiUrl = "/reservations/beverages/updateDeliveryBeverage";
      obj = {
        idReservation: parseInt(idReservation),
        idBeverage: parseInt(idProduct),
        quantityDelivered: parseInt(quantityDelivered),
      };
    }
  }

  try {
    const response = await axios.post(apiUrl, obj, {
      headers: {
        Authorization: "Bearer " + access,
      },
    });
    return retrieveErrors(response.status, response.data);
  } catch (e) {
    console.log({ e });
    if (e.code === "ERR_NETWORK") {
      return retrieveErrors(503, "Network not available!");
    } else {
      return retrieveErrors(e.response.status, e.response.data.result);
    }
  }
};

export {
  postLogin,
  getMyPages,
  getAllReservations,
  getPreparationOfReservation,
  getDispensingOfReservation,
  getAllBeverages,
  getAllFoods,
  addCompleteReservation,
  updateIsPaid,
  getOfCategory,
  deliverProduct,
};
