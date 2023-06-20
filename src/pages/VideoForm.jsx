import React from "react";
import Navbar from "../components/navbar/Navbar";
import Container from "../components/UI/Container";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { getDroppedOrSelectedFiles } from "html5-file-selector";

import { useForm } from "react-hook-form";
import CustomInput from "../components/input/Input";
import Input from "../components/input/Input";

const VideoForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Perform any necessary actions with the form data
  };
  const handleSubmitVideo = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };

  const getFilesFromEvent = (e) => {
    return new Promise((resolve) => {
      getDroppedOrSelectedFiles(e).then((chosenFiles) => {
        resolve(chosenFiles.map((f) => f.fileObject));
      });
    });
  };

  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
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
                {errors.title && <span>This field is required</span>}
              </div>

              <div>
                <label className="text-teal-700"> Açıklama</label>
                <textarea
                  row={3}
                  col={50}
                  className="w-full  h-[130px]  rounded-sm  py-1  px-1 font-medium focus:border-teal-700  focus:outline-none focus:rounded-md border-[2px] border-solid"
                  {...register("explanation", { required: true })}
                />
                {errors.explanation && <span>This field is required</span>}
              </div>
              <div className="flex  flex-col md:flex-row justify-between gap-4">
                <div className="w-full md:w-[50%]">
                  <label className="text-teal-700">Şirket</label>
                  <input
                    type="text"
                    className="w-full  rounded-sm  py-1  px-1 font-medium focus:border-teal-700  focus:outline-none focus:rounded-md border-[2px] border-solid"
                    {...register("companyName", { required: true })}
                  />
                  {errors.companyName && <span>This field is required</span>}
                </div>
                <div className=" w-full md:w-[50%]">
                  <label className="text-teal-700">Paylaşılacak Hesap</label>
                  <input
                    type="text"
                    className="w-full  rounded-sm  py-1  px-1 font-medium focus:border-teal-700  focus:outline-none focus:rounded-md border-[2px] border-solid"
                    {...register("accountName", { required: true })}
                  />
                  {errors.accountName && <span>This field is required</span>}
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
                {errors.platform && <span>This field is required</span>}
              </div>
              <div>
                <label className="text-teal-700 ">Upload Video</label>
                {/* <Dropzone
                  getUploadParams={getUploadParams}
                  onChangeStatus={handleChangeStatus}
                  onSubmit={handleSubmit}
                  accept="image/*,audio/*,video/*"
                /> */}
                <Dropzone
                  accept="image/*,audio/*,video/*"
                  getUploadParams={getUploadParams}
                  onChangeStatus={handleChangeStatus}
                  InputComponent={Input}
                  getFilesFromEvent={getFilesFromEvent}
                  {...register("video", { required: true })}
                />
                {errors.video && <span>This field is required</span>}
              </div>

              <button type="submit">Gönder</button>
            </form>
          </fieldset>
        </section>
      </Container>
    </>
  );
};
export default VideoForm;
