import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RouteAddCategory, RouteEditCategory } from "@/helpers/RouteName";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Link } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/Loading";
import { FiEdit } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";

const CategoryDetails = () => {

  const [refreshData, setRefreshData] = useState(false)


  const {
    data: categoryData,
    loading,
    error,
  } = useFetch(`${import.meta.env.VITE_API_BASE_URL}/category/all-category`, {
    method: "get",
    credentials: "include",
  }, [refreshData]);

  const handleDelete = (id) => {
      const response = deleteData(`${import.meta.env.VITE_API_BASE_URL}/category/delete/${id}`)
      if(response) {
        setRefreshData(!refreshData)
        showToast('success', 'Data Deleted')
      } else {
        showToast('error', 'Data Not Deleted')
      }
  }

  if (loading) return <Loading />;

  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <Button asChild>
              <Link to={RouteAddCategory}>Add Category</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryData && categoryData.category.length > 0 ? (
                categoryData.category.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell> {category.name}</TableCell>
                    <TableCell> {category.slug}</TableCell>
                    <TableCell className="flex gap-3">
                      <Button variant="outline" className="hover:bg-violet-500 hover:text-white" asChild>
                        <Link to={RouteEditCategory(category._id)}>
                          <FiEdit />
                        </Link>
                      </Button>
                      <Button onClick={() => handleDelete(category._id)} variant="outline" className="hover:bg-violet-500 hover:text-white">
                          <FaTrashAlt/>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="3">Data not Found !</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryDetails;
