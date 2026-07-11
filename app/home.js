import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, SIZES } from "../constants/theme";
import ScreenHeaderBtn from "../components/ScreenHeaderBtn";
import Welcome from "../components/Welcome";
import DailyQuote from "../components/DailyQuote";
import PopularMeditation from "../components/PopularMeditation";
import DailyMeditation from "../components/DailyMeditation";

const Home = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // Defaulting standard layout theme configuration

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    const user = await AsyncStorage.getItem("userDetails");
    console.log("user", user);
    setUserDetails(user);
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <ScreenHeaderBtn />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              padding: SIZES.medium,
            }}
            testID="screensDisplay"
          >
            {/* Contextually Ordered Interface Modules */}
            <Welcome userDetails={userDetails ? JSON.parse(userDetails) : null} isDarkMode={isDarkMode} />
            <DailyQuote />
            <PopularMeditation isDarkMode={isDarkMode} />
            <DailyMeditation isDarkMode={isDarkMode} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;