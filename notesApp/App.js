import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

/////////// stack navigation/////////
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import { AppProvider as NotesProvider } from "./context/notesContext";
import { AppProvider as CreateNoteScreenProvider } from "./context/createNoteContext";

const stack = createStackNavigator();

export default function App() {
  return (
    <NotesProvider>
      <CreateNoteScreenProvider>
        <NavigationContainer>
          <stack.Navigator>
            <stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: "Your Notes",
                headerStyle: { backgroundColor: "gray" },
                headerTitleStyle: {
                  fontSize: 25,
                },
              }}
            ></stack.Screen>
          </stack.Navigator>
        </NavigationContainer>
      </CreateNoteScreenProvider>
    </NotesProvider>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
