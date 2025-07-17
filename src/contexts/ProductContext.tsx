import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: number;
  featured: boolean;
  organic: boolean;
  seasonal: boolean;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  featuredProducts: Product[];
  categories: string[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Maize',
    description: 'High-quality maize from Northern Nigeria, perfect for various meals.',
    price: 3500.00,
    image: 'https://images.pexels.com/photos/255459/pexels-photo-255459.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Cereals',
    inStock: 100,
    featured: true,
    organic: true,
    seasonal: false
  },
  {
    id: '2',
    name: 'Soybeans',
    description: 'Nutritious soybeans, a great source of protein.',
    price: 4500.00,
    image: 'https://images.pexels.com/photos/158648/soy-beans-soy-soy-protein-158648.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Legumes',
    inStock: 80,
    featured: true,
    organic: true,
    seasonal: false
  },
  {
    id: '3',
    name: 'Live Cow',
    description: 'Healthy and strong live cow, ideal for breeding or meat.',
    price: 150000.00,
    image: 'https://images.pexels.com/photos/162240/bull-calf-heifer-ko-162240.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Livestock',
    inStock: 10,
    featured: true,
    organic: false,
    seasonal: false
  },
  {
    id: '4',
    name: 'Fresh Eggs',
    description: 'Farm-fresh eggs from healthy chickens.',
    price: 1200.00,
    image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Poultry',
    inStock: 200,
    featured: false,
    organic: true,
    seasonal: false
  },
  {
    id: '5',
    name: 'Teak Wood',
    description: 'High-quality teak wood for furniture and construction.',
    price: 50000.00,
    image: 'https://images.pexels.com/photos/139338/pexels-photo-139338.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Forestry',
    inStock: 15,
    featured: false,
    organic: false,
    seasonal: false
  },
  {
    id: '6',
    name: 'Tomatoes',
    description: 'Fresh and juicy tomatoes, grown organically.',
    price: 800.00,
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Vegetables',
    inStock: 150,
    featured: false,
    organic: true,
    seasonal: true
  },
  {
    id: '7',
    name: 'Mangoes',
    description: 'Sweet and delicious mangoes, perfect for a healthy snack.',
    price: 1500.00,
    image: 'https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Fruits',
    inStock: 120,
    featured: true,
    organic: true,
    seasonal: true
  }
];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem('farm-products');
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });

  // Save products to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem('farm-products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, ...updates } : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const featuredProducts = products.filter(product => product.featured);
  const categories = [
    'Cereals',
    'Legumes',
    'Livestock',
    'Poultry',
    'Forestry',
    'Vegetables',
    'Fruits'
  ];

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      featuredProducts,
      categories
    }}>
      {children}
    </ProductContext.Provider>
  );
};