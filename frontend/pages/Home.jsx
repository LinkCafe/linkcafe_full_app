import { ScrollView } from "react-native";
import React, { useContext, useEffect } from "react";
import Categories from "../components/Categories";
import { SafeAreaView } from "react-native-safe-area-context";
import Discussions from "../components/Discussions";
import Articles from "../components/Articles";
import ThemeContext from "../context/ThemeContext";

const Home = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme == 'light' ? 'white' : '#202020'}}>
      <ScrollView>
        <Categories />
        <Discussions />
        <Articles />
      </ScrollView>
    </SafeAreaView>
  );
};



export default Home;
