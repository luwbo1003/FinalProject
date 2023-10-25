import React, { useEffect, useState } from "react";
import "intl-pluralrules";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./src/navigations/TabNavigator";
import { customTheme } from "./src/navigations/customTheme";
import "./i18n";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from "./src/screens/Login/LoginScreen";

const App = () => {
  const [isVerify,setIsVerify] = useState(false);
  useEffect(()=>{
    
    const getSessionId = async () => {
      await AsyncStorage.clear()
      const sessionID = await AsyncStorage.getItem("sessionId");
      if(sessionID){
        setIsVerify(true);
      }else{
        setIsVerify(false);
      }
    };
    getSessionId()
  }, []);

  return (
    <>
    {
      <NavigationContainer theme={customTheme}>
      {isVerify ? <BottomTabNavigator /> : <LoginScreen />}
      </NavigationContainer>
    }
    </>
  );
};

export default App;