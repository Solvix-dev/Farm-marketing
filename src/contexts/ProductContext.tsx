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
    name: 'Organic Tomatoes',
    description: 'Fresh, vine-ripened organic tomatoes grown using sustainable farming practices.',
    price: 4.99,
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Vegetables',
    inStock: 50,
    featured: true,
    organic: true,
    seasonal: false
  },
  {
    id: '2',
    name: 'Free-Range Eggs',
    description: 'Farm-fresh eggs from free-range chickens, packed with nutrition and flavor.',
    price: 6.99,
    image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Dairy & Eggs',
    inStock: 30,
    featured: true,
    organic: true,
    seasonal: false
  },
  {
    id: '3',
    name: 'Seasonal Berries',
    description: 'Mixed seasonal berries including strawberries, blueberries, and raspberries.',
    price: 8.99,
    image: 'https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Fruits',
    inStock: 25,
    featured: true,
    organic: true,
    seasonal: true
  },
  {
    id: '4',
    name: 'Artisan Bread',
    description: 'Freshly baked artisan bread made with organic flour and traditional methods.',
    price: 5.99,
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Bakery',
    inStock: 20,
    featured: false,
    organic: true,
    seasonal: false
  },
  {
    id: '5',
    name: 'Raw Honey',
    description: 'Pure, unprocessed honey from our on-site beehives.',
    price: 12.99,
    image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Pantry',
    inStock: 15,
    featured: false,
    organic: true,
    seasonal: false
  },
  {
    id: '6',
    name: 'Leafy Greens Mix',
    description: 'Fresh mix of spinach, kale, and arugula perfect for salads and smoothies.',
    price: 3.99,
    image: 'https://images.pexels.com/photos/1166227/pexels-photo-1166227.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Vegetables',
    inStock: 40,
    featured: false,
    organic: true,
    seasonal: false
  }
];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

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
  const categories = [...new Set(products.map(product => product.category))];

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