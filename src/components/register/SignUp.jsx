import { useForm } from "react-hook-form";

import React from "react";
import Container from "../UI/Container";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, signUp } from "../../app/auth/authSlicer";
import { motion } from "framer-motion";

const SignUp = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(setUser(data));
    dispatch(signUp(data.email, data.password, data.displayName));

    setTimeout(() => {
      navigate("/video-model");
    }, 1200);
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
            <br /> Uygulamasına Hoşgeldiniz
          </h1>
          <p className="text-white ">
            Uygulamaya giriş için kayıt olmanız gerekmektedir.
          </p>
          <form
            className="flex flex-col gap-4  w-full md:w-[600px] "
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* register your input into the hook by invoking the "register" function */}
            <input
              className="rounded-sm  py-2  px-1 focus:border-teal-700  focus:outline-none focus:rounded-md border-[3px] border-solid"
              type="text"
              placeholder="İsim.."
              {...register("displayName", { required: true, maxLength: 20 })}
            />
            {errors.displayName && <span>Bu alan zorunlu</span>}

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
              className="px-5 py-1 font-bold uppercase border-1 border-solid mt-4  bg-[#e2f1e6] transition-all ease-in duration-300 hover:bg-white  rounded-sm w-fit  self-center cursor-pointer "
              type="submit"
            />
          </form>
          <p className="text-white">
            * Çoktan kayıt oldunuz mu?{" "}
            <Link className="underline" to="/sign-in">
              Giriş Yapın
            </Link>
          </p>
        </div>
      </motion.div>
    </Container>
  );
};

export default SignUp;
