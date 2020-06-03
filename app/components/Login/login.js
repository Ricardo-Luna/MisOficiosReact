import React from "react";
import { Actions } from "react-native-router-flux";
import axios from "react-native-axios";

var carpeta = "",
  id = "",
  carpetas = "";
async function getCarpetas(user) {
  {
    await fetch(`http://10.0.0.17/ApiMisOficios/api/Carpetas/Usuario/${user}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        carpetas = responseJson;
        responseJson.map((u, i) => {
          if (u.Nombre === "Recibidos") {
            carpeta = u.IdCarpeta;
          }
        });
      })
      .then(() => {
        Actions.oficios({
          id: id,
          inicio: carpeta,
          carpeta: carpetas,
        });
        //setRenderComponent();
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export default async function LoginAxios(user, pw) {
  const credenciales = {
    NickName: user,
    Password: pw,
    AccesoAplicacion: 1,
    DerechosRangoInicial: 1000,
    DerechosRangoFinal: 1012,
  };
  await axios ({
    method: "post",
    url: "http://10.0.0.17/ApiUsuarios/api/Usuarios/Login",
    data: credenciales,
    headers: { "Content-Type": "application/json" },
    timeout: 2000,
  })
    .then(function (response) {
      if (response.data.Permisos[0].NumeroPermiso === 1000) {
        getCarpetas(response.data.IdUsuario);
        id = response.data.IdUsuario;
        storeData(response.data.IdUsuario);
      } else {
        // setIsLoading(false);
      }
    })
    .catch(function (response) {
      //  setIsLoading(false);
    });
}
