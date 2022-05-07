import { useEffect, useState } from "react";
import Card from "./Card";

const Maintain = (props: { resources: any[] }) => {
  const [results, setResults] = useState(props.resources);
  const [searchInput, handleSearchInput] = useState("");

  const handleSearch = (e: any) => {
    handleSearchInput((e.target as HTMLInputElement).value);
  };

  useEffect(() => {
    if (searchInput.length > 1) {
      const arr = props.resources.filter((r) => {
        if (r.org.toLowerCase().includes(searchInput.toLowerCase())) {
          return r;
        }
      });
      setResults(arr);
    } else if (searchInput.length < 2) {
      setResults(props.resources);
    }
  }, [searchInput]);

  return (
    <div className="px-5 text-center justify-start min-h-screen">
      <p className="block text-black text-3xl font-bold mb-10 mt-10 px-8">
        Update Resources - My Ecomap
      </p>
      <div className="block text-black text-3xl font-bold mb-10 mt-10">
        <input
          type="text"
          name="searchInput"
          className="h-10 w-80"
          placeholder="Start searching..."
          onChange={handleSearch}
          value={searchInput}
        />
        <p className="text-sm mt-4 mb-0">Showing {results.length} results</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-0">
        {results.map((r: any, index: number) => (
          <Card
            key={index}
            id={r._id}
            org={r.org}
            category={r.category}
            address={r.address}
          />
        ))}
      </div>
    </div>
  );
};

export default Maintain;
