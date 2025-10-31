// Export de tous les use cases pour les produits
export { createProductUseCase } from './CreateProductUseCase';
export { getProductsUseCase } from './GetProductsUseCase';
export { getProductByIdUseCase } from './GetProductByIdUseCase';
export { updateProductUseCase } from './UpdateProductUseCase';
export { deleteProductUseCase } from './DeleteProductUseCase';
export { updateProductStockUseCase } from './UpdateProductStockUseCase';
export { createCategoryUseCase } from './CreateCategoryUseCase';
export { getCategoriesUseCase } from './GetCategoriesUseCase';
export { updateCategoryUseCase } from './UpdateCategoryUseCase';
export { deleteCategoryUseCase } from './DeleteCategoryUseCase';
export { getStockAlertsUseCase } from './GetStockAlertsUseCase';
export { calculateProductStatsUseCase } from './CalculateProductStatsUseCase';
export { toggleProductStatusUseCase } from './ToggleProductStatusUseCase';
export type { ProductStats } from './CalculateProductStatsUseCase';