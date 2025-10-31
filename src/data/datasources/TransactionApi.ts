import { AxiosResponse } from 'axios';
import { 
  Transaction, 
  TransactionListResponse, 
  CreateTransactionRequest, 
  ValidationTransactionRequest,
  TransactionSearchParams,
  Solde,
  MouvementTresorerie,
  TransactionStatut
} from '../models/transactions';
import api from './Api';
import { API_ENDPOINTS } from '../../utils/const';
import { mockTransactions, mockBalance, mockMouvementsTresorerie } from '../mock/mockTransactions';

export default class TransactionApi {
  private useMocks: boolean =true;

//   constructor(useMocks: boolean = process.env.NODE_ENV === 'development') {
//     this.useMocks = useMocks;
//   }

  /**
   * Récupère la liste paginée des transactions
   */
  async getTransactions(params?: TransactionSearchParams): Promise<TransactionListResponse> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filteredTransactions = [...mockTransactions];
      
      // Filtrage par type
      if (params?.type) {
        filteredTransactions = filteredTransactions.filter(transaction => transaction.type === params.type);
      }
      
      // Filtrage par statut
      if (params?.statut) {
        filteredTransactions = filteredTransactions.filter(transaction => transaction.statut === params.statut);
      }
      
      // Filtrage par date
      if (params?.dateDebut) {
        filteredTransactions = filteredTransactions.filter(transaction => 
          new Date(transaction.dateOperation) >= new Date(params.dateDebut!)
        );
      }
      
      if (params?.dateFin) {
        filteredTransactions = filteredTransactions.filter(transaction => 
          new Date(transaction.dateOperation) <= new Date(params.dateFin!)
        );
      }
      
      // Pagination
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);
      
      return {
        data: paginatedTransactions,
        total: filteredTransactions.length,
        page,
        limit,
        pages: Math.ceil(filteredTransactions.length / limit)
      };
    }

    const response: AxiosResponse<TransactionListResponse> = await api.get(API_ENDPOINTS.TRANSACTIONS, { params });
    return response.data;
  }

  /**
   * Récupère une transaction par son ID
   */
  async getTransactionById(id: number): Promise<Transaction> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const transaction = mockTransactions.find(t => t.id === id);
      if (!transaction) {
        throw new Error('Transaction non trouvée');
      }
      return transaction;
    }

    const response: AxiosResponse<Transaction> = await api.get(API_ENDPOINTS.TRANSACTION_BY_ID(id));
    return response.data;
  }

  /**
   * Crée une nouvelle transaction
   */
  async createTransaction(payload: CreateTransactionRequest): Promise<Transaction> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newTransaction: Transaction = {
        id: Math.max(...mockTransactions.map(t => t.id)) + 1,
        ...payload,
        statut: TransactionStatut.PENDING,
        utilisateurId: 4, // Mock user ID
        dateCreation: new Date()
      };
      
      mockTransactions.push(newTransaction);
      
      // Mettre à jour le solde
      if (payload.type === 'depot') {
        mockBalance.soldeEnAttente += payload.montant;
        mockBalance.totalDepots += payload.montant;
      } else {
        mockBalance.soldeEnAttente -= payload.montant;
        mockBalance.totalRetraits += payload.montant;
      }
      
      mockBalance.dateMiseAJour = new Date();
      
      return newTransaction;
    }

    const response: AxiosResponse<Transaction> = await api.post(API_ENDPOINTS.TRANSACTIONS, payload);
    return response.data;
  }

  /**
   * Valide ou annule une transaction
   */
  async validateTransaction(id: number, payload: ValidationTransactionRequest): Promise<Transaction> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const transactionIndex = mockTransactions.findIndex(t => t.id === id);
      if (transactionIndex === -1) {
        throw new Error('Transaction non trouvée');
      }
      
      const transaction = mockTransactions[transactionIndex];
      
      mockTransactions[transactionIndex] = {
        ...transaction,
        statut: payload.statut,
        validateurId: 1, // Mock admin user
        dateValidation: new Date(),
        dateModification: new Date()
      };
      
      // Mettre à jour le solde si validée
      if (payload.statut === 'validated') {
        if (transaction.type === 'depot') {
          mockBalance.soldeDisponible += transaction.montant;
          mockBalance.soldeEnAttente -= transaction.montant;
        } else {
          mockBalance.soldeDisponible -= transaction.montant;
          mockBalance.soldeEnAttente += transaction.montant;
        }
        mockBalance.dateMiseAJour = new Date();
      }
      
      return mockTransactions[transactionIndex];
    }

    const response: AxiosResponse<Transaction> = await api.post(
      API_ENDPOINTS.TRANSACTION_VALIDATE(id), 
      payload
    );
    return response.data;
  }

  /**
   * Récupère le solde actuel
   */
  async getBalance(): Promise<Solde> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 400));
      return mockBalance;
    }

    const response: AxiosResponse<Solde> = await api.get(API_ENDPOINTS.BALANCE);
    return response.data;
  }

  /**
   * Récupère l'historique des mouvements de trésorerie
   */
  async getMouvementsTresorerie(): Promise<MouvementTresorerie[]> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockMouvementsTresorerie;
    }

    const response: AxiosResponse<MouvementTresorerie[]> = await api.get(`${API_ENDPOINTS.TRANSACTIONS}/mouvements`);
    return response.data;
  }
}