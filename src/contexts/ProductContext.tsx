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
    name: 'Premium Basmati Rice',
    description: 'High-quality long-grain basmati rice from Northern Nigeria, perfect for special occasions.',
    price: 4999.00,
    image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Rice & Grains',
    inStock: 50,
    featured: true,
    organic: true,
    seasonal: false
  },
  {
    id: '2',
    name: 'Local Brown Rice',
    description: 'Nutritious brown rice variety grown in the fertile lands of Northern Nigeria.',
    price: 6.99,
    image: 'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Rice & Grains',
    inStock: 30,
    featured: true,
    organic: true,
    seasonal: false
  },
  {
    id: '3',
    name: 'Premium Kuza (Clay)',
    description: 'High-quality clay material sourced from Northern Nigeria, perfect for pottery and construction.',
    price: 8.99,
    image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Mining Materials',
    inStock: 25,
    featured: true,
    organic: false,
    seasonal: false
  },
  {
    id: '4',
    name: 'White Rice (Parboiled)',
    description: 'Premium parboiled white rice with excellent texture and nutritional value.',
    price: 5.99,
    image: 'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Rice & Grains',
    inStock: 20,
    featured: false,
    organic: true,
    seasonal: false
  },
  {
    id: '5',
    name: 'Limestone Aggregate',
    description: 'High-grade limestone aggregate perfect for construction and industrial applications.',
    price: 12.99,
    image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Mining Materials',
    inStock: 15,
    featured: false,
    organic: false,
    seasonal: false
  },
  {
    id: '6',
    name: 'Jasmine Rice',
    description: 'Aromatic jasmine rice with delicate fragrance and superior cooking quality.',
    price: 3.99,
    image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Rice & Grains',
    inStock: 40,
    featured: false,
    organic: true,
    seasonal: false
  },
  {
    id: '7',
    name: 'Millet Grains',
    description: 'Nutritious millet grains, a traditional staple from Northern Nigeria.',
    price: 2.50,
    image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Rice & Grains',
    inStock: 35,
    featured: false,
    organic: true,
    seasonal: false
  },
  {
    id: '8',
    name: 'Granite Chips',
    description: 'Premium granite chips for construction and decorative applications.',
    price: 25.99,
    image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Mining Materials',
    inStock: 12,
    featured: true,
    organic: false,
    seasonal: false
  },
  {
    id: '9',
    name: 'Sorghum Grains',
    description: 'Premium sorghum grains, drought-resistant and highly nutritious.',
    price: 8.75,
    image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Rice & Grains',
    inStock: 28,
    featured: false,
    organic: true,
    seasonal: false
  },
  {
    id: '10',
    name: 'Sand (Fine Grade)',
    description: 'High-quality fine sand perfect for construction and masonry work.',
    price: 4.25,
    image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Mining Materials',
    inStock: 45,
    featured: false,
    organic: false,
    seasonal: false
  },
  {
    id: '11',
    name: 'Fonio Grains',
    description: 'Ancient super grain fonio, rich in nutrients and perfect for healthy meals.',
    price: 6.50,
    image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Rice & Grains',
    inStock: 22,
    featured: false,
    organic: true,
    seasonal: false
  },
  {
    id: '12',
    name: 'Laterite Soil',
    description: 'Premium laterite soil ideal for construction and road building projects.',
    price: 5.75,
    image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Mining Materials',
    inStock: 38,
    featured: false,
    organic: false,
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