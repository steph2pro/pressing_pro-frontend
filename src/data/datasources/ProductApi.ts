import { AxiosResponse } from 'axios';
import { 
  Produit, 
  ProduitListResponse, 
  CreateProduitRequest, 
  UpdateProduitRequest,
  ProduitSearchParams,
  Categorie,
  CategorieListResponse,
  CreateCategorieRequest,
  UpdateCategorieRequest,
  AlerteStockListResponse
} from '../models/products';
import api from './Api';
import { API_ENDPOINTS } from '../../utils/const';
import { mockProducts, mockCategories, mockStockAlerts } from '../mock/mockProducts';

export default class ProductApi {
  private useMocks: boolean =true

  // ==================== PRODUITS ====================

  /**
   * Récupère la liste paginée des produits
   */
  async getProducts(params?: ProduitSearchParams): Promise<ProduitListResponse> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filteredProducts = [...mockProducts];
      
      // Filtrage par recherche
      if (params?.search) {
        filteredProducts = filteredProducts.filter(product => 
          product.nom.toLowerCase().includes(params.search!.toLowerCase()) ||
          product.reference.toLowerCase().includes(params.search!.toLowerCase()) ||
          product.marque.toLowerCase().includes(params.search!.toLowerCase())
        );
      }
      
      // Filtrage par catégorie
      if (params?.categorieId) {
        filteredProducts = filteredProducts.filter(product => product.categorieId === params.categorieId);
      }
      
      // Filtrage par marque
      if (params?.marque) {
        filteredProducts = filteredProducts.filter(product => 
          product.marque.toLowerCase().includes(params.marque!.toLowerCase())
        );
      }
      
      // Filtrage stock faible
      if (params?.stockFaible) {
        filteredProducts = filteredProducts.filter(product => 
          product.quantite <= product.seuilAlerte
        );
      }
      
      // Filtrage par prix
      if (params?.prixMin) {
        filteredProducts = filteredProducts.filter(product => product.prixVente >= params.prixMin!);
      }
      
      if (params?.prixMax) {
        filteredProducts = filteredProducts.filter(product => product.prixVente <= params.prixMax!);
      }
      
      // Pagination
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
      
      return {
        data: paginatedProducts,
        total: filteredProducts.length,
        page,
        limit,
        pages: Math.ceil(filteredProducts.length / limit)
      };
    }

    const response: AxiosResponse<ProduitListResponse> = await api.get(API_ENDPOINTS.PRODUCTS, { params });
    return response.data;
  }

  /**
   * Récupère un produit par son ID
   */
  async getProductById(id: number): Promise<Produit> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const product = mockProducts.find(p => p.id === id);
      if (!product) {
        throw new Error('Produit non trouvé');
      }
      return product;
    }

    const response: AxiosResponse<Produit> = await api.get(API_ENDPOINTS.PRODUCT_BY_ID(id));
    return response.data;
  }

  /**
   * Crée un nouveau produit
   */
  async createProduct(payload: CreateProduitRequest): Promise<Produit> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newProduct: Produit = {
        id: Math.max(...mockProducts.map(p => p.id)) + 1,
        ...payload,
        statut: 'active',
        dateCreation: new Date()
      };
      
      mockProducts.push(newProduct);
      return newProduct;
    }

    const response: AxiosResponse<Produit> = await api.post(API_ENDPOINTS.PRODUCTS, payload);
    return response.data;
  }

  /**
   * Met à jour un produit existant
   */
  async updateProduct(id: number, payload: UpdateProduitRequest): Promise<Produit> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const productIndex = mockProducts.findIndex(p => p.id === id);
      if (productIndex === -1) {
        throw new Error('Produit non trouvé');
      }
      
      mockProducts[productIndex] = {
        ...mockProducts[productIndex],
        ...payload,
        dateModification: new Date()
      };
      
      return mockProducts[productIndex];
    }

    const response: AxiosResponse<Produit> = await api.put(API_ENDPOINTS.PRODUCT_BY_ID(id), payload);
    return response.data;
  }

  /**
   * Supprime un produit
   */
  async deleteProduct(id: number): Promise<void> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const productIndex = mockProducts.findIndex(p => p.id === id);
      if (productIndex === -1) {
        throw new Error('Produit non trouvé');
      }
      
      mockProducts.splice(productIndex, 1);
      return;
    }

    await api.delete(API_ENDPOINTS.PRODUCT_BY_ID(id));
  }

  // ==================== CATÉGORIES ====================

  /**
   * Récupère la liste des catégories
   */
  async getCategories(): Promise<Categorie[]> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockCategories;
    }

    const response: AxiosResponse<Categorie[]> = await api.get(API_ENDPOINTS.PRODUCT_CATEGORIES);
    return response.data;
  }

  /**
   * Crée une nouvelle catégorie
   */
  async createCategory(payload: CreateCategorieRequest): Promise<Categorie> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const newCategory: Categorie = {
        id: Math.max(...mockCategories.map(c => c.id)) + 1,
        ...payload,
        dateCreation: new Date()
      };
      
      mockCategories.push(newCategory);
      return newCategory;
    }

    const response: AxiosResponse<Categorie> = await api.post(API_ENDPOINTS.PRODUCT_CATEGORIES, payload);
    return response.data;
  }

  /**
   * Met à jour une catégorie existante
   */
  async updateCategory(id: number, payload: UpdateCategorieRequest): Promise<Categorie> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const categoryIndex = mockCategories.findIndex(c => c.id === id);
      if (categoryIndex === -1) {
        throw new Error('Catégorie non trouvée');
      }
      
      mockCategories[categoryIndex] = {
        ...mockCategories[categoryIndex],
        ...payload,
        dateModification: new Date()
      };
      
      return mockCategories[categoryIndex];
    }

    const response: AxiosResponse<Categorie> = await api.put(API_ENDPOINTS.PRODUCT_CATEGORY_BY_ID(id), payload);
    return response.data;
  }

  /**
   * Supprime une catégorie
   */
  async deleteCategory(id: number): Promise<void> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const categoryIndex = mockCategories.findIndex(c => c.id === id);
      if (categoryIndex === -1) {
        throw new Error('Catégorie non trouvée');
      }
      
      // Vérifier si des produits utilisent cette catégorie
      const productsUsingCategory = mockProducts.filter(p => p.categorieId === id);
      if (productsUsingCategory.length > 0) {
        throw new Error('Impossible de supprimer cette catégorie car des produits l\'utilisent');
      }
      
      mockCategories.splice(categoryIndex, 1);
      return;
    }

    await api.delete(API_ENDPOINTS.PRODUCT_CATEGORY_BY_ID(id));
  }

  // ==================== ALERTES STOCK ====================

  /**
   * Récupère les alertes de stock faible
   */
  async getStockAlerts(): Promise<AlerteStockListResponse> {
    if (this.useMocks) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        data: mockStockAlerts,
        total: mockStockAlerts.length,
        page: 1,
        limit: 10,
        pages: 1
      };
    }

    const response: AxiosResponse<AlerteStockListResponse> = await api.get(API_ENDPOINTS.PRODUCT_ALERTS);
    return response.data;
  }
}