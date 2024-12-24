"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function SearchSection() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("desc");

  const FetchPosts = async () => {
    try {
      const query = new URLSearchParams({ category, search, sort });
      const res = await axios.get(`/api/posts?${query}`);
      setProducts(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleChange = () => {
    FetchPosts();
  };
  useEffect(() => {
    FetchPosts();
  }, []);
  return (
    <div className="pt-12">
      <div className="flex justify-between items-center ">

      <div >
        <input
        
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="Wedge">Wedge</option>
        <option value="Putter">Putter</option>
        <option value="Iron">Iron</option>
        <option value="Fairway">Fariway</option>
        <option value="Driver">Driver</option>
      </select>
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="desc">Latest</option>
        <option value="asc">Oldest</option>
      </select>
      <button onClick={handleChange}>Search</button>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">
   
      <h1 className="text-2xl font-semibold mb-6">Lists</h1>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product: any) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {product.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                    href={`/edit/${product.id}`}
                  >
                   +
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        href="/"
      >
        purchase
      </Link>
    </div>
    </div>
  );
}
