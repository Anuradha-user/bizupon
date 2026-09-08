import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFilterData } from "../api/authApi";
import {
  setFilterData,
  setFilterError,
  setFilterLoading,
} from "../redux/filterSlice";

function AppInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFilters = async () => {
      dispatch(setFilterLoading(true));

      try {
        const response = await getFilterData();
        dispatch(setFilterData(response.data.data));
      } catch (err) {
        const error =
          err.response?.data?.message ||
          err.message ||
          "Something went wrong";
        dispatch(setFilterError(error));
      }
    };

    fetchFilters();
  }, [dispatch]);

  return null;
}

export default AppInitializer;
