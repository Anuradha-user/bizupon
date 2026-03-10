import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductFilters from "../../web-components/ProductFilters";
import ProductListCard from "../../web-components/ProductListCard";
import { IconChevronRight, IconLayoutGrid, IconList, IconChevronLeft} from "@tabler/icons-react";

function ProductListPage() {

  const [searchParams] = useSearchParams();

  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [view, setView] = useState("grid-view");
  const [sortType, setSortType] = useState("");

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 30;

  // 🔥 FETCH PRODUCTS
  useEffect(() => {

    fetch("https://jaishriganesha.com/BizuponInterview/api/Home/GetProductData")
      .then(res => res.json())
      .then(data => {
        setAllProducts(data);
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load cars");
        setLoading(false);
      });

  }, []);

  // 🔎 FILTER LOGIC
  useEffect(() => {

    const maker = searchParams.getAll("makers");
    const models = searchParams.getAll("model");
    const fuels = searchParams.getAll("fuel");
    const bodies = searchParams.getAll("body");
    const kms = Number(searchParams.get("kms")) || Infinity;

    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || Infinity;

    const filtered = allProducts.filter(car => {

      return (
        (maker.length === 0 || maker.includes(car.makers)) &&
        (models.length === 0 || models.includes(car.productName)) &&
        (fuels.length === 0 || fuels.includes(car.fuel)) &&
        (bodies.length === 0 || bodies.includes(car.bodyType)) &&
        car.price >= minPrice &&
        car.price <= maxPrice &&
        Number(car.mileage) <= kms
      );

    });

    setProducts(filtered);
    setCurrentPage(1); // reset page after filter

  }, [searchParams, allProducts]);

  // 🔃 SORTING
  const sortedProducts = [...products].sort((a, b) => {
    if (sortType === "low") return a.price - b.price;
    if (sortType === "high") return b.price - a.price;
    return 0;
  });

  // PAGINATION LOGIC
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;

  const currentProducts = sortedProducts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  return (

    <div className="product-list">
      <div className="container">
        <div className="row">

          {/* FILTER */}
          <div className="col-lg-3 col-md-4">
            <ProductFilters />
          </div>

          {/* LIST */}
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
                    <div>Search Result <strong>({sortedProducts.length})</strong></div>

                    <div className="d-flex gap-2">
                      <button className={`viewIcon ${view === "list-view" ? "active" : ""}`}
                        onClick={() => setView("list-view")} >
                        <IconList size={22} />
                      </button>

                      <button className={`viewIcon ${view === "grid-view" ? "active" : ""}`}
                        onClick={() => setView("grid-view")} >
                        <IconLayoutGrid size={22} />
                      </button>

                      <select className="form-select form-select-sm"
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)} >

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
                        <ProductListCard products={currentProducts} />
                      </div>

                      {/* PAGINATION */}
                      <div className="pagination">
                        <button disabled={currentPage === 1}
                          onClick={() => setCurrentPage(currentPage - 1)}
                          className="btn btn-sm btn-dark me-3"
                        ><IconChevronLeft/>
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage(currentPage + 1)}
                          className="btn btn-sm btn-dark ms-3"><IconChevronRight/>
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