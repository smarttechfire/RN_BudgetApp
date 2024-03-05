import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { Suspense, useEffect, useState } from "react";
import { SQLiteProvider } from "expo-sqlite/next";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from './screens/Home';

const Stack = createNativeStackNavigator();
const loadDatabse = async () => {
  const dbName = "mySQLiteDB.db";
  const dbAsset = require("./assets/mySQLiteDB.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;
  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
};
export default function App() {
  const [dbloaded, setDbLoaded] = useState<boolean>(false);
  useEffect(() => {
    loadDatabse()
      .then(() => setDbLoaded(true))
      .catch((e) => console.error(e));
  }, []);
  if (!dbloaded) return (
    <View style={{ flex: 1 }}>
      <ActivityIndicator size={"large"} />
      <Text>Loading Database...</Text>
    </View>
  )
  return (
    <NavigationContainer>
      <Suspense
        fallback={
          <View style={{ flex: 1 }}>
            <ActivityIndicator size={"large"} />
            <Text>Loading Database...</Text>
          </View>
        }
      >
        <SQLiteProvider databaseName="mySQLiteDB.db" useSuspense>
          <Stack.Navigator>
            <Stack.Screen 
              name="Home" 
              component={Home}
              options={{
                headerTitle:"Budget Buddy",
                headerLargeTitle: true,
              }}
              />
          </Stack.Navigator>
        </SQLiteProvider>
      </Suspense>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
