import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import Header from "../components/Header.tsx";

interface Stat {
  typeName: string;
  count: number;
}

interface Recipe {
  id: number;
  title: string;
  cooking_time: number;
  type_name: string;
}

const StatsPage: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [fastestRecipes, setFastestRecipes] = useState<Recipe[]>([]);
  const [slowestRecipes, setSlowestRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/recipes");
        const recipes: Recipe[] = response.data;

        const typeCounts: { [key: string]: number } = {};
        recipes.forEach((recipe) => {
          typeCounts[recipe.type_name] =
              (typeCounts[recipe.type_name] || 0) + 1;
        });

        const formattedStats = Object.keys(typeCounts).map((typeName) => ({
          typeName,
          count: typeCounts[typeName],
        }));

        setStats(formattedStats);

        if (recipes.length > 0) {
          const minTime = Math.min(
              ...recipes.map((recipe) => recipe.cooking_time)
          );
          const maxTime = Math.max(
              ...recipes.map((recipe) => recipe.cooking_time)
          );

          const fastest = recipes.filter(
              (recipe) => recipe.cooking_time === minTime
          );
          const slowest = recipes.filter(
              (recipe) => recipe.cooking_time === maxTime
          );

          setFastestRecipes(fastest);
          setSlowestRecipes(slowest);
        }
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStats();
  }, []);

  const chartOptions = {
    chart: {
      type: "pie" as const,
    },
    labels: stats.map((stat) => stat.typeName),
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const chartSeries = stats.map((stat) => stat.count);

  return (
      <div>
        <Header />
        <div className="mx-[15vw] my-8">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-relative-h3 font-bold text-center bg-gradient-to-r from-dark-purple to-perfect-purple text-white p-4 rounded-md">
              Recipe Statistics
            </h1>
          </div>

          <div className="flex justify-between">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <Chart
                  options={chartOptions}
                  series={chartSeries}
                  type="pie"
                  width="500"
              />
            </div>

            <div className="ml-6 flex flex-col">
              <h2 className="text-h3 font-semibold mb-4">Recipe Type Descriptions</h2>
              <ul className="space-y-2">
                {stats.map((stat) => (
                    <li
                        key={stat.typeName}
                        className="flex justify-between bg-gray-100 p-2 rounded-md"
                    >
                      <span className="font-medium">{stat.typeName}</span>
                      <span className="text-gray-600">{stat.count}</span>
                    </li>
                ))}
              </ul>

              <div className="mt-4">
                <h2 className="text-h3 font-semibold mb-2">
                  Fastest and Longest Recipes
                </h2>
                <div>
                  <strong>Fastest Recipes:</strong>
                  <ul>
                    {fastestRecipes.map((recipe) => (
                        <li key={recipe.id}>
                          {recipe.title} ({Math.floor(recipe.cooking_time / 60)} hr {recipe.cooking_time % 60} min)
                        </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong>Longest Recipes:</strong>
                  <ul>
                    {slowestRecipes.map((recipe) => (
                        <li key={recipe.id}>
                          {recipe.title} ({Math.floor(recipe.cooking_time / 60)} hr {recipe.cooking_time % 60} min)
                        </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default StatsPage;
