"use client";

import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import {
  Upload,
  Tag,
  Layout,
  Send,
  Image as ImageIcon,
  Sparkles,
  Eye,
  Type,
} from "lucide-react";
import { useToast } from "@/components/Dashbord/TostComponents";
import { blogAPI } from "@/api";
import { useGetCategory } from "@/api/categoryService/useRequest";

const AddBlog = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);
  const { addToast } = useToast();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [BlogData, setBlogData] = useState<any>({
    titleBlog: "",
    categoryId: 0,
    slug: "",
    statusblog: 0,
    languageId: 1,
    contentBlog: "",
    excerpt: "",
  });

  const { mutate: BlogPostData, isPending: isPendingBlogPostData } =
    blogAPI.useBlogCreate();
  const { data: useGetCategoryData } = useGetCategory();

  useEffect(() => {
    let isMounted = true;
    const initQuill = async () => {
      if (!editorRef.current || quillInstance.current) return;
      const QuillModule = (await import("quill")).default;
      if (!isMounted) return;

      quillInstance.current = new QuillModule(editorRef.current, {
        theme: "snow",
        placeholder: "لێرەدا دەست بکە بە نووسین...",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ direction: "rtl" }, { align: [] }],
            ["link", "image", "video"],
            ["clean"],
          ],
        },
      });

      quillInstance.current.root.setAttribute("dir", "rtl");
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
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    const finalData = { ...BlogData, contentBlog: content };
    addToast("خەریکی ناردنی بابەتەکەین...");
    BlogPostData(finalData, {
      onSuccess: () => addToast("بابەتەکە بە سەرکەوتوویی بڵاوکرایەوە!", "success"),
      onError: () => addToast("هەڵەیەک ڕوویدا لە بڵاوکردنەوە", "error"),
    });
  };

  return (
    <div className="bg-[#F8F9FA]! min-h-screen! text-slate-800! p-4! md:p-8!" dir="rtl">
      {/* Header Section */}
      <div className="max-w-7xl! mx-auto! flex! flex-col! md:flex-row! justify-between! items-center! gap-4! bg-white! border! border-slate-100 p-6! rounded-[2.5rem]! shadow-sm mb-10!">
        <div className="flex! items-center! gap-4!">
          <div className="p-3! bg-[#D4AF37]/10! rounded-2xl! border! border-[#D4AF37]/20">
            <Sparkles className="text-[#D4AF37]" size={28} />
          </div>
          <div>
            <h1 className="text-2xl! font-black! m-0! text-slate-900!">
              زیادکردنی بابەتێکی <span className="text-[#D4AF37]">نوێ</span>
            </h1>
            <p className="text-slate-400! text-sm! mt-1">
              ناوەڕۆک و زانیارییەکانی بلۆگ لێرەدا بنووسە
            </p>
          </div>
        </div>

        <div className="flex! items-center! gap-3!">
          <button className="flex! items-center! gap-2! px-5! py-2.5! rounded-xl! bg-white! border! border-slate-200 text-slate-500 hover:bg-slate-50 transition-all font-bold">
            <Eye size={18} /> پێشاندانی پێشوەختە
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPendingBlogPostData}
            className="flex! items-center! gap-2! bg-gradient-to-r from-[#D4AF37] to-[#B8860B]! text-white! px-8! py-2.5! rounded-xl! font-bold! transition-all shadow-lg shadow-[#D4AF37]/30 active:scale-95"
          >
            {isPendingBlogPostData ? "خەریکی ناردنە..." : <>بڵاوکردنەوە <Send size={18} /></>}
          </button>
        </div>
      </div>

      <div className="max-w-7xl! mx-auto! grid grid-cols-1! lg:grid-cols-12! gap-8!">
        {/* Main Editor Area */}
        <div className="lg:col-span-8! space-y-6!">
          <div className="relative group px-2">
            <input
              type="text"
              placeholder="ناونیشانی بابەتەکە لێرە بنووسە..."
              className="w-full! bg-transparent! text-4xl! font-black! border-none! focus:ring-0! placeholder:text-slate-300! text-slate-900! transition-all"
              value={BlogData.titleBlog}
              onChange={(e) => setBlogData({ ...BlogData, titleBlog: e.target.value })}
            />
            <div className="h-1.5! w-24! bg-[#D4AF37]! rounded-full! group-focus-within:w-full! transition-all duration-700 mt-2" />
          </div>

          <div className="bg-white! border! border-slate-100 rounded-[2.5rem]! overflow-hidden! shadow-sm">
            <div className="p-4! border-b! border-slate-50 bg-slate-50/50! flex! items-center! gap-2! text-slate-400 font-bold">
              <Type size={18} /> ناوەڕۆکی سەرەکی
            </div>
            <div ref={editorRef} className="min-h-[500px]! text-slate-700! text-lg!" />
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="lg:col-span-4! space-y-6!">
          {/* Category Card */}
          <div className="bg-white! border! border-slate-100 p-6! rounded-[2rem]! shadow-sm">
            <div className="flex! items-center! gap-2! text-[#D4AF37]! font-bold! mb-4!">
              <Layout size={18} /> پۆلێنکردن
            </div>
            <select
              className="w-full! bg-slate-50! border! border-slate-100! rounded-xl! p-3! text-slate-600! outline-none! focus:border-[#D4AF37]/50 transition-all cursor-pointer"
              value={BlogData.categoryId}
              onChange={(e) => setBlogData({ ...BlogData, categoryId: Number(e.target.value) })}
            >
              <option value={0}>هەڵبژاردنی پۆلێن</option>
              {useGetCategoryData?.data?.map((item: any) => (
                <option value={item.id} key={item.id}>{item.nameCategory}</option>
              ))}
            </select>
          </div>

          {/* Tags/Slug Card */}
          <div className="bg-white! border! border-slate-100 p-6! rounded-[2rem]! shadow-sm">
            <div className="flex! items-center! gap-2! text-[#D4AF37]! font-bold! mb-4!">
              <Tag size={18} /> ناسناو (Slug)
            </div>
            <input
              type="text"
              className="w-full! bg-slate-50! border! border-slate-100! rounded-xl! p-3! text-slate-600! outline-none! focus:border-[#D4AF37]/50 transition-all"
              placeholder="وەک: my-article-slug"
              value={BlogData.slug}
              onChange={(e) => setBlogData({ ...BlogData, slug: e.target.value })}
            />
          </div>

          {/* Featured Image Card */}
          <div className="bg-white! border! border-slate-100 p-2! rounded-[2.5rem]! shadow-sm">
            <label className="relative! flex! flex-col! items-center! justify-center! w-full! h-72! border-2! border-dashed! border-slate-100 rounded-[2.3rem]! hover:bg-slate-50! hover:border-[#D4AF37]/30 transition-all cursor-pointer overflow-hidden group">
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="w-full! h-full! object-cover!" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                    <Upload className="text-white" />
                  </div>
                </>
              ) : (
                <div className="flex! flex-col! items-center! gap-3!">
                  <div className="p-4! bg-[#D4AF37]/5! rounded-full! text-[#D4AF37]">
                    <ImageIcon size={32} />
                  </div>
                  <p className="text-sm! text-slate-400! font-bold">وێنەی سەرەکی بابەت</p>
                </div>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .ql-toolbar.ql-snow {
          border: none !important;
          background: #fdfdfd !important;
          border-bottom: 1px solid #f1f5f9 !important;
          padding: 15px !important;
        }
        .ql-snow .ql-stroke { stroke: #64748b !important; }
        .ql-snow .ql-fill { fill: #64748b !important; }
        .ql-snow .ql-picker { color: #64748b !important; font-weight: bold; }
        .ql-container.ql-snow { border: none !important; }
        .ql-editor {
          min-height: 450px !important;
          padding: 30px !important;
          line-height: 2 !important;
          color: #334155 !important;
          background: white;
        }
        .ql-editor.ql-blank::before {
          right: 30px !important;
          left: auto !important;
          color: #cbd5e1 !important;
          font-style: normal !important;
        }
        .ql-snow .ql-tooltip {
          background-color: white !important;
          color: #334155 !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 12px !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05) !important;
        }
      `}</style>
    </div>
  );
};

export default AddBlog;