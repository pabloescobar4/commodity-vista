import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { productCategories } from "@/lib/sample-data";

const AddProduct = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    description: "",
    tags: "",
    price: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [thumbnailImage, setThumbnailImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e, setImage) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!productData.name || !productData.category || !productData.price) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const newProduct = {
        ...productData,
        previewImage,
        thumbnailImage,
        createdAt: new Date().toISOString(),
      };

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      toast({
        title: "Product Added",
        description: "New product has been created successfully",
      });

      navigate("/products");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDiscard = () => {
    navigate("/products");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Add Product</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Add New Product</CardTitle>
            <div className="space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleDiscard}
                disabled={isSubmitting}
              >
                Discard Change
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">General Information</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Product Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Product Name"
                      value={productData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-1">
                      Product Category
                    </label>
                    <Select
                      value={productData.category}
                      onValueChange={(value) => handleSelectChange("category", value)}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {productCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">
                      Descriptions
                    </label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Product description"
                      value={productData.description}
                      onChange={handleChange}
                      rows={5}
                    />
                  </div>

                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium mb-1">
                      Tag Keywords
                    </label>
                    <Textarea
                      id="tags"
                      name="tags"
                      placeholder="Separate tags with commas"
                      value={productData.tags}
                      onChange={handleChange}
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Pricing</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium mb-1">
                      Price
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        $
                      </span>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        className="pl-8"
                        value={productData.price}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Preview Product</h3>
                <p className="text-sm text-gray-500 mb-4">Drag And Your Image Here</p>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center h-52 bg-gray-50 cursor-pointer relative"
                  onClick={() => document.getElementById("previewImage")?.click()}
                >
                  <input
                    id="previewImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageChange(e, setPreviewImage)}
                  />

                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-12 h-12 text-gray-300 mx-auto"
                      >
                        <path
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 8a2 2 0 11-4 0 2 2 0 014 0z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="text-sm text-gray-500 mt-2">Drag and drop here</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Thumbnail Product</h3>
                <p className="text-sm text-gray-500 mb-4">Drag And Your Image Here</p>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center h-52 bg-gray-50 cursor-pointer relative"
                  onClick={() => document.getElementById("thumbnailImage")?.click()}
                >
                  <input
                    id="thumbnailImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageChange(e, setThumbnailImage)}
                  />

                  {thumbnailImage ? (
                    <img
                      src={thumbnailImage}
                      alt="Thumbnail"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-12 h-12 text-gray-300 mx-auto"
                      >
                        <path
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 8a2 2 0 11-4 0 2 2 0 014 0z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="text-sm text-gray-500 mt-2">Drag and drop here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default AddProduct;