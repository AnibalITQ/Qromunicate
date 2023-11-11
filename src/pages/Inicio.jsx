import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet, FlatList, Dimensions, Image, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import logoImage from '../images/logo.png';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Students = ({route}) => {
  const { elemento } = route.params;
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(-screenWidth)).current; // Initial position of the menu
   
  const publicacionesData = [
    {
      id: 1,
      titulo: "HAY UN BACHE EN BERNARDO QUINTANA CON CONSTITUYENTES",
      imagen: require('../../assets/bache.jpeg'), // Usa `require` para cargar imágenes desde recursos locales
    },
    {
      id: 2,
      titulo: "Reparación de baches en corregidora,Emiliano Zapata",
      imagen: require('../../assets/reparacion.jpeg'), // Usa `require` para cargar imágenes desde recursos locales
    },
    {
      id: 3,
      titulo: "TREN CHOCA CON AUTOMOVIL EN SJR",
      imagen: require('../../assets/TrenSJR.png'), // Usa `require` para cargar imágenes desde recursos locales
    },
  ];
  const [publicaciones, setPublicaciones] = useState(publicacionesData);
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
  useEffect(() => {
    // Trigger the slide animation whenever isMenuVisible changes
    Animated.timing(slideAnim, {
      toValue: isMenuVisible ? 0 : -screenWidth,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isMenuVisible, slideAnim]);

  useEffect(() => {
    if (route.params?.nuevaPublicacion) {
      const nuevaPublicacion = route.params.nuevaPublicacion;
      setPublicaciones(prevPublicaciones => [
        ...prevPublicaciones,
        {
          ...nuevaPublicacion,
          id: prevPublicaciones.length + 1, // Asegúrate de que el ID sea único
        }
      ]);
    }
    // Asegúrate de resetear la ruta después de obtener los datos para evitar duplicaciones
    navigation.setParams({ nuevaPublicacion: null });
  }, [route.params?.nuevaPublicacion]);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  

  const selectOption = (option) => {
    console.log(`Opción seleccionada: ${option}`);
    setIsMenuVisible(false);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>
        {elemento && elemento.name ? elemento.name : ''}
      </Text>
      {!isMenuVisible && (
  <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
    <Text style={styles.menuButtonText}>Menu ☰</Text>
  </TouchableOpacity>
)}
      {/* Main Content */}
      <Image
        source={logoImage}
        style={styles.logo}
        resizeMode="contain"
      />

      <FlatList
        data={publicaciones}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <Text style={styles.postTitle}>{item.titulo}</Text>
            <Image source={item.imagen} style={styles.postImage} />
          </View>
        )}
        style={styles.flatList}
      />

      {/* Overlay to close menu */}
      {isMenuVisible && (
        <TouchableOpacity style={styles.overlay} onPress={toggleMenu} activeOpacity={1} />
      )}

      {/* Animated Sidebar */}
      <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Denuncias')}
        >
          <FontAwesome name="exclamation-triangle" size={30} color="white" />
          <Text style={styles.buttonText}>Denuncias</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Reporte')}
        >
          <FontAwesome name="bar-chart" size={30} color="white" />
          <Text style={styles.buttonText}>Reporte</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <FontAwesome name="sign-out" size={30} color="white" />
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
               {/* Close Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsMenuVisible(false)}
      >
         <FontAwesome name="sign-out" size={30} color="white" />
        <Text style={styles.buttonText}>Cerrar Menú</Text>
      </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 2,
    padding: 10,
  },
  menuButtonText: {
    fontSize: 24,
    color: '#4267B2',
  },
  logo: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.1,
    marginTop: screenHeight * 0.05,
  },
  postInputContainer: {
    width: '100%',
    paddingHorizontal: '5%',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    width: '100%',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  subirImagenButton: {
    backgroundColor: '#4267B2',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  subirImagenButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  flatList: {
    width: '100%',
  },
  postCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: screenWidth * 0.8,
    backgroundColor: '#dcffff',
    padding: 20,
    zIndex: 1,
  },
  
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.1,
    marginTop: screenHeight * 0.05,
  },
  postInputContainer: {
    width: '100%',
    paddingHorizontal: '5%',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0073e6',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    width: '100%',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  subirImagenButton: {
    backgroundColor: '#4267B2',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  subirImagenButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  flatList: {
    width: '100%',
  },
  postCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 0,
    marginVertical: 15,
    alignSelf: 'center',
     width: screenWidth * 0.50,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
   
  },
  postImage: {
  width: screenWidth * 0.5, // o cualquier porcentaje deseado del ancho de la pantalla
  height: screenWidth * 0.5, // asegúrate de que la altura sea igual al ancho para mantener la proporción cuadrada
  borderRadius: 10,
},

   modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end', // Positions the menu at the bottom of the screen
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    // Set the height or maxHeight as needed, depending on your content
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#ccc', // Use your app's color scheme
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#0073e6', // Use your app's color scheme
  },
  nameText: {
    position: 'absolute', // Position absolutely to the parent View
    top: 10, // Distance from the top of the screen
    left: 10, // Distance from the left of the screen
    fontSize: 23, // Font size for the name text
    fontWeight: 'bold', // Make the font bold
    color: '#333', // Set the text color
    backgroundColor: 'transparent', // Ensure the background is transparent
  },
});

export default Students;