import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { useProducts, Product } from '../../contexts/ProductContext';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
}

interface ProductFormData {
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

const SimpleProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
  const { addProduct, updateProduct, categories } = useProducts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || 0,
      image: product?.image || '',
      category: product?.category || '',
      inStock: product?.inStock || 0,
      featured: product?.featured || false,
      organic: product?.organic || false,
      seasonal: product?.seasonal || false,
    }
  });

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);

    try {
      if (!data.name?.trim()) {
        toast.error('Product name is required.');
        return;
      }

      if (!data.category) {
        toast.error('Please select a category.');
        return;
      }

      const productData: Omit<Product, 'id'> = {
        name: data.name.trim(),
        description: data.description || '',
        price: Number(data.price) || 0,
        image: data.image || 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=500',
        category: data.category,
        inStock: Number(data.inStock) || 0,
        featured: Boolean(data.featured),
        organic: Boolean(data.organic),
        seasonal: Boolean(data.seasonal)
      };

      if (product) {
        updateProduct(product.id, productData);
        toast.success('Product updated successfully!');
      } else {
        addProduct(productData);
        toast.success('Product added successfully!');
      }
      
      onClose();
    } catch (error) {
      toast.error('Failed to save product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              {...register('name', { required: 'Product name is required' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter product description"
            />
          </div>

          {/* Price and Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₦)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                {...register('price', { 
                  required: 'Price is required',
                  min: { value: 0, message: 'Price must be positive' }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="0.00"
              />
              {errors.price && (
                <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                min="0"
                {...register('inStock', { 
                  required: 'Stock quantity is required',
                  min: { value: 0, message: 'Stock must be positive' }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="0"
              />
              {errors.inStock && (
                <p className="text-red-600 text-sm mt-1">{errors.inStock.message}</p>
              )}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              {...register('category', { required: 'Category is required' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL (Optional)
            </label>
            <input
              type="url"
              {...register('image')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register('featured')}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-sm font-medium text-gray-700">Featured</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register('organic')}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-sm font-medium text-gray-700">Organic</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register('seasonal')}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-sm font-medium text-gray-700">Seasonal</span>
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save className="h-4 w-4" />
              )}
              {product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SimpleProductForm;
