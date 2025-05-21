import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useToast } from "@/hooks/use-toast";

const Products = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("published");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Add currentPage state
  const productsPerPage = 5; // 5 products per page

  // Fetch products from API on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://commodity-vista.vercel.app/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch products. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  // Filter products based on search and tab
  useEffect(() => {
    let filtered = products;

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by tab (simulated published/draft status)
    if (activeTab === "published") {
      filtered = filtered.filter((_, index) => index % 2 === 0);
    } else if (activeTab === "draft") {
      filtered = filtered.filter((_, index) => index % 2 === 1);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, products, activeTab]);

  // Calculate pagination data
  const totalFilteredProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalFilteredProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCheckAll = (checked) => {
    if (checked) {
      setSelectedProducts(currentProducts.map((p) => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleCheck = (id, checked) => {
    if (checked) {
      setSelectedProducts((prev) => [...prev, id]);
    } else {
      setSelectedProducts((prev) => prev.filter((productId) => productId !== id));
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      // Update local state
      setProducts((prev) => prev.filter((product) => product.id !== id));
      setFilteredProducts((prev) => prev.filter((product) => product.id !== id));
      setSelectedProducts((prev) => prev.filter((productId) => productId !== id));

      // Adjust current page if necessary
      const newTotalFilteredProducts = filteredProducts.length - 1;
      const newTotalPages = Math.ceil(newTotalFilteredProducts / productsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }

      toast({
        title: "Product Deleted",
        description: "The product has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (id) => {
    navigate(`/products/edit/${id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedProducts([]); // Clear selection when changing pages
  };

  const chartData = [
    { name: "Nov 20th", value: 400 },
    { name: "Nov 22nd", value: 300 },
    { name: "Nov 24th", value: 500 },
    { name: "Nov 26th", value: 280 },
    { name: "Nov 28th", value: 590 },
    { name: "Nov 30th", value: 390 },
    { name: "Dec 2nd", value: 490 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Product</h1>

        <Link to="/products/add">
          <Button className="bg-theme-purple hover:bg-theme-purple-dark">
            + Add New Product
          </Button>
        </Link>
      </div>

      {loading ? (
        // Modern Loader
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-theme-purple rounded-full animate-spin"></div>
        </div>
      ) : (
        // Main Content
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="relative w-full sm:w-64">
              <Input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                Filter
              </Button>
              <Button variant="outline" size="sm">
                Download
              </Button>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <Tabs defaultValue="published" onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
              </TabsList>

              <TabsContent value="published" className="space-y-4">
                <div className="w-full overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-10">
                          <Checkbox
                            checked={
                              selectedProducts.length === currentProducts.length &&
                              currentProducts.length > 0
                            }
                            onCheckedChange={handleCheckAll}
                          />
                        </TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead className="hidden md:table-cell">Views</TableHead>
                        <TableHead className="hidden md:table-cell">Pricing</TableHead>
                        <TableHead className="hidden md:table-cell">Revenue</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedProducts.includes(product.id)}
                              onCheckedChange={(checked) =>
                                handleCheck(product.id, checked === true)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 bg-gray-100 rounded-md overflow-hidden">
                                <img
                                  src={product.thumbnailImage || "/placeholder.svg"}
                                  alt={product.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="font-medium">{product.name}</div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {product.views.toLocaleString()}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            ${parseFloat(product.price).toFixed(2)}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            ${product.revenue.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEdit(product.id)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-500 hover:text-red-600"
                              onClick={() => handleDelete(product.id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="draft">
                <div className="w-full overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-10">
                          <Checkbox
                            checked={
                              selectedProducts.length === currentProducts.length &&
                              currentProducts.length > 0
                            }
                            onCheckedChange={handleCheckAll}
                          />
                        </TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead className="hidden md:table-cell">Views</TableHead>
                        <TableHead className="hidden md:table-cell">Pricing</TableHead>
                        <TableHead className="hidden md:table-cell">Revenue</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedProducts.includes(product.id)}
                              onCheckedChange={(checked) =>
                                handleCheck(product.id, checked === true)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 bg-gray-100 rounded-md overflow-hidden">
                                <img
                                  src={product.thumbnailImage || "/placeholder.svg"}
                                  alt={product.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="font-medium">{product.name}</div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {product.views.toLocaleString()}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            ${parseFloat(product.price).toFixed(2)}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            ${product.revenue.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEdit(product.id)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-500 hover:text-red-600"
                              onClick={() => handleDelete(product.id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>

                <div className="flex items-center space-x-2">
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-8 border-t pt-4">
            <div>
              <p className="text-sm text-gray-500">
                Showing {currentProducts.length} of {totalFilteredProducts} products
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <p className="font-medium">Total Views</p>
              <div className="text-xl font-bold">+112,893</div>
            </div>
          </div>

          <div className="mt-4 h-36">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorView" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis hide={true} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#f59e0b"
                  fillOpacity={1}
                  fill="url(#colorView)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;