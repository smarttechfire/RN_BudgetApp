import { TouchableOpacity,Text, View } from "react-native";
import { Category, Transaction } from "../type"
import TransactionListItem from "./TransactionListItem";

export default function TransactionList({
    transactions,
    categories,
    deleteTransaction,
}:{
    categories: Category[];
    transactions: Transaction[];
    deleteTransaction: (id: number) => Promise<void>
}) 
{
  return (
    <View style={{gap: 15}}>
      {transactions.map((transaction) =>{
        const categoryForCurrentitem = categories.find(
            (category) => category.id === transaction.category_id
        )
        return(
            <TouchableOpacity
                key={transaction.id}
                activeOpacity={0.7}
                onLongPress={()=>deleteTransaction(transaction.id)}
            >
                {/* transaction item */}
                <TransactionListItem transaction={transaction} categoryInfo={categoryForCurrentitem}/>
            </TouchableOpacity>
        )
      })

      }
    </View>
  )
}
