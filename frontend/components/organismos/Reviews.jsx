import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Button, Card } from "@rneui/base";
import ThemeContext from "../../context/ThemeContext";

const Reviews = () => {
  const data = [
    {
      username: "User A",
      description: "Gracias por tu colaboración",
    },
    {
        username: "User B",
        description: "Gracias por tu colaboración",
      },
      {
        username: "User C",
        description: "Gracias por tu colaboración",
      },
  ];

  const { theme } = useContext(ThemeContext)

  return (
    <SafeAreaView>
      <View style={style.moreCategories}>
        <Text style={[style.moreCategoriesText, { color: theme == 'light' ? 'black' : 'white' }]}>Reseñas</Text>
        <Button
          type="outline"
          title="Ver todo >"
          buttonStyle={{ padding: 1, borderColor: theme == 'light' ? 'black' : 'white', borderWidth: 1 }}
          titleStyle={{ color: theme == 'light' ? 'black' : 'white' }}
        />
      </View>
      <ScrollView horizontal={true}>
        <View style={style.containerCard}>
          {data.map((d, index) => (
            <Card key={index} containerStyle={{ backgroundColor: theme == 'light' ? '#E8DCD1' : '#464646', borderRadius: 5, display: 'flex', gap: 10, margin: 0 }} >
              <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 20 }}>
                <Avatar
                  size={40}
                  rounded
                  title="🌱"
                  containerStyle={{ backgroundColor: "#e9e9e9" }}
                />
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: theme == 'light' ? 'black' : 'white'}}>{d.username}</Text>
              </View>
              <View style={{ width: '100%' }}>
                <Text style={{ color: theme == 'light' ? 'black' : 'white' }}>{d.description}</Text>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  moreCategories: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15
  },
  moreCategoriesText: {
    fontSize: 20,
    fontWeight: "600",
  },
  containerCard: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 10
  },
});

export default Reviews;
