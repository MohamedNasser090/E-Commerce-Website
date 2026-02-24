import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");

  const [suggetion, setSuggetion] = useState([]);
  console.log("suggetion:", suggetion);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const location =useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
    setSuggetion([]);
  };

  useEffect(() => {
    const fetchSuggetion = async () => {
      if (!searchTerm.trim()) {
        setSuggetion([]);
        return;
      }
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${searchTerm}`,
        );
        const data = await res.json();
        setSuggetion(data.products.slice(0, 5) || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    const debonuce = setTimeout(() => {
      fetchSuggetion();
    }, 300);
    return () => clearTimeout(debonuce);
  }, [searchTerm]);


  useEffect(()=>{
    setSuggetion("")
  }, [location])


  return (
    <div className="serchBox-container">
      <form action="" className="search-box" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search For Products"
          onChange={(e) => setSearchTerm(e.target.value)}
          autoComplete="off"
        />
        <button type="submit">
          <IoSearch />
        </button>
      </form>
      {suggetion.length > 0 && (
        <ul className="suggetions">
          {suggetion.map((item) => (
            <Link to={`/products/${item.id}`} key={item.id}>
              <li key={item.id}>
                <img src={item.images[0]} alt="" />
                <span>{item.title}</span>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;
