"use client";

import EarthCanva from "@/components/EarthCanva";
import toast from "react-hot-toast";
import { sendEmail } from "@/server/email";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormValues, userSchema } from "@/schema/userSchema";

const ContactPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    defaultValues: { name: "", email: "", message: "" },
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: UserFormValues) => {
    try {
      const res = await sendEmail(data as any);
      if (res.success) {
        toast.success("Message sent successfully!");
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-y-hidden pt-0">
      <div className="flex h-screen w-full items-center justify-center px-4 pt-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative flex w-full max-w-[600px] flex-col rounded-2xl border border-black/10 bg-white/50 p-6 shadow-xl backdrop-blur-[2px] dark:border-white/20 dark:bg-white/10 dark:shadow-none"
        >
          <div className="pt-2">
            <h1 className="group flex w-fit flex-col rounded-md text-3xl font-semibold text-black dark:text-white">
              Contact
              <span className="w-[20%] rounded-md border-b-4 border-green-400 duration-300 group-hover:w-[80%]" />
            </h1>

            <p className="py-4 text-lg text-black/70 dark:text-gray-300">
              Submit the form below or send me an{" "}
              <a
                className="inline-block bg-gradient-to-r from-[#D9AFD9] to-[#97D9E1] bg-clip-text font-semibold text-transparent"
                href="mailto:senthildeveloper4@gmail.com"
              >
                email
              </a>
              .
            </p>
          </div>

          {/* Name */}
          <input
            {...register("name")}
            className="w-full rounded-md border border-black/20 bg-black/5 p-3 text-black focus:outline-none focus:ring-2 focus:ring-green-400/60 dark:border-white/20 dark:bg-white/10 dark:text-white"
            placeholder="Name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}

          {/* Email */}
          <div className="my-4 w-full">
            <input
              {...register("email")}
              className="w-full rounded-md border border-black/20 bg-black/5 p-3 text-black focus:outline-none focus:ring-2 focus:ring-green-400/60 dark:border-white/20 dark:bg-white/10 dark:text-white"
              placeholder="E-mail"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Message */}
          <textarea
            {...register("message")}
            placeholder="Message"
            className="min-h-20 w-full rounded-md border border-black/20 bg-black/5 p-3 text-black focus:outline-none focus:ring-2 focus:ring-green-400/60 dark:border-white/20 dark:bg-white/10 dark:text-white"
            rows={10}
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">
              {errors.message.message}
            </p>
          )}

          <SubmitBtn isSubmitting={isSubmitting} />
        </form>
      </div>

      <div className="absolute inset-0 -z-10 h-full w-full">
        <EarthCanva />
      </div>
    </div>
  );
};

export default ContactPage;

const SubmitBtn = ({ isSubmitting }: { isSubmitting: boolean }) => {
  return (
    <button
      className="mx-auto my-8 w-fit rounded-full bg-green-500 p-3 px-6 font-semibold text-white transition-all duration-300 hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={isSubmitting}
    >
      {isSubmitting ? "Sending..." : "Contact me"}
    </button>
  );
};
