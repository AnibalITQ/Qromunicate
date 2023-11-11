import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/components/LoginScreen';
import Inicio from './src/pages/Inicio';
import DenunciaDetailScreen from './src/pages/DenunciaDetailScreen';
import DenunciasScreen from './src/pages/DenunciasScreen';
import ReporteScreen from './src/pages/ReporteScreen';
import ReporteDetail from './src/pages/ReporteDetail';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Inicio" component={Inicio} />
         <Stack.Screen name="Denuncias" component={DenunciasScreen} />
        <Stack.Screen name="DenunciaDetail" component={DenunciaDetailScreen} />
      <Stack.Screen name="Reporte" component={ReporteScreen} /> 
     <Stack.Screen name="ReporteDetail" component={ReporteDetail} />  
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;