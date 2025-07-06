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
    price: 4999.00,
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
  },
  {
    id: '7',
    name: 'Fresh Herbs Bundle',
    description: 'Aromatic bundle of basil, parsley, cilantro, and mint.',
    price: 2.50,
    image: 'https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Herbs & Spices',
    inStock: 35,
    featured: false,
    organic: true,
    seasonal: false
  },
  {
    id: '8',
    name: 'Grass-Fed Beef',
    description: 'Premium grass-fed beef cuts from pasture-raised cattle.',
    price: 25.99,
    image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-chop-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Meat & Poultry',
    inStock: 12,
    featured: true,
    organic: true,
    seasonal: false
  },
  {
    id: '9',
    name: 'Organic Grains Mix',
    description: 'Wholesome mix of quinoa, brown rice, and ancient grains.',
    price: 8.75,
    image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Grains & Cereals',
    inStock: 28,
    featured: false,
    organic: true,
    seasonal: false
  },
  {
    id: '10',
    name: 'Farm Fresh Milk',
    description: 'Creamy whole milk from grass-fed cows, delivered fresh daily.',
    price: 4.25,
    image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Dairy & Eggs',
    inStock: 45,
    featured: false,
    organic: true,
    seasonal: false
  },
  {
    id: '11',
    name: 'Seasonal Preserves',
    description: 'Homemade fruit preserves made from seasonal farm produce.',
    price: 6.50,
    image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Preserves & Jams',
    inStock: 22,
    featured: false,
    organic: true,
    seasonal: true
  },
  {
    id: '12',
    name: 'Organic Root Vegetables',
    description: 'Fresh carrots, beets, turnips, and radishes from our organic fields.',
    price: 5.75,
    image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Vegetables',
    inStock: 38,
    featured: false,
    organic: true,
    seasonal: false
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