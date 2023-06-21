import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Container from "../components/UI/Container";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import "react-modal-video/scss/modal-video.scss"; // Import the default CSS
import ModalVideo from "react-modal-video";

import ListForm from "../components/listForm/ListForm";

const VideoList = () => {
  const [listing, setListing] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    const videoList = [];
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const listingRef = collection(db, "videoList");
          const queryRef = query(
            listingRef,
            where("userId", "==", auth.currentUser.uid)
          );
          const querySnapshot = await getDocs(queryRef);
          querySnapshot.forEach((doc) => {
            if (doc.exists()) {
              videoList.push(doc.data());
              setListing(videoList);
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, []);
  const handleVideoClick = (videoId) => {
    setVideoId(videoId);
    setIsOpen(true);
  };

  return (
    <>
      <Navbar />

      <Container>
        <section className="py-[100px]">
          <fieldset className=" max-w-6xl mx-auto border-teal-700 border-[2px] bg-white rounded-md p-3">
            <legend className=" text-2xl text-teal-800 font-medium uppercase px-2">
              {" "}
              VİDEO LİSTEM
            </legend>

            <div className="videoList-container  flex flex-col gap-14  p-3">
              {listing.map((item, index) => {
                return (
                  <div
                    key={item?.listId}
                    className="videoList-wrapper flex flex-col md:flex-row gap-3 justify-between"
                  >
                    <div className="video-aside flex flex-col gap-3">
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
                          isOpen={videoItem.includes(videoId) ? isOpen : false}
                          url={videoItem.includes(videoId) && `${videoItem}`}
                          onClose={() => setIsOpen(false)}
                        />
                      ))}
                    </div>
                    <div className="content-side w-full md:border-l-2  pl-2 ">
                      <ListForm key={item.listId} item={item} />
                    </div>
                  </div>
                );
              })}
            </div>
          </fieldset>
        </section>
      </Container>
    </>
  );
};

export default VideoList;
