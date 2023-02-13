import React from 'react';
import {
  HiOutlineHome,
  HiHome,
  HiHeart,
  HiOutlineHeart,
  HiClipboardList,
  HiOutlineClipboardList,
} from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';

function CategoryBar() {
  const location = useLocation();
  console.log(location)
  return (
    <ul>
      <li>
        <Link to="/">
          { location.pathname === "/" ? <HiHome /> : <HiOutlineHome />}
        </Link>
      </li>
      <li>
        <Link to="/recommend">
        { location.pathname === "/recommend" ? <HiHeart /> : <HiOutlineHeart />}
        </Link>
      </li>
      <li>
        <Link to="/allproducts">
        { location.pathname === "/allproducts" ? <HiClipboardList /> : <HiOutlineClipboardList />}
        </Link>
      </li>
    </ul>
  );
}

export default CategoryBar;
