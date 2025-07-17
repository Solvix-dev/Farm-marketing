import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  DollarSign, 
  Users, 
  Package, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle
} from 'lucide-react';
import { useProducts } from '../../contexts/ProductContext';

const Dashboard: React.FC = () => {
  const { products } = useProducts();

  const stats = [
    {
      label: 'Total Revenue',
      value: '₦1,234,500',
      change: '+12.5%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'green'
    },
    {
      label: 'Orders Today',
      value: '24',
      change: '+8.2%',
      changeType: 'increase',
      icon: ShoppingCart,
      color: 'blue'
    },
    {
      label: 'Active Customers',
      value: '1,234',
      change: '+5.1%',
      changeType: 'increase',
      icon: Users,
      color: 'purple'
    },
    {
      label: 'Products in Stock',
      value: products.length.toString(),
      change: '-2.3%',
      changeType: 'decrease',
      icon: Package,
      color: 'orange'
    }
  ];

  const lowStockProducts = products.filter(product => product.inStock < 10);

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your business today.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6 border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.changeType === 'increase' ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Alerts Section */}
      {lowStockProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-6"
        >
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
            <h3 className="text-lg font-semibold text-yellow-800">Low Stock Alert</h3>
          </div>
          <p className="text-yellow-700 mb-4">
            The following products are running low on stock:
          </p>
          <div className="space-y-2">
            {lowStockProducts.map(product => (
              <div key={product.id} className="flex justify-between items-center bg-white rounded-lg p-3">
                <span className="font-medium text-gray-900">{product.name}</span>
                <span className="text-red-600 font-semibold">{product.inStock} left</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-lg shadow-sm p-6 border"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Overview</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <p>Sales chart would be implemented here with a charting library</p>
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-lg shadow-sm p-6 border"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {[
              { id: '#001', customer: 'John Doe', amount: '₦45,990', status: 'Delivered' },
              { id: '#002', customer: 'Jane Smith', amount: '₦32,500', status: 'Processing' },
              { id: '#003', customer: 'Bob Johnson', amount: '₦78,250', status: 'Shipped' },
              { id: '#004', customer: 'Alice Brown', amount: '₦22,750', status: 'Pending' },
            ].map(order => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{order.customer}</p>
                  <p className="text-sm text-gray-600">{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{order.amount}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;