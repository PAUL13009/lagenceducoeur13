"use client";

import { useState } from "react";

export default function SearchBar() {
  const [searchType, setSearchType] = useState<"acheter" | "louer">("acheter");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("tous");

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setSearchType("acheter")}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            searchType === "acheter"
              ? "bg-primary-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Acheter
        </button>
        <button
          onClick={() => setSearchType("louer")}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            searchType === "louer"
              ? "bg-primary-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Louer
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Localisation
          </label>
          <input
            type="text"
            placeholder="Où recherchez-vous ?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type de bien
          </label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
          >
            <option value="tous">Tous les biens</option>
            <option value="appartement">Appartement</option>
            <option value="maison">Maison</option>
            <option value="villa">Villa</option>
            <option value="terrain">Terrain</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget max
          </label>
          <input
            type="number"
            placeholder="Budget maximum"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
          />
        </div>
        <div className="flex items-end">
          <button className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition">
            Rechercher
          </button>
        </div>
      </div>
    </div>
  );
}