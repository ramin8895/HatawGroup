"use client";

import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import {
  Upload,
  Image as ImageIcon,
  Sparkles,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Layout,
  Languages,
  Tag,
} from "lucide-react";
import { useToast } from "@/components/Dashbord/TostComponents";
import { blogAPI, langAPI } from "@/api";
import { useGetCategory } from "@/api/categoryService/useRequest";

const AddBlog = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);
  const { addToast } = useToast();

  const [createdBlogId, setCreatedBlogId] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [BlogData, setBlogData] = useState<any>({
    titleBlog: "",
    categoryId: 0,
    slug: "",
    statusblog: 0,
    languageId: 1,
  });

  // Hooks
  const { mutate: BlogPostData, isPending: isCreating } =
    blogAPI.useBlogCreate();
  const { mutate: uploadImage, isPending: isUploading } =
    blogAPI.useBlogUploadImage();
  const { data: useGetCategoryData } = useGetCategory();
  const { data: useGetLangData } = langAPI.useGetlang();

  useEffect(() => {
    if (!editorRef.current || quillInstance.current) return;
    import("quill").then((QuillModule) => {
      quillInstance.current = new QuillModule.default(editorRef.current!, {
        theme: "snow",
        placeholder: "لێرەدا دەست بکە بە نووسین...",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ direction: "rtl" }],
            ["link", "image"],
          ],
        },
      });
      quillInstance.current!.root.setAttribute("dir", "rtl");
      quillInstance.current!.on("text-change", () =>
        setContent(quillInstance.current!.root.innerHTML)
      );
    });
  }, []);

  // مرحله ۱: ثبت بلاگ
  const handleBlogSubmit = () => {
    if (!BlogData.titleBlog || !content) {
      addToast("تکایە ناونیشان و ناوەڕۆک پڕ بکەرەوە", "error");
      return;
    }

    const finalData = { ...BlogData, contentBlog: content };

    BlogPostData(finalData, {
      onSuccess: (response: any) => {
        // چون لیست برمی‌گرداند، آخرین آیتم را می‌گیریم
        const allBlogs = response?.data;
        if (Array.isArray(allBlogs) && allBlogs.length > 0) {
          const lastCreatedBlog = allBlogs[allBlogs.length - 1]; // گرفتن آخرین وبلاگ لیست
          const blogId = lastCreatedBlog.id;

          if (blogId) {
            setCreatedBlogId(blogId);
            addToast(
              "بابەتەکە بە سەرکەوتوویی تۆمارکرا. ئێستا وێنەکە دابنێ",
              "success"
            );
          }
        } else {
          addToast("هەڵەیەک لە وەرگرتنی ناسنامەی بابەتەکە ڕوویدا", "error");
        }
      },
      onError: () => addToast("هەڵەیەک ڕوویدا لە تۆمارکردنی بابەتەکە", "error"),
    });
  };

  // مرحله ۲: آپلود عکس (بلافاصله بعد از انتخاب فایل)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !createdBlogId) return;

    setImagePreview(URL.createObjectURL(file));

    // فراخوانی هوک آپلود با ساختار جدید
    uploadImage(
      { id: createdBlogId, file: file },
      {
        onSuccess: () => addToast("وێنەکە بە سەرکەوتوویی بارکرا", "success"),
        onError: () => addToast("کێشەیەک لە آپلۆدی وێنەکە هەبوو", "error"),
      }
    );
  };

  return (
    <div className="bg-[#F8F9FA]! min-h-screen! p-4! md:p-8!" dir="rtl">
      <div className="max-w-4xl! mx-auto!">
        {/* Stepper */}
        <div className="flex! items-center! justify-center! gap-4! mb-10!">
          <div
            className={`flex items-center gap-2 font-bold ${
              !createdBlogId ? "text-[#D4AF37]" : "text-green-500"
            }`}
          >
            <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
              {createdBlogId ? <CheckCircle2 size={16} /> : "1"}
            </span>
            زانیارییەکان
          </div>
          <div className="w-10 h-[2px] bg-slate-200" />
          <div
            className={`flex items-center gap-2 font-bold ${
              createdBlogId ? "text-[#D4AF37]" : "text-slate-300"
            }`}
          >
            <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
              2
            </span>
            بارکردنی وێنە
          </div>
        </div>

        {!createdBlogId ? (
          <div className="bg-white! p-6! rounded-[2.5rem]! shadow-sm border! border-slate-100 animate-in fade-in duration-500">
            <input
              type="text"
              placeholder="ناونیشانی بابەت..."
              className="w-full! text-3xl! font-black! border-none! focus:ring-0! mb-6!"
              onChange={(e) =>
                setBlogData({ ...BlogData, titleBlog: e.target.value })
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 flex items-center gap-1">
                  <Layout size={14} /> پۆلێن
                </label>
                <select
                  className="w-full bg-slate-50 border-none rounded-xl p-3"
                  onChange={(e) =>
                    setBlogData({
                      ...BlogData,
                      categoryId: Number(e.target.value),
                    })
                  }
                >
                  <option value={0}>هەڵبژاردن</option>
                  {useGetCategoryData?.data?.map((c: any) => (
                    <option key={c.id} value={c.id}>
                      {c.nameCategory}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 flex items-center gap-1">
                  <Languages size={14} /> زمان
                </label>
                <select
                  className="w-full bg-slate-50 border-none rounded-xl p-3"
                  onChange={(e) =>
                    setBlogData({
                      ...BlogData,
                      languageId: Number(e.target.value),
                    })
                  }
                >
                  {useGetLangData?.data?.map((l: any) => (
                    <option key={l.id} value={l.id}>
                      {l.titleLanguage}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 flex items-center gap-1">
                  <Tag size={14} /> Slug
                </label>
                <input
                  className="w-full bg-slate-50 border-none rounded-xl p-3"
                  placeholder="my-post-url"
                  onChange={(e) =>
                    setBlogData({ ...BlogData, slug: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="border rounded-2xl overflow-hidden mb-6">
              <div ref={editorRef} className="min-h-[350px]" />
            </div>

            <button
              onClick={handleBlogSubmit}
              disabled={isCreating}
              className="w-full! py-4! bg-[#D4AF37]! text-white! rounded-2xl! font-bold! flex! items-center! justify-center! gap-2!"
            >
              {isCreating ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  تۆمارکردن و بەردەوامبوون <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="bg-white! p-10! rounded-[3rem]! shadow-xl! border! border-[#D4AF37]/20 text-center animate-in zoom-in duration-300">
            <div className="mb-6 w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-2xl font-black mb-2">
              بابەتەکە بە سەرکەوتوویی تۆمارکرا
            </h2>
            <p className="text-slate-400 mb-8">
              ئێستا وێنەی سەرەکی بلۆگەکە لێرەدا باربکە
            </p>

            <label className="relative block w-full max-w-sm mx-auto cursor-pointer group">
              <div
                className={`aspect-video rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center transition-all ${
                  imagePreview
                    ? "border-solid border-[#D4AF37]"
                    : "border-slate-200 group-hover:border-[#D4AF37]"
                }`}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    className="w-full h-full object-cover rounded-[1.8rem]"
                  />
                ) : (
                  <>
                    <Upload size={40} className="text-slate-300 mb-2" />
                    <span className="font-bold text-slate-400">
                      کلیک بکە بۆ هەڵبژاردن
                    </span>
                  </>
                )}

                {isUploading && (
                  <div className="absolute inset-0 bg-white/80 rounded-[1.8rem] flex flex-col items-center justify-center">
                    <Loader2 className="animate-spin text-[#D4AF37] mb-2" />
                    <span className="text-[#D4AF37] font-bold">
                      خەریکی بارکردنە...
                    </span>
                  </div>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </label>

            <button
              onClick={() => window.location.reload()}
              className="mt-10 text-slate-400 hover:text-[#D4AF37] font-bold transition-colors"
            >
              تەواو، چوون بۆ لیستی بلۆگەکان
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBlog;
