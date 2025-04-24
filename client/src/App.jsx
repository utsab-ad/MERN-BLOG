import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import {
  RouteAbout,
  RouteAddCategory,
  RouteBlog,
  RouteBlogAdd,
  RouteBlogByCategory,
  RouteBlogDetails,
  RouteBlogEdit,
  RouteCategoryDetails,
  RouteCommentDetails,
  RouteEditCategory,
  RouteIndex,
  RouteProfile,
  RouteSearch,
  RouteSignIn,
  RouteSignUp,
  RouteUser,
} from "./helpers/RouteName";
import Index from "./Pages/Index";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import AddCategory from "./Pages/Category/AddCategory";
import EditCategory from "./Pages/Category/EditCategory";
import CategoryDetails from "./Pages/Category/CategoryDetails";
import AddBlog from "./Pages/Blog/AddBlog";
import BlogDetails from "./Pages/Blog/BlogDetails";
import EditBlog from "./Pages/Blog/EditBlog";
import SingleBlogDetails from "./Pages/SingleBlogDetails";
import About from "./Pages/About";
import BlogByCategory from "./Pages/Blog/BlogByCategory";
import SearchResults from "./Pages/SearchResults";
import Comments from "./Pages/Comments";
import User from "./Pages/Users";
import AuthRouteProtection from "./components/AuthRouteProtection";
import OnlyAdminAllowed from "./components/OnlyAdminAllowed";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />
          

          <Route path={RouteAbout} element={<About />} />

          {/* blog category  */}
          <Route path={RouteBlogDetails()} element={<SingleBlogDetails />} />
          <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />
          <Route path={RouteSearch()} element={<SearchResults />} />

          <Route element={<AuthRouteProtection />}>
            <Route path={RouteBlogAdd} element={<AddBlog />} />
            <Route path={RouteBlog} element={<BlogDetails />} />
            <Route path={RouteBlogEdit()} element={<EditBlog />} />
            <Route path={RouteCommentDetails} element={<Comments />} />
            <Route path={RouteProfile} element= {<Profile/>} />
          </Route>

          <Route element={<OnlyAdminAllowed />}>
            <Route path={RouteAddCategory} element={<AddCategory />} />
            <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
            <Route path={RouteEditCategory()} element={<EditCategory />} />
            <Route path={RouteUser} element={<User />} />
          </Route>
        </Route>
        <Route path={RouteSignIn} element={<SignIn />} />
        <Route path={RouteSignUp} element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
