import { useParams, Link } from "react-router-dom";
import { ArrowRight, Printer, CheckCircle2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminOrderInvoice() {
  const { id } = useParams();
  
  // Mock order data based on ID since we don't have an API yet
  const order = {
    id: id || "1024",
    user: "أحمد محمد",
    email: "ahmed@example.com",
    course: "دليل البرمجة الشامل",
    date: "2024-03-24",
    amount: "150",
    status: "ناجح",
    paymentMethod: "بطاقة ائتمان (Visa)",
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeUp rtl pb-12">
      <SEO
        title={`فاتورة رقم #${order.id}`}
        description="عرض الفاتورة الخاصة بالطلب."
      />

      {/* Navigation & Header (Hidden when printing via print utility class in CSS if needed) */}
      <div className="flex items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-navy-soft/10">
            <Link to="/admin/orders">
              <ArrowRight className="w-5 h-5 text-navy-deep dark:text-white" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold font-heading text-navy-deep dark:text-white">تفاصيل الفاتورة</h1>
            <p className="text-sm text-muted-foreground">عرض الفاتورة بشكل مفصل للطباعة أو التنزيل</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-navy-soft/20 text-navy-deep dark:text-white dark:border-slate-700">
            <Download className="ml-2 w-4 h-4" />
            PDF تنزيل
          </Button>
          <Button onClick={handlePrint} className="bg-navy-deep hover:bg-navy-deep/90 text-white rounded-xl shadow-lg">
            <Printer className="ml-2 w-4 h-4" />
            طباعة الفاتورة
          </Button>
        </div>
      </div>

      {/* Invoice Card */}
      <Card className="border-none shadow-2xl shadow-navy-deep/5 rounded-3xl overflow-hidden bg-white max-w-4xl mx-auto dark:bg-slate-900 transition-colors py-8 px-6 md:px-12 print:shadow-none print:bg-white print:text-black">
        <CardContent className="p-0">
          
          {/* Invoice Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-navy-soft/10 pb-8 mb-8">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">
                د
              </div>
              <div>
                <h2 className="text-2xl font-bold text-navy-deep">منصة دليل</h2>
                <p className="text-sm text-muted-foreground">تعليم يواكب العصر</p>
              </div>
            </div>
            <div className="text-right">
              <h3 className="text-3xl font-bold text-navy-deep mb-2">فاتورة ضريبية</h3>
              <p className="text-muted-foreground font-semibold">رقم الفاتورة: <span className="text-navy-deep">#{order.id}</span></p>
              <p className="text-muted-foreground">تاريخ الإصدار: {order.date}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Billed To */}
            <div className="bg-navy-soft/5 rounded-2xl p-6 dark:bg-slate-800/50 print:bg-gray-50">
              <p className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider">العميل</p>
              <h4 className="text-xl font-bold text-navy-deep dark:text-white mb-1">{order.user}</h4>
              <p className="text-muted-foreground">{order.email}</p>
            </div>
            {/* Payment Details */}
            <div className="bg-navy-soft/5 rounded-2xl p-6 dark:bg-slate-800/50 print:bg-gray-50">
              <p className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider">تفاصيل الدفع</p>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">طريقة الدفع:</span>
                <span className="font-semibold text-navy-deep dark:text-white">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">حالة الدفع:</span>
                <span className="font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  مدفوع بالكامل
                </span>
              </div>
            </div>
          </div>

          {/* Table of items */}
          <div className="mb-12">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b-2 border-navy-deep text-navy-deep dark:text-white dark:border-white/20 print:border-black">
                  <th className="py-4 px-2 font-bold w-2/3">الوصف (اسم الكورس)</th>
                  <th className="py-4 px-2 font-bold w-1/3 text-center">المبلغ</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-navy-soft/10 dark:border-slate-800 print:border-gray-200">
                  <td className="py-6 px-2 font-semibold text-navy-deep dark:text-white/90">{order.course}</td>
                  <td className="py-6 px-2 font-bold text-navy-deep dark:text-white text-center text-lg">{order.amount} ج.م</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-16">
            <div className="w-full md:w-1/2 space-y-4">
              <div className="flex justify-between text-muted-foreground">
                <span>المبلغ الإجمالي</span>
                <span>{order.amount} ج.م</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>الضريبة المضافة (0%)</span>
                <span>0 ج.م</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t border-navy-soft/20 pt-4 text-navy-deep dark:text-white dark:border-slate-700 print:border-black">
                <span>الإجمالي المستحق</span>
                <span className="text-primary">{order.amount} ج.م</span>
              </div>
            </div>
          </div>

          {/* Footer message */}
          <div className="text-center pt-8 border-t border-navy-soft/10 dark:border-slate-800">
            <p className="text-lg font-bold text-navy-deep dark:text-white mb-2">شكراً لثقتك في منصة دليل!</p>
            <p className="text-sm text-muted-foreground">إذا كان لديك أي استفسار بخصوص هذه الفاتورة، يرجى التواصل معنا عبر support@daleel.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
