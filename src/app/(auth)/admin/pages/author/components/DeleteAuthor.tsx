import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { IDialogAuthor } from "../types/common";
import axios from "axios";
import { API_URL } from "@/types/common";
import { toast } from "react-toastify";
import { AuthorContext } from "@/context/authorContext";

const DeleteAuthor: React.FC<IDialogAuthor> = ({ idAuthor }) => {
  const context = React.useContext(AuthorContext);
  const fetchAuthor = context?.fetchAuthor;
  
  const handleDeleteAuthor = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("access_token")!);
      const response = await axios.delete(
        `${API_URL}/api/v1/authors/${idAuthor}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (response) {
        toast.success("Deleted author successfully");
        fetchAuthor();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="link"
          className="font-sans text-sm capitalize text-red-600"
        >
          delete author
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure delete this author?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 text-white font-sans"
            onClick={handleDeleteAuthor}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAuthor;
