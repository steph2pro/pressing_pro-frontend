import { AxiosResponse } from 'axios';
import { 
  Depense, 
  DepenseListResponse, 
  CreateDepenseRequest, 
  UpdateDepenseRequest,
  ValidationDepenseRequest,
  DepenseSearchParams,
  DepenseStats,
  DepenseStatut
} from '../models/expenses';
import api from './Api';
import { API_ENDPOINTS } from '../../utils/const';
import { mockExpenses, mockExpensesStats } from '../mock/mockExpenses';

export default class ExpenseApi {
  private useMocks: boolean =true

  /**
   * Récupère la liste paginée des dépenses
   */
  async getExpenses(params?: DepenseSearchParams): Promise<DepenseListResponse> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filteredExpenses = [...mockExpenses];
      
      // Filtrage par catégorie
      if (params?.categorie) {
        filteredExpenses = filteredExpenses.filter(expense => expense.categorie === params.categorie);
      }
      
      // Filtrage par statut
      if (params?.statut) {
        filteredExpenses = filteredExpenses.filter(expense => expense.statut === params.statut);
      }
      
      // Filtrage par date
      if (params?.dateDebut) {
        filteredExpenses = filteredExpenses.filter(expense => 
          new Date(expense.dateCreation) >= new Date(params.dateDebut!)
        );
      }
      
      if (params?.dateFin) {
        filteredExpenses = filteredExpenses.filter(expense => 
          new Date(expense.dateCreation) <= new Date(params.dateFin!)
        );
      }
      
      // Pagination
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedExpenses = filteredExpenses.slice(startIndex, endIndex);
      
      return {
        data: paginatedExpenses,
        total: filteredExpenses.length,
        page,
        limit,
        pages: Math.ceil(filteredExpenses.length / limit)
      };
    }

    const response: AxiosResponse<DepenseListResponse> = await api.get(API_ENDPOINTS.EXPENSES, { params });
    return response.data;
  }

  /**
   * Récupère une dépense par son ID
   */
  async getExpenseById(id: number): Promise<Depense> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const expense = mockExpenses.find(e => e.id === id);
      if (!expense) {
        throw new Error('Dépense non trouvée');
      }
      return expense;
    }

    const response: AxiosResponse<Depense> = await api.get(API_ENDPOINTS.EXPENSE_BY_ID(id));
    return response.data;
  }

  /**
   * Crée une nouvelle dépense
   */
  async createExpense(payload: CreateDepenseRequest): Promise<Depense> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newExpense: Depense = {
        id: Math.max(...mockExpenses.map(e => e.id)) + 1,
        ...payload,
        statut: DepenseStatut.PENDING,
        utilisateurId: 3, // Mock user ID
        dateCreation: new Date()
      };
      
      mockExpenses.push(newExpense);
      return newExpense;
    }

    const response: AxiosResponse<Depense> = await api.post(API_ENDPOINTS.EXPENSES, payload);
    return response.data;
  }

  /**
   * Met à jour une dépense existante
   */
  async updateExpense(id: number, payload: UpdateDepenseRequest): Promise<Depense> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const expenseIndex = mockExpenses.findIndex(e => e.id === id);
      if (expenseIndex === -1) {
        throw new Error('Dépense non trouvée');
      }
      
      mockExpenses[expenseIndex] = {
        ...mockExpenses[expenseIndex],
        ...payload,
        dateModification: new Date()
      };
      
      return mockExpenses[expenseIndex];
    }

    const response: AxiosResponse<Depense> = await api.put(API_ENDPOINTS.EXPENSE_BY_ID(id), payload);
    return response.data;
  }

  /**
   * Supprime une dépense
   */
  async deleteExpense(id: number): Promise<void> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const expenseIndex = mockExpenses.findIndex(e => e.id === id);
      if (expenseIndex === -1) {
        throw new Error('Dépense non trouvée');
      }
      
      mockExpenses.splice(expenseIndex, 1);
      return;
    }

    await api.delete(API_ENDPOINTS.EXPENSE_BY_ID(id));
  }

  /**
   * Valide ou rejette une dépense
   */
  async validateExpense(id: number, payload: ValidationDepenseRequest): Promise<Depense> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const expenseIndex = mockExpenses.findIndex(e => e.id === id);
      if (expenseIndex === -1) {
        throw new Error('Dépense non trouvée');
      }
      
      mockExpenses[expenseIndex] = {
        ...mockExpenses[expenseIndex],
        statut: payload.statut,
        validateurId: 1, // Mock admin user
        dateValidation: new Date(),
        dateModification: new Date()
      };
      
      return mockExpenses[expenseIndex];
    }

    const response: AxiosResponse<Depense> = await api.post(
      API_ENDPOINTS.EXPENSE_VALIDATE(id), 
      payload
    );
    return response.data;
  }

  /**
   * Récupère les statistiques des dépenses
   */
  async getExpensesStats(): Promise<DepenseStats> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 600));
      return mockExpensesStats;
    }

    const response: AxiosResponse<DepenseStats> = await api.get(`${API_ENDPOINTS.EXPENSES}/stats`);
    return response.data;
  }
}