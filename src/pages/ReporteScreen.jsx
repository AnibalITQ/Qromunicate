import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
const ReporteScreen = ({navigation}) => {
    const reportes = [
        {
          tipo: 'Movilidad',
          descripcion: 'Reporta fallas en la movilidad del tráfico y su posible causa (Accidente vial, bloqueos, Fallas estructurales, etc.)',
          background: require('../images/movilidad.png')  
        },
         {
          tipo: 'Servicios publicos',
          descripcion: 'Reporta fallas en cualquier servicio publico (Agua, luz, drenaje, limpieza)',
         background: require ('../images/servicios.png')
        },
         {
          tipo: 'Accesibilidad',
          descripcion: 'Reporta fallas de accesibilidad para personas con necesidades especiales)',
          background: require ('../images/discapacidad.png')  
        },
    ];
    return (
        <View style={styles.container}>
        {reportes.map((reporte, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.reporteButton}
            onPress={() =>
              navigation.navigate('ReporteDetail', {
                tipo: reporte.tipo,
                descripcion: reporte.descripcion  
              })
            } 
          >
            <ImageBackground
              source={reporte.background}
              style={styles.buttonBackground}
              resizeMode="cover"
            >
              {/* Aquí ya no necesitamos una View adicional dentro de ImageBackground */}
            </ImageBackground>
            <View style={styles.textContainer}>
              <Text style={styles.reporteButtonText}>{reporte.tipo}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
);
};
const styles = StyleSheet.create({
    container: {
        flex: 1, // Toma todo el espacio disponible
        justifyContent: 'flex-start', // Alinea los botones al inicio del contenedor
        alignItems: 'center', // Centra los botones horizontalmente
        padding: 10, // Agrega espacio alrededor de los botones
        flexDirection: 'row', // Coloca los botones en una fila horizontal
        flexWrap: 'wrap', // Permite que los botones se envuelvan en la siguiente línea si no caben
    },
    reporteButton: {
        width: '45%', // Ocupa el 45% del ancho del contenedor
        aspectRatio: 1, // Mantiene la proporción de aspecto
        margin: '2.5%', // Espacio alrededor del botón
        borderRadius: 10, // Bordes redondeados
        overflow: 'hidden', // Esconde cualquier cosa que se desborde del borde redondeado
        // No necesitas borderWidth ni borderColor aquí a menos que desees un borde
    },

    buttonBackground: {
        width: '100%', // Asegura que la imagen de fondo cubra el botón
        height: '100%', // Establece la altura aquí para controlar el tamaño de la imagen
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        position: 'absolute', // Posiciona absolutamente para que el texto vaya encima de la imagen
        bottom: -10, // Alinea el texto en la parte inferior del botón
        width: '100%', // Asegura que el contenedor del texto cubra el ancho del botón
    },
    reporteButtonText: {
        color: '#004AAD',
        fontSize: 16, // Ajusta según sea necesario
        fontWeight: 'bold',
        textAlign: 'center', // Alinea el texto en el centro
        padding: 10, // Espacio alrededor del texto

    },
});
export default ReporteScreen;