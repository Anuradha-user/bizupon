import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductFilters from "../../web-components/ProductFilters";
import ProductListCard from "../../web-components/ProductListCard";
import { IconChevronRight, IconLayoutGrid, IconList, IconChevronLeft } from "@tabler/icons-react";

function ProductListPage() {

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [view, setView] = useState("grid-view");
  const [sortType, setSortType] = useState("");
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 30;

  // 🔥 FETCH PRODUCTS
  useEffect(() => {

    fetch("https://jaishriganesha.com/BizuponInterview/api/Home/GetProductData")
      .then(res => res.json())
      .then(data => {
        setAllProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load cars");
        setLoading(false);
      });

  }, []);

  // 🔎 FILTER + SEARCH
  const filteredProducts = useMemo(() => {

  const maker = searchParams.getAll("makers");
  const models = searchParams.getAll("model");
  const fuels = searchParams.getAll("fuel");
  const transmissions = searchParams.getAll("transmission");

  const kms = Number(searchParams.get("kms")) || Infinity;
  const cc = Number(searchParams.get("cc")) || Infinity;

  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || Infinity;

  return allProducts.filter(car => {

  const engine = Number(car.cc) || 0;
  const mileage = Number(car.mileage) || 0;

  return (
      (maker.length === 0 || maker.includes(car.makers)) &&
      (models.length === 0 || models.includes(car.productName)) &&
      (fuels.length === 0 || fuels.includes(car.fuel)) &&
      (transmissions.length === 0 || transmissions.includes(car.transmission)) &&
      engine <= cc &&
      Number(car.price) >= minPrice &&
      Number(car.price) <= maxPrice &&
      mileage <= kms &&
      (search === "" || car.productId.toString().includes(search))
    );
  });

  }, [allProducts, searchParams, search]);

  // 🔃 SORTING
  const sortedProducts = useMemo(() => {

    const sorted = [...filteredProducts];

    if (sortType === "low") return sorted.sort((a, b) => a.price - b.price);
    if (sortType === "high") return sorted.sort((a, b) => b.price - a.price);

    return sorted;

  }, [filteredProducts, sortType]);

  // 📄 PAGINATION
  const currentProducts = useMemo(() => {

    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;

    return sortedProducts.slice(indexOfFirst, indexOfLast);

  }, [sortedProducts, currentPage]);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // reset page when filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams, search]);

  return (

    <div className="product-list">
      <div className="container">
        <div className="row">

          {/* FILTER */}
          <div className="col-lg-3 col-md-4">
            <ProductFilters />
          </div>

          {/* PRODUCT LIST */}
          <div className="col-lg-9 col-md-8">
            <div className="car-listing-block">

              {error && <div className="alert alert-danger">{error}</div>}

              {loading && (
                <div className="text-center py-5">
                  <div className="spinner-border text-success"></div>
                  <p className="mt-2">Loading cars...</p>
                </div>
              )}

              {!loading && (
                <>
                  <div className="carListingTopBar">

                    <div>
                      Search Result <strong>({sortedProducts.length})</strong>
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        className={`viewIcon ${view === "list-view" ? "active" : ""}`}
                        onClick={() => setView("list-view")}
                      >
                        <IconList size={22} />
                      </button>

                      <button
                        className={`viewIcon ${view === "grid-view" ? "active" : ""}`}
                        onClick={() => setView("grid-view")}
                      >
                        <IconLayoutGrid size={22} />
                      </button>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Stock ID"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />

                      <select
                        className="form-select form-select-sm"
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                      >

                        <option value="">Sort by</option>
                        <option value="low">Price Low → High</option>
                        <option value="high">Price High → Low</option>

                      </select>
                    </div>
                  </div>

                  {sortedProducts.length === 0 ? (

                    <div className="text-center py-5">
                      <h4>No Cars Found</h4>
                      <p>Try changing filters</p>
                    </div>

                  ) : (

                    <>
                      <div className={`carlisting-contentArea ${view}`}>
                        <ProductListCard products={currentProducts} view={view} />
                      </div>

                      {/* PAGINATION */}
                      <div className="pagination">

                        <button
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage(currentPage - 1)}
                          className="btn btn-sm btn-dark me-3"
                        >
                          <IconChevronLeft />
                        </button>

                        <span>Page {currentPage} of {totalPages}</span>

                        <button
                          disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage(currentPage + 1)}
                          className="btn btn-sm btn-dark ms-3"
                        >
                          <IconChevronRight />
                        </button>

                      </div>

                    </>
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