import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Container from "../components/UI/Container";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";

const VideoList = () => {
  const [listing, setListing] = useState([]);
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
  return (
    <>
      <Navbar />

      <Container>
        <section className="py-[100px]">Video Liste</section>
      </Container>
    </>
  );
};

export default VideoList;
