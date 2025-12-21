"use client";

import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Upload, Tag, Layout, Type, Send } from "lucide-react"; // Optional: Install lucide-react
import { useToast } from "@/components/Dashbord/TostComponents";
import { blogAPI } from "@/api";

const AddBlog = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);

  // const [title, setTitle] = useState("");
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const { addToast } = useToast();
  const [BlogData, setBlogData] = useState<Blog>({
    titleBlog: "",
    featured_image: "",
    categoryId: 0,
    contentBlog: "",
    excerpt: "",
    featured_imagename: "",
    languageId: 0,
    slug: "",
    statusblog: 0,
  });
  useEffect(() => {
    let isMounted = true;

    const initQuill = async () => {
      if (!editorRef.current || quillInstance.current) return;

      // ۱. ایمپورت داینامیک Quill و ماژول تغییر سایز
      const Quill = (await import("quill")).default;

      if (!isMounted) return;
      // ۲. ثبت ماژول در هسته Quill

      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "نوشتن را شروع کنید...",
        readOnly: false,
        modules: {
          // ۳. فعال‌سازی ماژول تغییر سایز در تنظیمات
          imageResize: {
            parchment: Quill.import("parchment"),
            modules: ["Resize", "DisplaySize", "Toolbar"], // قابلیت تغییر اندازه، نمایش ابعاد و تولبار شناور برای تراز
          },
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ align: [] }],
            ["link", "image", "video", "formula"],
            ["clean"],
          ],
          clipboard: {
            matchVisual: false,
          },
          keyboard: {
            bindings: {
              tab: {
                key: 9,
                handler: function (range: any, context: any) {
                  return true;
                },
              },
            },
          },
          history: {
            delay: 2000,
            maxStack: 500,
            userOnly: true,
          },
        },
      });

      // تنظیم جهت راست‌به‌چپ برای محتوا
      quillInstance.current.root.setAttribute("dir", "rtl");
      quillInstance.current.format("direction", "rtl");
      quillInstance.current.format("align", "right");

      quillInstance.current.on("text-change", () => {
        setContent(quillInstance.current!.root.innerHTML);
      });
    };

    initQuill();

    return () => {
      isMounted = false;
    };
  }, []);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const { mutate: BlogPostData, isPending: isPendingBlogPostData } =
    blogAPI.useBlogCreate(BlogData);
  const handleSubmit = () => {
    addToast("مقاله با موفقیت منتشر شد!", "success");
    BlogPostData();
  };

  return (
    <div
      className="min-h-screen bg-[#F8FAFC]  text-slate-900 font-sans pb-20!"
      dir="rtl"
    >
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 sticky top-0! z-10! py-4! mb-8!">
        <div className="max-w-5xl! mx-auto px-6! flex justify-between items-center">
          <h1 className="text-xl font-extrabold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            پنل نویسندگان
          </h1>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2! bg-indigo-600 hover:bg-indigo-700 text-white px-6! py-2.5! rounded-full font-medium transition-all shadow-md hover:shadow-indigo-200 active:scale-95"
          >
            <span>انتشار مقاله</span>
          </button>
        </div>
      </div>
      <div className="grid  md:grid-cols-12  ">
        <div className=" md:col-span-10! mx-auto md:px-2! grid grid-cols-1 gap-4!">
          {/* Main Content Area */}
          <div className="space-y-4!">
            {/* Title Input */}
            <div className="group">
              <input
                type="text"
                placeholder="عنوان جذاب مقاله شما..."
                className="w-full bg-transparent text-xl! font-black border-none focus:ring-0 placeholder:text-slate-300 transition-colors"
                value={BlogData.titleBlog}
                onChange={(e) =>
                  setBlogData({ ...BlogData, titleBlog: e.target.value })
                }
              />
              <div className="h-0.5! w-20! bg-indigo-500 group-focus-within:w-full transition-all duration-500 mt-2"></div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4! border-b border-slate-100 bg-slate-50 text-slate-700 font-medium">
                متن مقاله
              </div>

              <div
                ref={editorRef}
                className="text-lg"
                style={{ height: "450px" }}
              />
            </div>
          </div>

          {/* Settings Bar */}
        </div>

        <div className="col-span-2 md:grid-cols-1 flex flex-col gap-2! ">
          <div className="bg-white p-2! rounded-2xl border border-slate-200 shadow-sm space-y-2! h-40">
            <div className="flex items-center gap-2 text-indigo-600 font-semibold mb-2!">
              <Layout size={18} />
              <span>دسته بندی</span>
            </div>
            <select
              className="w-full rounded-xl border-slate-200 bg-slate-50 px-4! py-3! outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
              value={BlogData.categoryId}
              onChange={(e) =>
                setBlogData({ ...BlogData, categoryId: +e.target.value })
              }
            >
              <option value="">انتخاب کنید</option>
              <option value="programming">برنامه‌نویسی</option>
              <option value="design">طراحی</option>
              <option value="tech">تکنولوژی</option>
            </select>
          </div>

          <div className="bg-white p-2! rounded-2xl border border-slate-200 shadow-sm space-y-2! h-40">
            <div className="flex items-center gap-2! text-indigo-600 font-semibold mb-2!">
              <Tag size={18} />
              <span>تگ‌ها</span>
            </div>
            <input
              type="text"
              className="w-full rounded-xl border-slate-200 bg-slate-50 px-4! py-3! outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="مثلا: react, js, web"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div className="relative group">
            <label className="flex flex-col items-center justify-center w-full h-64! border-2 border-dashed border-slate-200 rounded-3xl bg-white hover:bg-slate-50 hover:border-indigo-300 transition-all cursor-pointer overflow-hidden">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5! pb-6!">
                  <Upload className="w-10! h-10! text-slate-400 mb-3!" />
                  <p className="text-sm text-slate-500">
                    تصویر شاخص را انتخاب کنید
                  </p>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>
      </div>
      {/* Global CSS Overrides for Quill */}
      <style jsx global>{`
        .ql-toolbar.ql-snow {
          border: none !important;
          padding: 12px !important;
        }
        .ql-container.ql-snow {
          border: none !important;
          font-family: inherit !important;
        }
        .ql-editor {
          padding: 24px !important;
          line-height: 1.8 !important;
        }
        .ql-editor.ql-blank::before {
          right: 24px !important;
          left: auto !important;
          font-style: normal !important;
          color: #cbd5e1 !important;
        }
      `}</style>
    </div>
  );
};

export default AddBlog;
