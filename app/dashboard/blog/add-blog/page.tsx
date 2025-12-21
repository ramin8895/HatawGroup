"use client";

import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { 
  Upload, Tag, Layout, Send, Image as ImageIcon, 
  ChevronRight, Sparkles, Eye, Save, 
  Type
} from "lucide-react";
import { useToast } from "@/components/Dashbord/TostComponents";
import { blogAPI } from "@/api";
import { motion } from "framer-motion";

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
  });

  const { mutate: BlogPostData, isPending: isPendingBlogPostData } = blogAPI.useBlogCreate();

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
    return () => { isMounted = false; };
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
    <div className=" bg-[#020617]! text-white! p-4! md:p-8!" dir="rtl">
      {/* Header Section */}
      <div className="max-w-7xl! mx-auto! flex! flex-col! md:flex-row! justify-between! items-center! gap-4! bg-white/[0.02]! border! border-white/10 p-6! rounded-[2rem]! backdrop-blur-xl!">
        <div className="flex! items-center! gap-4!">
          <div className="p-3! bg-indigo-500/10! rounded-2xl! border! border-indigo-500/20">
            <Sparkles className="text-indigo-400" size={28} />
          </div>
          <div>
            <h1 className="text-2xl! font-black! m-0!">زیادکردنی بابەتێکی نوێ</h1>
            <p className="text-slate-500! text-sm! mt-1">ناوەڕۆک و زانیارییەکانی بلۆگ لێرەدا بنووسە</p>
          </div>
        </div>
        
        <div className="flex! items-center! gap-3!">
          <button className="flex! items-center! gap-2! px-5! py-2.5! rounded-xl! bg-white/5! border! border-white/10 text-slate-300 hover:bg-white/10 transition-all">
            <Eye size={18} /> پێشاندانی پێشوەختە
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPendingBlogPostData}
            className="flex! items-center! gap-2! bg-indigo-600! hover:bg-indigo-500! text-white! px-8! py-2.5! rounded-xl! font-bold! transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
          >
            {isPendingBlogPostData ? "خەریکی ناردنە..." : <>بڵاوکردنەوە <Send size={18} /></>}
          </button>
        </div>
      </div>

      <div className="max-w-7xl! mx-auto! grid grid-cols-1! lg:grid-cols-12! gap-8!">
        {/* Main Editor Area */}
        <div className="lg:col-span-8! space-y-6!">
          {/* Title Input */}
          <div className="relative group">
            <input
              type="text"
              placeholder="ناونیشانی بابەتەکە لێرە بنووسە..."
              className="w-full! bg-transparent! text-3xl! font-black! border-none! focus:ring-0! placeholder:text-slate-700! text-white! transition-all"
              value={BlogData.titleBlog}
              onChange={(e) => setBlogData({ ...BlogData, titleBlog: e.target.value })}
            />
            <div className="h-1! w-24! bg-indigo-500! rounded-full! group-focus-within:w-full! transition-all duration-500 mt-2" />
          </div>

          {/* Quill Editor Container */}
          <div className="bg-white/[0.02]! border! border-white/10 rounded-[2.5rem]! overflow-hidden! shadow-2xl! backdrop-blur-md!">
            <div className="p-4! border-b! border-white/5 bg-white/[0.02]! flex! items-center! gap-2! text-slate-400">
              <Type size={18} /> ناوەڕۆکی سەرەکی
            </div>
            <div ref={editorRef} className="min-h-[500px]! text-white! text-lg!" />
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="lg:col-span-4! space-y-6!">
          {/* Category Card */}
          <div className="bg-white/[0.02]! border! border-white/10 p-6! rounded-[2rem]! backdrop-blur-xl!">
            <div className="flex! items-center! gap-2! text-indigo-400! font-bold! mb-4!">
              <Layout size={18} /> پۆلێنکردن
            </div>
            <select
              className="w-full! bg-white/5! border! border-white/10! rounded-xl! p-3! text-slate-300! outline-none! focus:border-indigo-500/50 transition-all"
              value={BlogData.categoryId}
              onChange={(e) => setBlogData({ ...BlogData, categoryId: Number(e.target.value) })}
            >
              <option value="0" className="bg-[#0f172a]">هەڵبژێرە</option>
              <option value="1" className="bg-[#0f172a]">تەکنەلۆژیا</option>
              <option value="2" className="bg-[#0f172a]">دیزاین</option>
            </select>
          </div>

          {/* Tags/Slug Card */}
          <div className="bg-white/[0.02]! border! border-white/10 p-6! rounded-[2rem]! backdrop-blur-xl!">
            <div className="flex! items-center! gap-2! text-indigo-400! font-bold! mb-4!">
              <Tag size={18} /> ناسناو (Slug)
            </div>
            <input
              type="text"
              className="w-full! bg-white/5! border! border-white/10! rounded-xl! p-3! text-slate-300! outline-none! focus:border-indigo-500/50 transition-all"
              placeholder="وەک: my-new-article"
              value={BlogData.slug}
              onChange={(e) => setBlogData({ ...BlogData, slug: e.target.value })}
            />
          </div>

          {/* Featured Image Card */}
          <div className="bg-white/[0.02]! border! border-white/10 p-2! rounded-[2.5rem]! backdrop-blur-xl!">
            <label className="relative! flex! flex-col! items-center! justify-center! w-full! h-72! border-2! border-dashed! border-white/10 rounded-[2.3rem]! hover:bg-white/[0.03]! hover:border-indigo-500/50 transition-all cursor-pointer overflow-hidden group">
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="w-full! h-full! object-cover!" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                    <Upload className="text-white" />
                  </div>
                </>
              ) : (
                <div className="flex! flex-col! items-center! gap-3!">
                  <div className="p-4! bg-white/5! rounded-full! text-slate-400">
                    <ImageIcon size={32} />
                  </div>
                  <p className="text-sm! text-slate-500! font-medium">وێنەی سەرەکی بابەت</p>
                </div>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>
        </div>
      </div>

      {/* Custom Styling for Dark Quill */}
      <style jsx global>{`
        .ql-toolbar.ql-snow {
          border: none !important;
          background: rgba(255, 255, 255, 0.02) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
          padding: 15px !important;
        }
        .ql-snow .ql-stroke { stroke: #94a3b8 !important; }
        .ql-snow .ql-fill { fill: #94a3b8 !important; }
        .ql-snow .ql-picker { color: #94a3b8 !important; }
        .ql-container.ql-snow { border: none !important; font-family: inherit !important; }
        .ql-editor { 
          min-height: 450px !important; 
          padding: 30px !important; 
          line-height: 2 !important; 
          color: #e2e8f0 !important;
        }
        .ql-editor.ql-blank::before {
          right: 30px !important;
          left: auto !important;
          color: #334155 !important;
          font-style: normal !important;
        }
        .ql-snow .ql-tooltip {
          background-color: #0f172a !important;
          color: white !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          border-radius: 8px !important;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5) !important;
        }
      `}</style>
    </div>
  );
};

export default AddBlog;