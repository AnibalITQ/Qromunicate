import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const DenunciaDetailScreen = ({ route }) => {
  const { tipo, descripcion } = route.params;
  const [inputText, setInputText] = useState('');
  const [imageUri, setImageUri] = useState(null);
  

  const handleEnviarTexto = () => {
    // Aquí puedes implementar la lógica para enviar el texto
    alert(`Texto enviado: ${inputText}`);
  };

  const handleSubirImagen = () => {
  // Configuración para la selección de imágenes
  const options = {
    mediaType: 'photo', // Solo permitir seleccionar fotos
    quality: 0.5, // Calidad de la imagen (0.0 - 1.0)
  };

  // Abrir el cuadro de diálogo para seleccionar una imagen
  launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      // El usuario canceló la selección de imagen
    } else if (response.errorMessage) {
      // Ocurrió un error al seleccionar la imagen
      console.error('Error al seleccionar la imagen: ', response.errorMessage);
    } else {
      // Imagen seleccionada con éxito
      const { uri } = response;

      // Actualizar el estado 'imageUri' con la ruta de la imagen seleccionada
      setImageUri(uri);
    }
  });
};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{tipo}</Text>
      <Text style={styles.descripcion}>{descripcion}</Text>

      <TextInput
        style={styles.input}
        onChangeText={(text) => setInputText(text)}
        value={inputText}
        placeholder="Escribe aquí"
      />

      <Button title="Enviar Texto" onPress={handleEnviarTexto} />

      <TouchableOpacity style={styles.subirImagenButton} onPress={handleSubirImagen}>
        <Text style={styles.subirImagenButtonText}>Subir Imagen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  descripcion: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 10,
    padding: 5,
  },
  subirImagenButton: {
    marginTop: 20,
    backgroundColor: '#004AAD',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
    button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0073e6',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  subirImagenButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DenunciaDetailScreen;
