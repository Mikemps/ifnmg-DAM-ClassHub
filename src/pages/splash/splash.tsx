import React, { useState } from "react";
import { View } from "react-native";

<<<<<<< Updated upstream
import { themes } from "../../global/themes";
import { styles } from "./styles";
=======
import { icons } from "../../global/icons"; 

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, "Splash">;

export default function Splash() {
    const navigation = useNavigation<SplashScreenNavigationProp>();

    useEffect(() => {
        const navigationTimer = setTimeout(() => {
            navigation.replace("Login");
        }, 3000); 

        return () => {
            clearTimeout(navigationTimer);
        };
    }, [navigation]);
>>>>>>> Stashed changes

export default function Splash() {
  
    return (
<<<<<<< Updated upstream
        <View style={styles.container}>

=======
        <View style={style.container}>
            <Image
                source={icons.splash}
                style={style.splashImage}
                resizeMode="contain"
            />
>>>>>>> Stashed changes
        </View>
    );
}