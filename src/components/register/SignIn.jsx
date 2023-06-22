import { useForm } from "react-hook-form";

import React from "react";
import Container from "../UI/Container";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../../app/auth/authSlicer";
import { motion } from "framer-motion";
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(signIn(data.email, data.password));

    setTimeout(() => {
      navigate("/video-model");
    }, 1000);
  };
  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1, staggerChildren: 0.5 }}
        className="flex justify-center items-center w-full h-screen flex-col "
      >
        <div className="bg-gradient-primary p-10 rounded-md grid gap-4">
          <h1 className="text-3xl text-center text-white">
            Video-Model App
            <br />
          </h1>
          <p className="text-white ">
            Uygulamaya giriş için kullanıcı bilgilerinizi giriniz.
          </p>
          <form
            className="flex flex-col gap-4  w-full md:w-[600px] "
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* include validation with required or other standard HTML validation rules */}
            <input
              className="rounded-sm  py-2  px-1 focus:border-teal-700  focus:outline-none focus:rounded-md border-[3px] border-solid"
              type="email"
              placeholder="Email.."
              {...register("email", { required: true })}
            />
            {/* errors will return when field validation fails  */}
            {errors.email && <span>Bu alan zorunlu</span>}
            <input
              className="rounded-sm  py-2  px-1 focus:border-teal-700  focus:outline-none focus:rounded-md border-[3px] border-solid"
              type="password"
              placeholder="Password.."
              {...register("password", { required: true, minLength: 6 })}
            />
            {/* errors will return when field validation fails  */}
            {errors.password && (
              <span>Lüttfen minimum 6 karater kullanınız.</span>
            )}
            <input
              className="px-5 py-1  font-medium border-1 border-solid mt-4  bg-[#e2f1e6] transition-all ease-in duration-300 hover:bg-white  rounded-sm w-fit  self-center cursor-pointer "
              type="submit"
              value="GİRİŞ YAP"
            />
          </form>
          <p className="text-white">
            * Kayıt olmadınız mı?{" "}
            <Link className="underline" to="/">
              Kayıt Yapın
            </Link>
          </p>
        </div>
      </motion.div>
    </Container>
  );
};

export default SignIn;
