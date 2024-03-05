import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Category, Transaction } from '../type';
import { useSQLiteContext } from 'expo-sqlite/next';

export default function Home() {
    const [categories,setCategories] = useState<Category[]>([]);
    const [transactions,setTransactions] = useState<Transaction[]>([]);
    const db = useSQLiteContext();

    useEffect(() =>{
        db.withTransactionAsync(async () =>{
            await getData();
        })
    },[db])

    async function getData() {
        const result = await db.getAllAsync<Transaction>(`SELECT * FROM Transactions ORDER BY date DESC;`);
        setTransactions(result);
        // console.log(result);
    }
  return (
    <View>
      <Text>Home Tour</Text>
     </View>
  );
}
