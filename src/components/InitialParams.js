import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function (setLimit, setPage, setSearch, setSort) {
  const [searchParams] = useSearchParams();

  let searchKey = JSON.parse(searchParams?.get("search"));
  Object.keys(searchKey || {}).forEach((key) => {
    searchKey[key] = [searchKey[key]];
  });

  let limit = searchParams.get("limit");
  let page = searchParams.get("page");
  useEffect(() => {
    if (limit) {
      setLimit(limit);
    }

    if (page) {
      setPage(page);
    }

    if (searchKey) {
      setSearch(searchKey);
    }

    if (searchParams?.get("sort")) {
      setSort(JSON.parse("[" + searchParams?.get("sort")?.slice(1, -1) + "]"));
    }
  }, []);
}
