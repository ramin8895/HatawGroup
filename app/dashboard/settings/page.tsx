"use client";
import React, { useState } from 'react';
import { 
  Building2, 
  Languages, 
  Users, 
  ShieldCheck, 
  Save,
  ChevronLeft,
  UserPlus
} from 'lucide-react';

const SettingPage = () => {
  const [activeTab, setActiveTab] = useState('company');

  const SettingRow = ({ label, description, children }: any) => (
    <div className="flex flex-col md:flex-row md:items-center justify-between py-6! border-b border-slate-100 last:border-0 transition-all">
      <div className="mb-2! md:mb-0!">
        <h3 className="text-sm! font-bold text-slate-800">{label}</h3>
        <p className="text-xs! text-slate-500 mt-1! leading-relaxed">{description}</p>
      </div>
      <div className="w-full! md:w-auto! flex justify-start md:justify-end!">
        {children}
      </div>
    </div>
  );

  return (
    <div className=" bg-[#F8FAFC] p-4! " dir="rtl">
      <div className="md:max-w-6xl! mx-auto!">
        {/* Header */}

        <div className="grid grid-cols-1! lg:grid-cols-12! gap-8!">
          {/* سایدبار منوی تنظیمات */}
          <div className="lg:col-span-3! space-y-2.5!">
            {[
              { id: 'company', label: 'مشخصات مجموعه', icon: Building2 },
              { id: 'language', label: 'تنظیمات زبان', icon: Languages },
              { id: 'users', label: 'مدیریت کاربران', icon: Users },
              { id: 'security', label: 'امنیت و دسترسی', icon: ShieldCheck },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full! flex items-center justify-between px-5! py-4! rounded-2xl text-sm! font-bold transition-all duration-300 ${
                  activeTab === item.id 
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 -translate-x-1' 
                  : 'bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3!">
                  <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                  {item.label}
                </div>
                {activeTab === item.id && <ChevronLeft size={16} />}
              </button>
            ))}
          </div>

          {/* محتوای تنظیمات */}
          <div className="lg:col-span-9! bg-white rounded-[2.5rem] shadow-sm border border-slate-200/60 overflow-hidden">
            <div className="p-8! md:p-10!">
              
              {/* بخش مشخصات مجموعه */}
              {activeTab === 'company' && (
                <div className="animate-in fade-in slide-in-from-left-4 duration-500 space-y-8!">
                  <div className="flex items-center gap-3! pb-6! border-b border-slate-100">
                    <div className="p-3! bg-indigo-50 rounded-2xl text-indigo-600">
                        <Building2 size={24} />
                    </div>
                    <h2 className="text-xl! font-black text-slate-800">اطلاعات پایه مجموعه</h2>
                  </div>
                  
                  <div className="grid grid-cols-1! md:grid-cols-2! gap-6!">
                    <div className="space-y-2!">
                      <label className="text-xs! font-bold text-slate-700 mr-1!">نام تجاری مجموعه</label>
                      <input type="text" className="w-full! p-3.5! bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4! focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400" placeholder="مثلا: هلدینگ آلفا" />
                    </div>
                    <div className="space-y-2!">
                      <label className="text-xs! font-bold text-slate-700 mr-1!">شناسه ثبت / کد اقتصادی</label>
                      <input type="text" className="w-full! p-3.5! bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4! focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all" />
                    </div>
                  </div>

                  <SettingRow label="ایمیل رسمی مکاتبات" description="این ایمیل در فوتر فاکتورها و خروجی‌های سیستم درج خواهد شد.">
                    <input type="email" className="w-full! md:w-80! p-3! bg-slate-50 border border-slate-200 rounded-xl focus:ring-2! focus:ring-indigo-500 outline-none" placeholder="office@company.com" />
                  </SettingRow>
                </div>
              )}

              {/* بخش تنظیمات زبان */}
              {activeTab === 'language' && (
                <div className="animate-in fade-in slide-in-from-left-4 duration-500 space-y-8!">
                  <div className="flex items-center gap-3! pb-6! border-b border-slate-100">
                    <div className="p-3! bg-amber-50 rounded-2xl text-amber-600">
                        <Languages size={24} />
                    </div>
                    <h2 className="text-xl! font-black text-slate-800">بومی‌سازی و زمان</h2>
                  </div>
                  <SettingRow label="زبان پیش‌فرض محیط کاربری" description="تمامی پیام‌های سیستم به این زبان ترجمه خواهند شد.">
                    <select className="p-3! border border-slate-200 rounded-xl bg-slate-50 w-48! font-semibold text-sm! outline-none focus:ring-2! focus:ring-indigo-500">
                      <option>فارسی (Persian)</option>
                      <option>English (US)</option>
                      <option>العربية (Arabic)</option>
                    </select>
                  </SettingRow>
                  <SettingRow label="فرمت نمایش تاریخ" description="نحوه نمایش تاریخ در گزارشات و جداول.">
                    <div className="flex gap-2!">
                        <button className="px-4! py-2! bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-lg text-xs! font-bold">شمسی</button>
                        <button className="px-4! py-2! bg-white text-slate-500 border border-slate-200 rounded-lg text-xs! font-bold">میلادی</button>
                    </div>
                  </SettingRow>
                </div>
              )}

              {/* بخش کاربران */}
              {activeTab === 'users' && (
                <div className="animate-in fade-in slide-in-from-left-4 duration-500 space-y-8!">
                  <div className="flex items-center justify-between pb-6! border-b border-slate-100">
                    <div className="flex items-center gap-3!">
                        <div className="p-3! bg-emerald-50 rounded-2xl text-emerald-600">
                            <Users size={24} />
                        </div>
                        <h2 className="text-xl! font-black text-slate-800">تیم مدیریتی</h2>
                    </div>
                    <button className="flex items-center gap-2! bg-slate-900 text-white px-5! py-2.5! rounded-xl text-sm! font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95">
                      <UserPlus size={18} />
                      عضو جدید
                    </button>
                  </div>
                  <div className="grid gap-4!">
                    {[
                      { name: 'امیررضا رضایی', role: 'مدیر ارشد', email: 'rezaei@test.com', color: 'bg-blue-500' },
                      { name: 'مریم سعیدی', role: 'مدیر محتوا', email: 'saeedi@test.com', color: 'bg-purple-500' },
                    ].map((user, i) => (
                      <div key={i} className="group p-4! border border-slate-100 rounded-2xl flex justify-between items-center hover:bg-slate-50 transition-all">
                        <div className="flex items-center gap-4!">
                          <div className={`w-12! h-12! ${user.color} rounded-2xl flex items-center justify-center text-white font-bold shadow-inner`}>
                            {user.name[0]}
                          </div>
                          <div>
                            <p className="text-sm! font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{user.name}</p>
                            <p className="text-xs! text-slate-500 mt-0.5!">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3!">
                            <span className="text-[10px]! bg-white border border-slate-200 px-3! py-1! rounded-lg text-slate-600 font-black uppercase">{user.role}</span>
                            <button className="text-slate-400 hover:text-red-500 p-1! transition-colors">
                                <ShieldCheck size={18} />
                            </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-12! pt-8! border-t border-slate-100 flex! justify-end! gap-4!">
                <button className="px-8! py-3! text-slate-500 font-bold text-sm! hover:text-slate-800 transition-all">
                  لغو تغییرات
                </button>
                <button className="flex items-center gap-2! px-10! py-3! bg-indigo-600 text-white rounded-2xl text-sm! font-black hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 active:scale-[0.98]">
                  <Save size={18} />
                  بروزرسانی تنظیمات
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;