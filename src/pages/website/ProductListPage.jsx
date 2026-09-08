import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductFilters from "../../web-components/ProductFilters";
import ProductListCard from "../../web-components/ProductListCard";
import { IconChevronRight, IconLayoutGrid, IconList, IconChevronLeft } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { getProductList } from "../../api/productApi,js";
import { appendProducts, resetProducts, setError, setHasMore, setLoading, setNextPageLoading, setPage, setTotalProducts } from "../../redux/productSlice";


const ProductListPage = () => {
  const filterLoading = useSelector((state) => state?.filters?.loading);

  const [view, setView] = useState("grid-view");
  const [sortType, setSortType] = useState("");
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");


  /********************************* */
  const { ref, inView } = useInView({
    // threshold: 0,
    rootMargin: "200px 0px",
    //   triggerOnce: false,
  });
  const dispatch = useDispatch();

  const {
    products,
    page,
    limit,
    loading,
    nextPageLoading,
    hasMore,
    error,
    totalProducts,
  } = useSelector(state => state.products);
  //  FETCH PRODUCT list

  const fetchProducts = async (pageNo, reset = false) => {
    console.log("fetch Api called");
    if (!reset && (loading || nextPageLoading)) return;
    if (pageNo === 1) {
      dispatch(setLoading(true));
    } else {
      dispatch(setNextPageLoading(true));
    }
    dispatch(setError(null));
    try {
      const params = {
        PageIndex: pageNo,
        PageSize: limit,
        CurrencyCode: "YEN",
        CurrencyValue: "1",
        MakerId: searchParams.getAll("makers").join(","),
        ModelId: searchParams.getAll("model").join(","),

        FuelType: searchParams.getAll("fuel").join(",") || "",

        CC: searchParams.get("cc") || "",

        MileageFrom: searchParams.get("minKms") || "",

        MileageTo: searchParams.get("maxKms") || "",

        MinPrice: searchParams.get("minPrice") || "",

        MaxPrice: searchParams.get("maxPrice") || "",
        PriceSortBy: sortType || "",

      };
      const response = await getProductList(params);
      console.log("Product List Response:", response.data);
      const productList = response.data.data.lstProduct || [];
      dispatch(setTotalProducts(response.data.data.totalRecords || 0));
      if (reset) {
        dispatch(resetProducts());
        dispatch(appendProducts(productList));
      }
      else {
        dispatch(appendProducts(productList));
      }
      dispatch(setPage(pageNo));
      dispatch(setHasMore(
        productList.length === limit
      )
      );

    }

    catch (err) {
      if (err.response?.status === 404) {
        dispatch(resetProducts());

      }
      else {
        dispatch(
          setError(
            err.response?.data?.message ||
            err.message
          )
        );
      }
    }
    finally {
      dispatch(setLoading(false));
      dispatch(setNextPageLoading(false));
    }
  };

  useEffect(() => {


    fetchProducts(1, true);


  }, [searchParams, sortType]);
  useEffect(() => {
    if (!inView) {
      return;
    }
    if (!hasMore) {
      return;
    }
    if (loading || nextPageLoading) {
      return;
    }
    fetchProducts(page + 1);

  }, [
    inView,
    hasMore,
    loading,
    nextPageLoading,
    page
  ])



  return (

    <div className="product-list">
      <div className="container">
        <div className="row">

          {/* FILTER */}
          <div className="col-lg-3 col-md-4">
            {filterLoading ? (
              <div className="filters d-flex align-items-center justify-content-center">
                <div className="spinner-border text-success"></div>
              </div>
            ) : (
              <ProductFilters />
            )}

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
                      Search Result <strong> ({products.length}/{totalProducts})</strong>
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
                        <option value="asc">Price Low → High</option>
                        <option value="desc">Price High → Low</option>

                      </select>
                    </div>
                  </div>

                  {products.length === 0 && !loading ? (

                    <div className="text-center py-5">
                      <h4>No Cars Found</h4>
                      <p>Try changing filters</p>
                    </div>

                  ) : (

                    <>
                      <div className={`carlisting-contentArea ${view}`}>
                        <ProductListCard products={products} view={view} />
                      </div>
                      {/**observer */}
                      <div ref={ref} />
 {nextPageLoading && (
                <div className="text-center py-5">
                  <div className="spinner-border text-success"></div>
                  <p className="mt-2">Loading cars...</p>
                </div>
              )}
                      
                      {/* PAGINATION */}
                      {/* <div className="pagination">

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

                        </div> */}

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