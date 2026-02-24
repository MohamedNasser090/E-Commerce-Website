import React, { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaSignInAlt } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

const NavLinkes = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Accessories", link: "/accessories" },
  { title: "Blog", link: "/blog" },
  { title: "Contact", link: "/contact" },
];

function BtmHeader() {
  const [categories, setCategories] = useState([]);

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  // console.log(isCategoryOpen);

  const location = useLocation();

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div className="btm_header">
      <div className="container">
        <div className="nav">
          <div className="category_nav">
            <div
              className="category-btn"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              <IoMdMenu />
              <p>Browse Category</p>
              <IoMdArrowDropdown />
            </div>
            <div
              className={`category_nav_list ${isCategoryOpen ? "active" : ""}`}
            >
              {categories.map((category) => (
                <Link key={category.slug} to={`category/${category.slug}`} onClick={() => setIsCategoryOpen(false)}>
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="nav_links">
            {NavLinkes.map((item) => (
              <li
                key={item.link}
                className={location.pathname === item.link ? "active" : ""}
              >
                <Link key={item.link} to={item.link}>
                  {item.title}
                </Link>
              </li>
            ))}
          </div>
        </div>
        <div className="header_register_icon">
          <Link to="/">
            <FaSignInAlt />
          </Link>
          <Link to="/">
            <FaUserPlus />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BtmHeader;
