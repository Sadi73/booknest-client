'use client'

import Banner from "@/components/Banner";
import BookContainer from "@/components/BookContainer";
import { socketContext } from "@/Providers/SocketProvider";
import { useContext, useEffect, useRef } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function Home() {
  const { newNotification } = useContext(socketContext);
  const previousBookId = useRef(null);

  useEffect(() => {
    const currentBookId = newNotification?.book?._id;
    if (previousBookId.current !== currentBookId && currentBookId) {
      toast.success('New book added', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      previousBookId.current = currentBookId;
    }
  }, [newNotification?.book?._id]);

  return (
    <div className="">
      <ToastContainer />
      <Banner />
      <BookContainer />
    </div>
  );
}
