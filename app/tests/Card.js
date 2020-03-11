import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

export default function CardView() {
  const docs = [
    {
      IdDocumento: "b7a0f746-5035-41bd-b4f5-334fca3ac6aa",
      IdDocumentoRemitente: "b82ee17d-96cd-48e2-b1fc-a00fad7eac82",
      IdUsuarioPropietario: "3f66d2e6-57cb-48cd-8632-21ec91f80421",
      IdCarpeta: "d582fcc8-7b9e-4e3f-9980-cf77299cb0bc",
      IdArea: "259b8979-58ab-49f2-93af-aacc1fbc0bcb",
      Codigo: "0001/2018",
      Asunto: "Prueba de mis oficio",
      FechaCreacion: "2018-12-19T13:19:00",
      FechaEnvio: "2018-12-19T13:19:00",
      Importancia: 1,
      Tipo: 3,
      Estatus: 4,
      Leido: 0,
      Destinatarios: "MARCO ANTONIO CELIS CRISOSTOMO",
      TieneArchivosAdjuntos: false,
      AreaNombre: "UNIDAD DE TECNOLOGIAS DE LA INFORMACION"
    },
    {
      IdDocumento: "c1876e68-20b3-40c5-b245-c8760ee9a18a",
      IdDocumentoRemitente: "155fe910-ece2-43b7-96c2-5133943bfc9a",
      IdUsuarioPropietario: "3f66d2e6-57cb-48cd-8632-21ec91f80421",
      IdCarpeta: "d582fcc8-7b9e-4e3f-9980-cf77299cb0bc",
      IdArea: "259b8979-58ab-49f2-93af-aacc1fbc0bcb",
      Codigo: "GE030/2016",
      Asunto: "prueba-50",
      FechaCreacion: "2016-06-22T09:39:00",
      FechaEnvio: null,
      Importancia: 3,
      Tipo: 1,
      Estatus: 4,
      Leido: 2,
      Destinatarios: "ANA CECILIA BARAJAS MORENO",
      TieneArchivosAdjuntos: true,
      AreaNombre: "UNIDAD DE TECNOLOGIAS DE LA INFORMACION"
    },
    {
      IdDocumento: "aeb03886-0359-44ea-b8c1-f10f40ddb6d0",
      IdDocumentoRemitente: "4e4c72ec-e3c8-4be7-9366-a390ab1fd5c4",
      IdUsuarioPropietario: "3f66d2e6-57cb-48cd-8632-21ec91f80421",
      IdCarpeta: "d582fcc8-7b9e-4e3f-9980-cf77299cb0bc",
      IdArea: "259b8979-58ab-49f2-93af-aacc1fbc0bcb",
      Codigo: "GE023/2016",
      Asunto: "PRUEBA 10",
      FechaCreacion: "2016-06-21T10:08:00",
      FechaEnvio: "2016-06-21T10:08:00",
      Importancia: 2,
      Tipo: 2,
      Estatus: 4,
      Leido: 2,
      Destinatarios: "ANA CECILIA BARAJAS MORENO",
      TieneArchivosAdjuntos: false,
      AreaNombre: "UNIDAD DE TECNOLOGIAS DE LA INFORMACION"
    },
    {
      IdDocumento: "dae6ffb0-899d-4e34-9418-2eb24cbfdf75",
      IdDocumentoRemitente: "bf149019-15e9-451d-bfb6-e754cafb741b",
      IdUsuarioPropietario: "3f66d2e6-57cb-48cd-8632-21ec91f80421",
      IdCarpeta: "d582fcc8-7b9e-4e3f-9980-cf77299cb0bc",
      IdArea: "4c6b2c8b-febe-4212-8477-3553892727ac",
      Codigo: "91/2016",
      Asunto: "prueba-91",
      FechaCreacion: "2016-04-05T12:32:00",
      FechaEnvio: "2016-04-05T12:32:00",
      Importancia: 1,
      Tipo: 2,
      Estatus: 4,
      Leido: 2,
      Destinatarios: "ANA CECILIA BARAJAS MORENO",
      TieneArchivosAdjuntos: true,
      AreaNombre: "OFICINA DE PRESIDENCIA MUNICIPAL"
    },
    {
      IdDocumento: "bf0e664f-4e62-42bf-a655-c0387e360de6",
      IdDocumentoRemitente: "25cd69f5-117b-45f5-bc98-a584e618ea42",
      IdUsuarioPropietario: "3f66d2e6-57cb-48cd-8632-21ec91f80421",
      IdCarpeta: "d582fcc8-7b9e-4e3f-9980-cf77299cb0bc",
      IdArea: "4c6b2c8b-febe-4212-8477-3553892727ac",
      Codigo: "90/2016",
      Asunto: "prueba - 90",
      FechaCreacion: "2016-04-05T12:25:00",
      FechaEnvio: null,
      Importancia: 3,
      Tipo: 1,
      Estatus: 4,
      Leido: 2,
      Destinatarios: "ANA CECILIA BARAJAS MORENO",
      TieneArchivosAdjuntos: true,
      AreaNombre: "OFICINA DE PRESIDENCIA MUNICIPAL"
    },
    {
      IdDocumento: "c6ef04cf-f151-4955-8f7b-e3fe9ce0520a",
      IdDocumentoRemitente: "c7ab2c8d-7fef-4147-a907-4f56b4a75a34",
      IdUsuarioPropietario: "3f66d2e6-57cb-48cd-8632-21ec91f80421",
      IdCarpeta: "d582fcc8-7b9e-4e3f-9980-cf77299cb0bc",
      IdArea: "4c6b2c8b-febe-4212-8477-3553892727ac",
      Codigo: "702/2016",
      Asunto: "prueba 703",
      FechaCreacion: "2016-03-23T10:03:00",
      FechaEnvio: "2016-03-23T10:03:00",
      Importancia: 2,
      Tipo: 2,
      Estatus: 4,
      Leido: 2,
      Destinatarios: "ANA CECILIA BARAJAS MORENO",
      TieneArchivosAdjuntos: true,
      AreaNombre: "OFICINA DE PRESIDENCIA MUNICIPAL"
    },
    {
      IdDocumento: "d5b1c13b-0c19-4c3d-b9a0-722048345d8a",
      IdDocumentoRemitente: "00819883-f1e2-482a-88b6-6b85d915ccb1",
      IdUsuarioPropietario: "3f66d2e6-57cb-48cd-8632-21ec91f80421",
      IdCarpeta: "d582fcc8-7b9e-4e3f-9980-cf77299cb0bc",
      IdArea: "4c6b2c8b-febe-4212-8477-3553892727ac",
      Codigo: "701/2016",
      Asunto: "prueba-701",
      FechaCreacion: "2016-03-23T09:45:00",
      FechaEnvio: null,
      Importancia: 1,
      Tipo: 1,
      Estatus: 4,
      Leido: 2,
      Destinatarios: "ANA CECILIA BARAJAS MORENO",
      TieneArchivosAdjuntos: true,
      AreaNombre: "OFICINA DE PRESIDENCIA MUNICIPAL"
    },
    {
      IdDocumento: "4fc03ef2-2087-4124-aea1-ea89122cdb8d",
      IdDocumentoRemitente: "fa9169fc-385b-4aa4-bf40-3d87563a07f0",
      IdUsuarioPropietario: "3f66d2e6-57cb-48cd-8632-21ec91f80421",
      IdCarpeta: "d582fcc8-7b9e-4e3f-9980-cf77299cb0bc",
      IdArea: "4c6b2c8b-febe-4212-8477-3553892727ac",
      Codigo: "700/2016",
      Asunto: "prueba 700",
      FechaCreacion: "2016-03-23T09:39:00",
      FechaEnvio: "2016-03-23T09:39:00",
      Importancia: 3,
      Tipo: 2,
      Estatus: 4,
      Leido: 2,
      Destinatarios: "ANA CECILIA BARAJAS MORENO",
      TieneArchivosAdjuntos: true,
      AreaNombre: "OFICINA DE PRESIDENCIA MUNICIPAL"
    }
  ];
  return (
    <ScrollView>
      {docs.map((u, i) => {
        return (
          <Card>
            {/*Padre del componente */}
            <View key={i} style={{ flexDirection: "column" }}>
              {/*Elementos header */}
              <View style={styles.iconsinicio}>
                {u.Importancia < 3 ? (
                  <Icon
                    name={"alert-circle-outline"}
                    type="material-community"
                    color={u.Importancia === 2 ? "cyan" : "grey"}
                    reverseColor="black"
                  />
                ) : (
                  <Icon
                    name={"alert-outline"}
                    type="material-community"
                    color="red"
                    reverseColor="black"
                  />
                )}
                <Text> </Text>
                <Text>{u.Codigo}</Text>
                <Text> </Text>
                <Text>{u.FechaEnvio}</Text>
                <Text> </Text>
                <Text>{new Date(u.FechaCreacion).format}</Text>
                <Text> </Text>
                <View style={styles.iconsfin}>
                  {u.TieneArchivosAdjuntos && (
                    <Icon
                      name="attach-file"
                      type="material"
                      color="black"
                      reverseColor="black"
                    />
                  )}

                  <Text> </Text>
                  <Icon
                    name="arrow-down-bold-box-outline"
                    type="material-community"
                    color="black"
                    reverseColor="black"
                  />
                  <Icon
                    name="eye-check"
                    type="material-community"
                    color="black"
                    reverseColor="black"
                  />
                </View>
              </View>
              <View>
                <Text>{u.Asunto}</Text>
              </View>
              <View style={styles.footerCard}>
                <Icon
                  name="send"
                  type="material-community"
                  color="black"
                  reverseColor="black"
                />
                <Text> </Text>
                <Text> {u.Destinatarios}</Text>
              </View>
            </View>
          </Card>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  iconsinicio: {
    flexDirection: "row",
    flex: 1,
    top: -4
  },
  iconsfin: {
    flexDirection: "row",
    flex: 1,
    top: 0,
    justifyContent: "flex-end"
  },
  footerCard: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "flex-start"
  }
});

// implemented without image with header
/*


  <Card title="CARD WITH DIVIDER">
     {
       users.map((u, i) => {
         return (
           <View key={i} >
             <Image
               
               resizeMode="cover"
               source={{ uri: u.avatar }}
             />
             <Text >{u.name}</Text>
           </View>
         );
       })
     }
   </Card>
  // implemented without image without header, using ListItem component
    <Card containerStyle={{padding: 0}} >
     {
       users.map((u, i) => {
         return (
           <ListItem
             key={i}
             roundAvatar
             title={u.name}
             avatar={{uri:u.avatar}}
           />
         );
       })
     }
   </Card>
   
   
   // implemented with Text and Button as children
   <Card
     title='HELLO WORLD'
     image={require('../images/pic2.jpg')}>
     <Text style={{marginBottom: 10}}>
       The idea with React Native Elements is more about component structure than actual design.
     </Text>
     <Button
       icon={<Icon name='code' color='#ffffff' />}
       buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
       title='VIEW NOW' />
   </Card>
   
   
   */
