// In-memory storage for products (replace with a database in production)
let products = [
	{
	  id: "1",
	  name: "Sample Product 1",
	  category: "Electronics",
	  description: "A sample product description",
	  tags: "sample, electronics",
	  price: "99.99",
	  previewImage: null,
	  thumbnailImage: null,
	  createdAt: "2025-05-21T13:33:00.000Z", // 07:03 PM IST (UTC+5:30) = 13:33 UTC
	  views: 1000,
	  revenue: 999.90,
	},
	{
	  id: "2",
	  name: "Sample Product 2",
	  category: "Clothing",
	  description: "Another sample product",
	  tags: "sample, clothing",
	  price: "49.99",
	  previewImage: null,
	  thumbnailImage: null,
	  createdAt: "2025-05-21T13:33:00.000Z",
	  views: 500,
	  revenue: 249.95,
	},
	{
	  id: "3",
	  name: "Wireless Headphones",
	  category: "Electronics",
	  description: "High-quality wireless headphones with noise cancellation.",
	  tags: "headphones, wireless, electronics",
	  price: "129.99",
	  previewImage: null,
	  thumbnailImage: null,
	  createdAt: "2025-05-21T13:33:00.000Z",
	  views: 750,
	  revenue: 389.97,
	},
	{
	  id: "4",
	  name: "Cotton T-Shirt",
	  category: "Clothing",
	  description: "Comfortable cotton t-shirt available in multiple colors.",
	  tags: "tshirt, cotton, casual",
	  price: "19.99",
	  previewImage: null,
	  thumbnailImage: null,
	  createdAt: "2025-05-21T13:33:00.000Z",
	  views: 1200,
	  revenue: 239.88,
	},
	{
	  id: "5",
	  name: "Stainless Steel Water Bottle",
	  category: "Home & Kitchen",
	  description: "Durable water bottle for keeping beverages hot or cold.",
	  tags: "water bottle, stainless steel, kitchen",
	  price: "24.99",
	  previewImage: null,
	  thumbnailImage: null,
	  createdAt: "2025-05-21T13:33:00.000Z",
	  views: 600,
	  revenue: 149.94,
	},
	{
	  id: "6",
	  name: "Running Shoes",
	  category: "Footwear",
	  description: "Lightweight running shoes with excellent cushioning.",
	  tags: "shoes, running, sports",
	  price: "79.99",
	  previewImage: null,
	  thumbnailImage: null,
	  createdAt: "2025-05-21T13:33:00.000Z",
	  views: 900,
	  revenue: 479.94,
	},
	{
	  id: "7",
	  name: "Gaming Mouse",
	  category: "Electronics",
	  description: "Ergonomic gaming mouse with customizable RGB lighting.",
	  tags: "mouse, gaming, electronics",
	  price: "59.99",
	  previewImage: null,
	  thumbnailImage: null,
	  createdAt: "2025-05-21T13:33:00.000Z",
	  views: 400,
	  revenue: 239.96,
	},
	{
	  id: "8",
	  name: "Leather Wallet",
	  category: "Accessories",
	  description: "Premium leather wallet with multiple card slots.",
	  tags: "wallet, leather, accessories",
	  price: "39.99",
	  previewImage: null,
	  thumbnailImage: null,
	  createdAt: "2025-05-21T13:33:00.000Z",
	  views: 300,
	  revenue: 119.97,
	},
	{
	  id: "9",
	  name: "Yoga Mat",
	  category: "Fitness",
	  description: "Non-slip yoga mat for a comfortable workout experience.",
	  tags: "yoga, fitness, mat",
	  price: "29.99",
	  previewImage: null,
	  thumbnailImage: null,
	  createdAt: "2025-05-21T13:33:00.000Z",
	  views: 800,
	  revenue: 239.92,
	},
	{
	  id: "10",
	  name: "Bluetooth Speaker",
	  category: "Electronics",
	  description: "Portable Bluetooth speaker with excellent sound quality.",
	  tags: "speaker, bluetooth, electronics",
	  price: "89.99",
	  previewImage: null,
	  thumbnailImage: null,
	  createdAt: "2025-05-21T13:33:00.000Z",
	  views: 650,
	  revenue: 584.94,
	},
	{
	  id: "11",
	  name: "Backpack",
	  category: "Accessories",
	  description: "Spacious backpack for travel and daily use.",
	  tags: "backpack, travel, accessories",
	  price: "69.99",
	  previewImage: null,
	  thumbnailImage: null,
	  createdAt: "2025-05-21T13:33:00.000Z",
	  views: 450,
	  revenue: 314.96,
	},
	{
	  id: "12",
	  name: "Ceramic Mug Set",
	  category: "Home & Kitchen",
	  description: "Set of 4 ceramic mugs, perfect for coffee or tea.",
	  tags: "mug, ceramic, kitchen",
	  price: "34.99",
	  previewImage: null,
	  thumbnailImage: null,
	  createdAt: "2025-05-21T13:33:00.000Z",
	  views: 200,
	  revenue: 69.98,
	},
  ];
  
  // Helper function to generate a unique ID
  const generateId = () => Math.random().toString(36).substr(2, 9);
  
  export default async function handler(req, res) {
	// Enable CORS (optional, but useful for development)
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
	if (req.method === "OPTIONS") {
	  return res.status(200).end();
	}
  
	if (req.method === "GET") {
	  // Return all products
	  return res.status(200).json(products);
	}
  
	if (req.method === "POST") {
	  // Add a new product
	  const newProduct = req.body;
	  const productWithId = {
		...newProduct,
		id: generateId(),
		views: 0, // Initialize views
		revenue: 0, // Initialize revenue
	  };
	  products.push(productWithId);
	  return res.status(201).json(productWithId);
	}
  
	if (req.method === "DELETE") {
	  // Delete a product by ID
	  const { id } = req.query;
	  products = products.filter((product) => product.id !== id);
	  return res.status(200).json({ message: "Product deleted successfully" });
	}
  
	return res.status(405).json({ message: "Method not allowed" });
  }