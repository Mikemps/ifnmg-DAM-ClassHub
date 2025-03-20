import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "../@types/types";

import Splash from "../pages/splash/splash"; 
import Login from "../pages/login/login"; 
import Menu from "../pages/menu/menu";
<<<<<<< Updated upstream
import Agendamentos from "../pages/agendar/agendar"; 
import Agendar from "../pages/agendamentos/agendamentos";

=======
import Agendamentos from "../pages/agendamentos/agendamentos"; 
import Agendar from "../pages/agendar/agendar";
>>>>>>> Stashed changes


const Stack = createNativeStackNavigator<RootStackParamList>(); 

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Menu" component={Menu} />
                <Stack.Screen name="Agendar" component={Agendar} />
                <Stack.Screen name="Agendamentos" component={Agendamentos} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}