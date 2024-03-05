import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Category, Transaction } from '../type';
import { useSQLiteContext } from 'expo-sqlite/next';

export default function Home() {
    const [categories,setCategories] = useState<Category[]>([]);
    const [transactions,setTransactions] = useState<Transaction[]>([]);
    const db = useSQLiteContext();
  return (
    <View>
      <Text>Home Tour</Text>
     </View>
  );
}
