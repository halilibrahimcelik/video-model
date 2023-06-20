import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Container from "../components/UI/Container";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { getDroppedOrSelectedFiles } from "html5-file-selector";
import { useForm } from "react-hook-form";
import Input from "../components/input/Input";
import { doc, setDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../firebase/firebase.config";
import { useSelector } from "react-redux";
import { selectUserId } from "../app/auth/authSlicer";

const VideoForm = () => {
  const userId = useSelector(selectUserId);
  const storage = getStorage();

  const videoFiles = [];
  const [uploaded, setUploaded] = useState(false);

  const [dropzoneKey, setDropzoneKey] = useState(Date.now());
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const storeImage = async (videoData) => {
      return new Promise((resolve, reject) => {
        const nameId = new Date().getTime() + videoData.name;
        const storageRef = ref(storage, `video/${nameId}`);

        const uploadTask = uploadBytesResumable(storageRef, videoData);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
            // eslint-disable-next-line default-case
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            reject(error, "error");
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };
    const updateVideoUrl = await Promise.all(
      [...data.video].map((avatar) => storeImage(avatar))
    ).catch((error) => {
      console.log(error);
      setUploaded(false);
    });
    if (updateVideoUrl) {
      setUploaded(true);
    }

    await setDoc(doc(db, "videoList", `videoTitle:${data.title}`), {
      title: data.title,
      companyName: data.companyName,
      explanation: data.explanation,
      platform: data.platform,
      accountName: data.accountName,
      userId,
      videoUrl: updateVideoUrl,
    });
    // Perform any necessary actions with the form data
    reset();

    setDropzoneKey(Date.now());
  };

  const getFilesFromEvent = (e) => {
    return new Promise((resolve) => {
      getDroppedOrSelectedFiles(e).then((chosenFiles) => {
        console.log(e, "test");
        resolve(chosenFiles.map((f) => f.fileObject));
      });
    });
  };

  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };

  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, file, meta);

    if (status === "done") {
      videoFiles.push(file);
    }
    if (status === "aborted") {
      alert("Lütfen video yüklemeyi tekrar deneyin.");
      window.location.reload();
      return;
    }

    setValue("video", videoFiles);
  };

  return (
    <>
      <Navbar />

      <Container>
        <section className="py-[100px] ">
          <fieldset className=" max-w-5xl mx-auto border-teal-700 border-[2px] bg-white rounded-md p-3">
            <legend className="text-teal-700  px-1 text-3xl">
              Video Model
            </legend>
            <form
              className="max-w-5xl rounded-md   flex flex-col gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label className="text-teal-700">Başlık</label>
                <input
                  type="text"
                  className="w-full  rounded-sm  py-1  px-1 font-medium focus:border-teal-700  focus:outline-none focus:rounded-md border-[2px] border-solid"
                  {...register("title", { required: true })}
                />
                {errors.title && (
                  <span>Bu alanın doldurulması zorunludur.</span>
                )}
              </div>

              <div>
                <label className="text-teal-700"> Açıklama</label>
                <textarea
                  row={3}
                  col={50}
                  className="w-full  h-[130px]  rounded-sm  py-1  px-1 font-medium focus:border-teal-700  focus:outline-none focus:rounded-md border-[2px] border-solid"
                  {...register("explanation", { required: false })}
                />
                {errors.explanation && (
                  <span>Bu alanın doldurulması zorunludur.</span>
                )}
              </div>
              <div className="flex  flex-col md:flex-row justify-between gap-4">
                <div className="w-full md:w-[50%]">
                  <label className="text-teal-700">Şirket</label>
                  <input
                    type="text"
                    className="w-full  rounded-sm  py-1  px-1 font-medium focus:border-teal-700  focus:outline-none focus:rounded-md border-[2px] border-solid"
                    {...register("companyName", { required: true })}
                  />
                  {errors.companyName && (
                    <span>Bu alanın doldurulması zorunludur.</span>
                  )}
                </div>
                <div className=" w-full md:w-[50%]">
                  <label className="text-teal-700">Paylaşılacak Hesap</label>
                  <input
                    type="text"
                    className="w-full  rounded-sm  py-1  px-1 font-medium focus:border-teal-700  focus:outline-none focus:rounded-md border-[2px] border-solid"
                    {...register("accountName", { required: true })}
                  />
                  {errors.accountName && (
                    <span>Bu alanın doldurulması zorunludur.</span>
                  )}
                </div>
              </div>
              <div>
                <label className="text-teal-700">Platform</label>
                <div>
                  <label className="flex items-center font-medium">
                    <input
                      type="radio"
                      value="facebook"
                      className="mr-1"
                      {...register("platform", { required: true })}
                    />
                    Facebook
                  </label>
                </div>
                <div>
                  <label className="flex items-center font-medium">
                    <input
                      type="radio"
                      value="youtube"
                      className="mr-1"
                      {...register("platform", { required: true })}
                    />
                    YouTube
                  </label>
                </div>
                <div>
                  <label className="flex items-center font-medium">
                    <input
                      type="radio"
                      value="tiktok"
                      className="mr-1"
                      {...register("platform", { required: true })}
                    />
                    TikTok
                  </label>
                </div>
                <div>
                  <label className="flex items-center font-medium">
                    <input
                      type="radio"
                      value="instagram"
                      className="mr-1"
                      {...register("platform", { required: true })}
                    />
                    Instagram
                  </label>
                </div>
                {errors.platform && (
                  <span>Bu alanın doldurulması zorunludur.</span>
                )}
              </div>
              <div>
                <label className="text-teal-700 ">Video Yükle</label>

                <Dropzone
                  key={dropzoneKey}
                  classNames="input-video"
                  accept="video/*,image/*,audio/*"
                  getUploadParams={getUploadParams}
                  onChangeStatus={handleChangeStatus}
                  InputComponent={Input}
                  maxSizeBytes={50000000}
                  getFilesFromEvent={getFilesFromEvent}
                  {...register("video", { required: true })}
                />
                {errors.video && (
                  <span>Bu alanın doldurulması zorunludur.</span>
                )}
              </div>

              <button
                className="bg-teal-600 w-fit mx-auto px-3 py-1  text-white  border border-teal-600 rounded-sm transition-all ease-in duration-300 hover:bg-white hover:text-teal-600 font-medium uppercase"
                type="submit"
              >
                Gönder
              </button>
            </form>
          </fieldset>
        </section>
      </Container>
    </>
  );
};
export default VideoForm;
