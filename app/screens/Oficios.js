import React, { Component } from 'react'
import { View, Text } from 'react-native'

class HttpExample extends Component {
   state = {
      data: []
   }
   componentDidMount = () => {
      fetch('http://10.0.0.17/ApiMisOficios/api/Documentos/Buscar?offset=0&limit=50&idcarpeta=d582fcc8-7b9e-4e3f-9980-cf77299cb0bc&texto=prueba', {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson['Documentos'][0]['Asunto']);
         this.setState({
            data: responseJson['Documentos'][0]
         })
      })
      .catch((error) => {
         console.error(error);
      });
   }



   render() {
      return (
         <View>
            <Text>
               {this.state.data.Asunto}
            </Text>
         </View>
      )
   }
}
export default HttpExample
