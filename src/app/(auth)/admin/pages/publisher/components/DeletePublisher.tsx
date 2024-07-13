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
import { IDelete } from "../types/common";
import { PublisherContext } from "@/context/publisherContext";
import axios from "axios";
import { API_URL } from "@/types/common";
import { toast } from "react-toastify";

const DeletePublisher: React.FC<IDelete> = ({ idPublisher }) => {
  const context = React.useContext(PublisherContext);
  const fetchPublisher = context?.fetchPublisherPage;
  const handleDeltePublisher = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const response = await axios.delete(
        `${API_URL}/api/v1/publisher/${idPublisher}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (response) {
        toast.success(`delete publisher successfully`);
        fetchPublisher();
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
          className="font-sans text-sm  text-red-600 capitalize"
        >
          delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure delelte this publisher ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 text-white font-sans"
            onClick={handleDeltePublisher}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePublisher;
