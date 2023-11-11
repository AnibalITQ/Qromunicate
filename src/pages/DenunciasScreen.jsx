import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const DenunciasScreen = ({ navigation }) => {
    const denuncias = [
        {
            tipo: 'Penales',
            descripcion: 'Relacionadas con actividades delictivas. Pueden incluir delitos como robo, fraude, agresión, etc.',
            background: require('../images/penal.png'), // Ruta a la imagen de fondo
        },
        {
            tipo: 'Civiles',
            descripcion: 'Se presentan en casos de disputas entre individuos, como casos de negligencia, disputas contractuales, daños y perjuicios, entre otros.',
            background: require('../images/civil.png'), // Ruta a la imagen de fondo
        },
        {
            tipo: 'Laborales',
            descripcion: 'Relativas a cuestiones en el lugar de trabajo, como acoso laboral, discriminación, violaciones de derechos laborales, etc.',
            background: require('../images/Laboral.png'), // Ruta a la imagen de fondo
        },

        {
            tipo:
                'Orden publico',
            descripcion: 'Relativas a cuestiones que disturbien el orden y tranquilidad del ciudadano en publico',
            background: require('../images/ordenpublico.png'), // Ruta a la imagen de fondo
        },
        {
            tipo:
                'Medioambientales',
            descripcion: 'Relativas a actividades que dañan el medio ambiente, como vertidos contaminantes, deforestación ilegal, etc.',
            background: require('../images/medioambiental.png'),
        },
        {
            tipo: 'Corrupción',
            descripcion: 'Relativas a actividades que dañan el medio ambiente, como vertidos contaminantes, deforestación ilegal, etc.',
            background: require('../images/corrupcion.png'),
        }

    ];

    return (
        <View style={styles.container}>
        {denuncias.map((denuncia, index) => (
            <TouchableOpacity
                key={index}
                style={styles.denunciaButton}
                onPress={() =>
                    navigation.navigate('DenunciaDetail', {
                        tipo: denuncia.tipo,
                        descripcion: denuncia.descripcion,
                    })
                }
            >
                <ImageBackground
                    source={denuncia.background}
                    style={styles.buttonBackground}
                    resizeMode="cover"
                >
                    {/* No hay contenido aquí, solo la imagen de fondo */}
                </ImageBackground>
                {/* Contenedor del texto colocado fuera de ImageBackground */}
                <View style={styles.textContainer}>
                    <Text style={styles.denunciaButtonText}>{denuncia.tipo}</Text>
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
    denunciaButton: {
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
    denunciaButtonText: {
        color: '#004AAD',
        fontSize: 16, // Ajusta según sea necesario
        fontWeight: 'bold',
        textAlign: 'center', // Alinea el texto en el centro
        padding: 10, // Espacio alrededor del texto
    },
});


export default DenunciasScreen;