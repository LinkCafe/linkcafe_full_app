import { ScrollView } from "react-native";
import React, { useContext } from "react";
import Categories from "../components/organismos/Categories";
import { SafeAreaView } from "react-native-safe-area-context";
import Discussions from "../components/organismos/Discussions";
import Articles from "../components/organismos/Articles";
import ThemeContext from "../context/ThemeContext";

const Home = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme == 'light' ? '#E8DCD1' : '#202020'}}>
      <ScrollView>
        <Categories />
        <Discussions />
        <Articles />
      </ScrollView>
    </SafeAreaView>
  );
};



export default Home;
