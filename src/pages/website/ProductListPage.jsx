import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductListCard from "../../web-components/ProductListCard";
import { IconLayoutGrid, IconList } from "@tabler/icons-react";
import productsData from "../../data/carDatabase.json";

function ProductListPage() {
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [sortType, setSortType] = useState("");
  const [view, setView] = useState("grid-view");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const maker = searchParams.get("maker");
    const brandParam = searchParams.get("brand"); // 👈 add this
    const model = searchParams.get("model");
    const fuel = searchParams.get("fuel");
    const body = searchParams.get("body");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    // final maker value (brand OR maker)
    const finalMaker = maker || brandParam;

    // ❌ no filters → error show
    if (!finalMaker && !model && !fuel && !body && !minPrice && !maxPrice) {
      setError("Please apply at least one filter");
      setLoading(false);
      return;
    }

    // ⏳ loader simulate (API future ready)
    setTimeout(() => {
      const filtered = productsData.filter(car => {
        return (
          (!finalMaker || car.brand === finalMaker) &&
          (!model || car.title === model) &&
          (!fuel || car.fuel === fuel) &&
          (!body || car.type === body) &&
          (!minPrice || car.price >= Number(minPrice)) &&
          (!maxPrice || car.price <= Number(maxPrice))
        );
      });

      setProducts(filtered);
      setLoading(false);
    }, 600);

  }, [searchParams]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortType === "low") return a.price - b.price;
    if (sortType === "high") return b.price - a.price;
    if (sortType === "new") return b.year - a.year;
    return 0;
  });

  return (
    <div className="product-list">
      <div className="container">
        <div className="row">

          <div className="col-lg-3 col-md-5 col-12">
            {/* sidebar later */}
          </div>

          <div className="col-lg-9 col-md-7 col-12">
            <div className="car-listing-block">

              {/* ❌ ERROR UI */}
              {error && (
                <div className="alert alert-danger mt-4">
                  {error}
                </div>
              )}

              {/* ⏳ LOADER */}
              {loading && !error && (
                <div className="text-center py-5">
                  <div className="spinner-border text-success" role="status"></div>
                  <p className="mt-2">Loading cars...</p>
                </div>
              )}

              {/* ✅ RESULT UI */}
              {!loading && !error && (
                <>
                  <div className="carListingTopBar">
                    <div className="searchResult">
                      Search Result <span>({sortedProducts.length})</span>
                    </div>

                    <div className="carListing-rightBar">
                      <div className="viewBtn">
                        <button
                          className={`viewIcon ${view === "list-view" ? "active" : ""}`}
                          onClick={() => setView("list-view")}
                        >
                          <IconList size={24} />
                        </button>

                        <button
                          className={`viewIcon ${view === "grid-view" ? "active" : ""}`}
                          onClick={() => setView("grid-view")}
                        >
                          <IconLayoutGrid size={24} />
                        </button>
                      </div>

                      <select
                        className="form-select form-select-sm"
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                      >
                        <option value="">Sort by</option>
                        <option value="low">Price-Low to High</option>
                        <option value="high">Price-High to Low</option>
                        <option value="new">Newest First</option>
                      </select>
                    </div>
                  </div>

                  {/* ❌ NO RESULT */}
                  {sortedProducts.length === 0 ? (
                    <div className="text-center py-5">
                      <h4>No cars found</h4>
                      <p>Try changing your filters</p>
                    </div>
                  ) : (
                    <div className={`carlisting-contentArea ${view}`}>
                      <ProductListCard products={sortedProducts} />
                    </div>
                  )}
                </>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductListPage;