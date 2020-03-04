import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Login from './Login'
import fadeInView from './FadeInView'
import FadeInView from './FadeInView';

export default function Splash() {
    return (
        <View style={styles.splash}>
            <FadeInView/>
            <Image
                source={require("../../assets/img_letra_g.png")}
                style={styles.backgroundImage}
                resizeMode="cover"
            />
            <Image
                source={require("../../assets/icono.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.text}>Mis Oficios</Text>
            <Image
                source={require("../../assets/escudo.png")}
                style={styles.escudo}
                resizeMode="contain"
            />
        </View>
    );

}



const styles = StyleSheet.create({
    splash: {
        marginTop: 0
    },
    backgroundImage: {
        height: 400,
        width: "100%",
        marginBottom: 0

    },
    logo: {
        width: "100%",
        height: 150,
        
    },
    text: {
        fontFamily: 'sans-serif-light',
        textAlign: 'center',
        fontWeight: '400',
        fontSize: 24
    },
    escudo: {
        alignItems: 'center',
        height: "35%",
        width: "100%",
    }
})