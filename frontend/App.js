import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import "intl-pluralrules";
import "./i18n";
import { customTheme } from "./src/navigations/customTheme";
import BottomTabNavigator from "./src/navigations/TabNavigator";
import LoginScreen from "./src/screens/Login/LoginScreen";

const App = () => {
  const [isVerify, setIsVerify] = useState(false);

  useEffect(() => {
    const getSessionId = async () => {
      await AsyncStorage.clear();
      const sessionID = await AsyncStorage.getItem("sessionId");
      if (sessionID) {
        setIsVerify(true);
      } else {
        setIsVerify(false);
      }
    };
    getSessionId();
  }, []);

  const handleVerify = (props) => {
    // Xử lý props được truyền từ LoginScreen ở đây
    if (props) {
      setIsVerify(true);
    } else {
      setIsVerify(false);
    }
  };

  return (
    <>
      {
        <NavigationContainer theme={customTheme}>
          {isVerify ? (
            <BottomTabNavigator />
          ) : (
            <LoginScreen handleLoginProps={handleVerify} />
          )}
        </NavigationContainer>
      }
    </>
  );
};

export default App;
