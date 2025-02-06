"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Category {
  id: number;
  name: string;
  icon: string;
  children?: Category[];
}

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://ashyo.store/api/category", {
          params: { page: 1, limit: 100 },
        });
        setCategories(res.data.categories);
      } catch (err) {
        setError("Kategoriya ma'lumotlarini olishda xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Yuklanmoqda...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      {categories.map((category) => (
        <div key={category.id} className="flex items-center space-x-3 mb-2">
          <img src={`https://ashyo.store/${category.icon}`} alt={category.name} className="w-6 h-6" />
          <span className="text-lg font-medium">{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
