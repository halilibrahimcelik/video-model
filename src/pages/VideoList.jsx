import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Container from "../components/UI/Container";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase.config";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import "react-modal-video/scss/modal-video.scss"; // Import the default CSS
import ModalVideo from "react-modal-video";

import ListForm from "../components/listForm/ListForm";
import { motion } from "framer-motion";
import { InfinitySpin } from "react-loader-spinner";
import { MdFolderDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectListings } from "../app/listing/listingSlice";

const VideoList = () => {
  const [listing, setListing] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(true);
  const defaultList = useSelector(selectListings);
  useEffect(() => {
    const videoList = [];
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log(currentUser);
        const fetchUserList = async () => {
          try {
            const listingRef = collection(db, "videoList");
            const queryRef = query(
              listingRef,
              where("userId", "==", auth.currentUser.uid)
            );
            const querySnapshot = await getDocs(queryRef);
            querySnapshot.forEach((doc) => {
              if (doc.exists()) {
                return videoList.push(doc.data());
              }
            });
            setListing(videoList);
          } catch (error) {
            console.log(error);
            setLoading(true);
          }
        };
        fetchUserList();
      }
    });
  }, []);

  const handleVideoClick = (videoId) => {
    setVideoId(videoId);
    setIsOpen(true);
  };
  const handleDelete = (listId) => async () => {
    if (!toggle) {
      setToggle(true);
      toast.warn(
        "Listeden silmek üzeresiniz. Tekrar tıklayarak silme işlemini onaylayınız.",
        {
          position: "top-right",
          autoClose: 2000,
          className: "mt-20",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } else {
      await deleteDoc(doc(db, "videoList", listId));
      window.location.reload();
      setToggle(false);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center flex-col items-center w-full h-screen">
        <Navbar />
        <p className="text-center inline-flex text-2xl font-medium items-start">
          Yükleniyor
        </p>
        <InfinitySpin width="200" color="#4fa94d" />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <Container>
        <section className="py-[100px]">
          {listing.length === 0 ? (
            <p className="text-xl font-medium">
              {" "}
              Şu an listede görüntülenecek videonuz bulunmamaktadır.{" "}
            </p>
          ) : (
            <fieldset className=" max-w-6xl mx-auto border-teal-700 border-[2px] bg-white rounded-md p-3">
              <legend className=" text-2xl text-teal-800 font-medium uppercase px-2">
                {" "}
                VİDEO LİSTEM
              </legend>

              <div className="videoList-container  flex flex-col gap-14  p-3">
                {(listing.length === 0 ? defaultList : listing).map(
                  (item, index) => {
                    return (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.6, staggerChildren: 0.5 }}
                        key={item?.listId}
                        className="videoList-wrapper flex flex-col md:flex-row gap-3 justify-between"
                      >
                        <div className="video-aside flex flex-col gap-3 justify-between">
                          <div className="flex flex-col gap-2">
                            {item.videoFileName.map((videoItem, index) => (
                              <button
                                key={index}
                                className="bg-teal-600 w-[10rem] mx-auto px-3 py-1  text-white  border border-teal-600 rounded-sm transition-all ease-in duration-300 hover:bg-white hover:text-teal-600 font-medium uppercase"
                                title={videoItem.split(".")[0]}
                                onClick={() => handleVideoClick(videoItem)}
                              >
                                {` Video-${index + 1} İzle`}
                              </button>
                            ))}
                            {item.videoUrl.map((videoItem, index) => (
                              <ModalVideo
                                key={videoItem}
                                channel="custom"
                                isOpen={
                                  videoItem.includes(videoId) ? isOpen : false
                                }
                                url={
                                  videoItem.includes(videoId) && `${videoItem}`
                                }
                                onClose={() => setIsOpen(false)}
                              />
                            ))}
                          </div>
                          <MdFolderDelete
                            onClick={handleDelete(item.listId)}
                            title="Listeden sil"
                            className="text-teal-600 text-4xl cursor-pointer opacity-100 ease-in transition-all hover:opacity-70"
                          />
                        </div>
                        <div className="content-side w-full md:border-l-2  pl-2 ">
                          <ListForm key={item.listId} item={item} />
                        </div>
                      </motion.div>
                    );
                  }
                )}
              </div>
            </fieldset>
          )}
        </section>
      </Container>
    </>
  );
};

export default VideoList;
