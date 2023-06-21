import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Container from "../components/UI/Container";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import "react-modal-video/scss/modal-video.scss"; // Import the default CSS
import ModalVideo from "react-modal-video";

const VideoList = () => {
  const [listing, setListing] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [videoKey, setVideoKey] = useState(Date.now());
  useEffect(() => {
    const videoList = [];
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          console.log(user);
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
    console.log(videoId);
    setVideoKey(Date.now());
  };
  return (
    <>
      <Navbar />

      <Container>
        <section className="py-[100px]">
          <div className="videoList-container">
            {listing.map((item, index) => {
              return index === 0 ? (
                <div key={item?.accountName} className="videoList-wrapper">
                  <div className="video-aside">
                    {item.videoFileName.map((videoItem, index) => (
                      <button
                        key={index}
                        onClick={() => handleVideoClick(videoItem)}
                      >
                        {`${videoItem.replace(/\.mp4$/, "")}  İzle`}
                      </button>
                    ))}
                    {item.videoUrl.map((videoItem, index) => (
                      <ModalVideo
                        key={videoKey}
                        channel="custom"
                        isOpen={videoItem.includes(videoId) ? isOpen : false}
                        url={videoItem.includes(videoId) && `${videoItem}`}
                        onClose={() => setIsOpen(false)}
                      />
                    ))}
                  </div>
                  <div className="content-side">asd</div>
                </div>
              ) : (
                false
              );
            })}
          </div>
        </section>
      </Container>
    </>
  );
};

export default VideoList;
