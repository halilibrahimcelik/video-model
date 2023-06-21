import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Container from "../components/UI/Container";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import "react-modal-video/scss/modal-video.scss"; // Import the default CSS
import ModalVideo from "react-modal-video";
import { useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";

const VideoList = () => {
  const [listing, setListing] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [videoId, setVideoId] = useState("");
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
  console.log(listing);
  const handleVideoClick = (videoId) => {
    setVideoId(videoId);
    setIsOpen(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
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

            <div className="videoList-container  ">
              {listing.map((item, index) => {
                return index === 0 ? (
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
                      <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                      >
                        <div className="flex flex-col lg:flex-row">
                          <div className="flex w-full">
                            <label
                              className="text-teal-700 inline-block whitespace-nowrap  mr-2 text-[1.2rem] font-medium "
                              htmlFor="accountName"
                            >
                              Paylaşılacak Hesap:
                            </label>
                            <input
                              id="accountName"
                              value={item.accountName}
                              readOnly
                              className="bg-transparent w-full border-none font-medium text-[1.2rem] outline-none cursor-default capitalize"
                            />
                          </div>
                          <div className="flex w-full">
                            <label
                              className="text-teal-700 inline-block whitespace-nowrap mr-2 text-[1.2rem] font-medium"
                              htmlFor="companyName"
                            >
                              Şirket Adı:
                            </label>
                            <input
                              id="companyName"
                              value={item.companyName}
                              readOnly
                              className="bg-transparent w-full border-none font-medium text-[1.2rem] outline-none cursor-default capitalize"
                            />
                          </div>
                        </div>

                        <div className="flex w-full">
                          <label
                            className="text-teal-700 inline-flex flex-col    items-end whitespace-nowrap mr-2 text-[1.2rem] font-medium"
                            htmlFor="explanation"
                          >
                            Açıklama:
                            <CiEdit className="text-4xl cursor-pointer  " />
                          </label>
                          <textarea
                            id="explanation"
                            cols={50}
                            rows={3}
                            readOnly={false}
                            className="h-[140px] max-w-full rounded-md w-full p-2  font-medium text-[1.2rem] focus:border-teal-700  focus:outline-none focus:rounded-md border-[3px] border-solid "
                            defaultValue={item.explanation}
                          />
                        </div>
                        <div className="flex w-full">
                          <label
                            className="text-teal-700 inline-flex flex-col    items-end whitespace-nowrap mr-2 text-[1.2rem] font-medium"
                            htmlFor="title"
                          >
                            Başlık:
                            <CiEdit className="text-4xl cursor-pointer  " />
                          </label>
                          <input
                            id="title"
                            className="bg-transparentmax-w-full rounded-md w-full p-2  font-medium text-[1.2rem] focus:border-teal-700  focus:outline-none focus:rounded-md border-[3px] border-solid "
                            defaultValue={item.title}
                          />
                        </div>
                        <div className="flex w-full">
                          <label
                            className="text-teal-700 inline-block whitespace-nowrap mr-2 text-[1.2rem] font-medium"
                            htmlFor="platform"
                          >
                            Platform:
                          </label>
                          <input
                            id="platform"
                            className="bg-transparent w-full border-none font-medium text-[1.2rem] outline-none cursor-default capitalize"
                            readOnly
                            value={item.platform}
                          />
                        </div>
                        <button
                          type="submit"
                          className="bg-teal-600 w-[10rem] mx-auto px-3 py-1  text-white  border border-teal-600 rounded-sm transition-all ease-in duration-300 hover:bg-white hover:text-teal-600 font-medium uppercase"
                        >
                          DEĞİŞTİR
                        </button>
                      </form>
                    </div>
                  </div>
                ) : (
                  false
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
