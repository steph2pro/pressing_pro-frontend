export const Urls = {
  base: 'http://localhost:3001',
};

export const API_ENDPOINTS = {
  // 🔐 Auth
  LOGIN: '/api/auth/login',
  REFRESH_TOKEN: '/api/auth/refresh',
  LOGOUT: '/api/auth/logout',
  CHANGE_PASSWORD: '/api/auth/change-password',

  // 👥 Users
  USERS: '/api/users',
  USER_BY_ID: (id: number) => `/api/users/${id}`,
  USER_PROFILE: '/api/users/profile',
  USER_STATISTICS: '/api/users/statistics',
  UPDATE_PROFILE: '/api/auth/update/profile',

  // 👑 Roles & Permissions
  ROLES: '/api/roles',
  ROLE_BY_ID: (id: number) => `/api/roles/${id}`,
  ROLE_STATISTICS: '/api/roles/statistics',
  PERMISSIONS: '/api/permissions',
  ROLE_PERMISSIONS: '/api/role-permissions',

  // 🛒 Products
  PRODUCTS: '/api/products',
  PRODUCT_BY_ID: (id: number) => `/api/products/${id}`,
  PRODUCT_CATEGORIES: '/api/categories',
  PRODUCT_CATEGORY_BY_ID: (id: number) => `/api/categories/${id}`,
  PRODUCT_ALERTS: '/api/products/alerts/stock',

  // 📦 Supplies
  SUPPLIES: '/api/supplies',
  SUPPLY_BY_ID: (id: number) => `/api/supplies/${id}`,
  SUPPLY_LINES: (id: number) => `/api/supplies/${id}/lines`,

  // 💰 Sales
  SALES: '/api/sales',
  SALE_BY_ID: (id: number) => `/api/sales/${id}`,
  INVOICES: '/api/invoices',
  INVOICE_BY_ID: (id: number) => `/api/invoices/${id}`,

  // 💸 Expenses
  EXPENSES: '/api/expenses',
  EXPENSE_BY_ID: (id: number) => `/api/expenses/${id}`,
  EXPENSE_VALIDATE: (id: number) => `/api/expenses/${id}/validate`,

  // 💳 Transactions
  TRANSACTIONS: '/api/transactions',
  TRANSACTION_BY_ID: (id: number) => `/api/transactions/${id}`,
  TRANSACTION_VALIDATE: (id: number) => `/api/transactions/${id}/validate`,
  BALANCE: '/api/transactions/balance',

  // 📊 Reports
  REPORTS: '/api/reports',
  STATISTICS: '/api/statistics',
  CHARTS: '/api/charts',

  // 🔍 Audit Logs
  AUDIT_LOGS: '/api/audit/logs',

  // 🔔 Notifications
  NOTIFICATIONS: '/api/notifications',
  NOTIFICATION_BY_ID: (id: number) => `/api/notifications/${id}`,
  NOTIFICATIONS_MARK_READ: '/api/notifications/mark-read',
  NOTIFICATIONS_UNREAD_COUNT: '/api/notifications/unread-count',

  // 📈 Custom Reports Endpoints (optionnel)
  REPORT_SALES: '/api/reports/sales',
  REPORT_FINANCIAL: '/api/reports/financial',
  REPORT_CUSTOM: '/api/reports/custom',
  REPORT_TOP_PRODUCTS: '/api/reports/top-products',
  REPORT_PERFORMANCE_CATEGORIES: '/api/reports/performance-categories',
  REPORT_EXPORT: '/api/reports/export',
};
