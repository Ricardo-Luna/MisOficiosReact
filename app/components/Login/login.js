import React from "react";
import { Actions } from "react-native-router-flux";
import axios from "react-native-axios";

export default function Lg(user, pw) {
  const credenciales = {
    NickName: user,
    Password: pw,
    AccesoAplicacion: 1,
    DerechosRangoInicial: 1000,
    DerechosRangoFinal: 1012,
  };
  var carpeta = "",
    id = "",
    carpetas = "";
  const getCarpetas = async (usuario) => {
    {
      await fetch(
        `http://10.0.0.17/ApiMisOficios/api/Carpetas/Usuario/${usuario}`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          carpetas = responseJson;
          responseJson.map((u, i) => {
            if (u.Nombre === "Recibidos") {
              carpeta = u.IdCarpeta;
             // AsyncStorage.setItem("@carpeta", u.IdCarpeta);
            }
          });
        })
        .then(() => {
          Actions.oficios({
            id: id,
            inicio: carpeta,
            carpeta: carpetas,
          });
          setRenderComponent();
          //setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const loginAxios = async () => {
    await axios({
      method: "post",
      url: "http://10.0.0.17/ApiUsuarios/api/Usuarios/Login",
      data: credenciales,
      headers: { "Content-Type": "application/json" },
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
  };
  //setIsLoading(true);
  loginAxios();
}
