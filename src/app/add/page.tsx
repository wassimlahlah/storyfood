"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Inputs = {
  title: string;
  desc: string;
  price: number;
  catSlug: string;
};

type Option = {
  title: string;
  additionalPrice: number;
};

const AddPage = () => {
  const { data: session, status } = useSession();
  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    desc: "",
    price: 0,
    catSlug: "",
  });

  const [option, setOption] = useState<Option>({
    title: "",
    additionalPrice: 0,
  });

  const [options, setOptions] = useState<Option[]>([]);
  const [file, setFile] = useState<File>();

  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated" || (status === "authenticated" && !session?.user?.isAdmin)) {
      router.push("/");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const item = e.target.files?.[0];
    setFile(item);
  };

  // تحويل الصورة إلى Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const upload = async () => {
    if (!file) {
      alert("Veuillez sélectionner une image !");
      return null;
    }

    const base64 = await fileToBase64(file);
    return base64;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const imgBase64 = await upload();
      if (!imgBase64) return;

      const payload = {
        img: imgBase64,
        ...inputs,
        options: options.map((opt) => ({
          title: opt.title,
          additionalPrice: Number(opt.additionalPrice),
        })),
        isFeatured: true,
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      router.push(`/product/${data.id}`);
    } catch (err) {
      console.log(err);
      alert("Erreur lors de l’enregistrement !");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8 space-y-6"
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center">Add New Product</h1>

        {/* Image Upload */}
        <div className="flex flex-col gap-2">
          <label htmlFor="file" className="cursor-pointer flex items-center gap-3 text-gray-600 font-medium">
            <span>Upload Image</span>
          </label>
          <input type="file" id="file" onChange={handleChangeImg} className="hidden" />
          {file && <p className="text-sm text-gray-500">{file.name}</p>}
        </div>

        {/* Title & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            className="p-4 rounded-lg border border-gray-300 focus:border-red-400 focus:ring focus:ring-red-100 outline-none transition"
            onChange={handleChange}
          />
          <input
            type="text"
            name="catSlug"
            placeholder="Category"
            className="p-4 rounded-lg border border-gray-300 focus:border-red-400 focus:ring focus:ring-red-100 outline-none transition"
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <textarea
          name="desc"
          rows={4}
          placeholder="Product Description"
          className="w-full p-4 rounded-lg border border-gray-300 focus:border-red-400 focus:ring focus:ring-red-100 outline-none transition"
          onChange={handleChange}
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="p-4 rounded-lg border border-gray-300 focus:border-red-400 focus:ring focus:ring-red-100 outline-none w-full md:w-1/3"
          onChange={handleChange}
        />

        {/* Options */}
        <div className="space-y-2">
          <label className="font-medium text-gray-600">Options</label>
          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="text"
              name="title"
              placeholder="Option Title"
              className="p-3 rounded-lg border border-gray-300 focus:border-red-400 outline-none flex-1"
              value={option.title}
              onChange={changeOption}
            />
            <input
              type="number"
              name="additionalPrice"
              placeholder="Additional Price"
              className="p-3 rounded-lg border border-gray-300 focus:border-red-400 outline-none w-40"
              value={option.additionalPrice}
              onChange={changeOption}
            />
            <button
              type="button"
              className="bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-600 transition"
              onClick={() => {
                if (!option.title) return;
                setOptions((prev) => [...prev, option]);
                setOption({ title: "", additionalPrice: 0 });
              }}
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mt-2">
            {options.map((opt, idx) => (
              <div
                key={`${opt.title}-${idx}`}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg cursor-pointer hover:bg-red-100 transition flex items-center gap-2"
                onClick={() => setOptions((prev) => prev.filter((_, i) => i !== idx))}
              >
                {opt.title} <span className="text-xs">(+{opt.additionalPrice}DA)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-red-500 text-white p-4 rounded-xl font-medium hover:bg-red-600 transition"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default AddPage;
