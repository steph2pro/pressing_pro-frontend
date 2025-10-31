import { Transaction, ValidationTransactionRequest } from '../../../data/models/transactions';
import TransactionApi from '../../../data/datasources/TransactionApi';
import toast from 'react-hot-toast';

export const validateTransactionUseCase = async (
  id: number,
  validationData: ValidationTransactionRequest,
  transactionApi: TransactionApi
): Promise<Transaction> => {
  try {
    const response = await transactionApi.validateTransaction(id, validationData);
    
    if (validationData.statut === 'validated') {
      toast.success('✅ Transaction validée avec succès !');
    } else {
      toast.success('❌ Transaction annulée avec succès !');
    }
    
    return response;
  } catch (error: any) {
    console.error("Erreur lors de la validation de la transaction :", error);
    const message = error?.response?.data?.error || "Erreur inconnue";
    toast.error(`❌ ${message}`);
    throw error;
  }
};