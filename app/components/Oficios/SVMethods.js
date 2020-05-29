import React from "react";
import axios from "react-native-axios";


export default function updateList(props) {
  const { carpeta, busqueda, updateList } = props;
  const fetchDocs = async () => {
    axios
      .get(
        `http://10.0.0.17/ApiMisOficios/api/Documentos/Buscar?offset=0&limit=8&texto=${props.busqueda}&idcarpeta=${carpeta}`
      )
      .then((response) => {
        //console.log(`response.data`);
        {
          response.data.Siguiente === "" ? setHasMore(false) : setHasMore(true);
        }
        //console.log(hasMore);

        setNextPage(response.data.Siguiente);
        setLoading(false);
        setLoadMore(false);
        setDocs(response.data.Documentos);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchDocs();
  }, [carpeta, busqueda, updateList]);
}
