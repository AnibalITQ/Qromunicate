import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

const DenunciaDetailScreen = ({ route }) => {
  const { tipo, descripcion } = route.params;
  const [inputText, setInputText] = useState('');
  const [imageUri, setImageUri] = useState(null);
  

  const handleEnviarTexto = () => {
    // Aquí puedes implementar la lógica para enviar el texto
    alert(`Texto enviado: ${inputText}`);
  };

  const handleSeleccionarImagen = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });
  
    if (!result.canceled) {
      // Accediendo a la imagen seleccionada a través del arreglo 'assets'
      const asset = result.assets[0]; // Suponiendo que sólo seleccionamos una imagen
  
      // La ruta persistente del archivo de la imagen
      const uri = asset.uri;
  
      // ... procede a copiar la imagen a tu directorio si es necesario y actualizar el estado ...
      // Por ejemplo:
      setPublicaciones(prevPublicaciones => [
        ...prevPublicaciones,
        {
          id: prevPublicaciones.length + 1,
          titulo: titulo,
          imagen: uri, // Ahora usas la uri del objeto asset
        }
      ]);
  
      // Limpia el título y el URI de la imagen
      setTitulo('');
      setImageUri(null);
    }
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

      <TouchableOpacity style={styles.subirImagenButton} onPress={handleSeleccionarImagen}>
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

export default DenunciaDetailScreen