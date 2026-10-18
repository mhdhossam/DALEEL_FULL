import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Company, UploadState } from "../types";
import { useApplicationsStore } from "../store/useApplicationsStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, CheckCircle2, AlertCircle, X, Loader2, Building2 } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
  email: z.string().email("بريد إلكتروني غير صالح"),
  phone: z.string().min(10, "رقم الهاتف غير صالح"),
});

interface ApplyModalProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ company, isOpen, onClose }) => {
  const { submitApplication } = useApplicationsStore();
  const [uploadState, setUploadState] = useState<UploadState>({
    status: "idle",
    progress: 0,
    file: null,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf" && file.type !== "application/msword" && file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        toast.error("يرجى رفع ملف PDF أو Word فقط");
        return;
      }
      setUploadState({ status: "idle", progress: 0, file });
    }
  };

  const simulateUpload = async () => {
    if (!uploadState.file) return;
    setUploadState(prev => ({ ...prev, status: "uploading", progress: 0 }));
    for (let p = 0; p <= 100; p += 10) {
      await new Promise(r => setTimeout(r, 150));
      setUploadState(prev => ({ ...prev, progress: p }));
    }
    setUploadState(prev => ({ ...prev, status: "success", progress: 100 }));
    return true;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!company) return;
    if (!uploadState.file) {
      toast.error("يرجى رفع السيرة الذاتية أولاً");
      return;
    }

    if (uploadState.status !== "success") {
      const success = await simulateUpload();
      if (!success) return;
    }

    try {
      await submitApplication({
        companyId: company.id,
        companyName: company.name,
        applicantName: values.name,
        applicantEmail: values.email,
        applicantPhone: values.phone,
        cvUrl: uploadState.file.name,
      });

      toast.success("تم إرسال طلبك بنجاح!");
      onClose();
      form.reset();
      setUploadState({ status: "idle", progress: 0, file: null });
    } catch (err: any) {
      toast.error("فشل إرسال الطلب");
    }
  };

  if (!company) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] gap-6 overflow-hidden">
        <DialogHeader className="relative pb-4">
          <div className="flex items-center gap-4 text-right">
            <div className="p-2 bg-muted/30 rounded-2xl border border-border">
                <img src={company.logo} alt={company.name} className="w-12 h-12 object-contain" />
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-2xl font-black text-navy dark:text-foreground">طلب انضمام</DialogTitle>
              <DialogDescription className="text-sm">
                تقديم طلب توظيف لدى شركة <span className="font-bold text-primary">{company.name}</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="text-right">
                    <FormLabel className="font-bold">الاسم الكامل</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل اسمك" className="bg-muted/30 border-none h-11 rounded-xl focus-visible:ring-primary/20" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="text-right">
                    <FormLabel className="font-bold">رقم الهاتف</FormLabel>
                    <FormControl>
                      <Input placeholder="01XXXXXXXXX" className="bg-muted/30 border-none h-11 rounded-xl focus-visible:ring-primary/20" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="text-right">
                  <FormLabel className="font-bold">البريد الإلكتروني</FormLabel>
                  <FormControl>
                    <Input placeholder="example@mail.com" className="bg-muted/30 border-none h-11 rounded-xl focus-visible:ring-primary/20" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2 text-right">
              <Label className="font-bold">السيرة الذاتية (PDF / Word)</Label>
              <div
                className={`relative border-2 border-dashed rounded-2xl p-8 transition-all cursor-pointer overflow-hidden text-center ${
                  uploadState.status === "error" 
                  ? "border-destructive/50 bg-destructive/5" 
                  : uploadState.status === "success"
                  ? "border-green-500/50 bg-green-500/5"
                  : "border-border hover:border-primary/50 hover:bg-primary/5"
                }`}
                onClick={() => document.getElementById("cv-upload")?.click()}
              >
                <input
                  id="cv-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                />

                <AnimatePresence mode="wait">
                  {uploadState.status === "idle" && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center gap-3 text-muted-foreground"
                    >
                      <div className="p-3 bg-muted/50 rounded-full">
                        <Upload className="w-6 h-6" />
                      </div>
                      {uploadState.file ? (
                        <div className="flex items-center gap-2 text-foreground font-bold">
                          <FileText className="w-5 h-5 text-primary" />
                          {uploadState.file.name}
                        </div>
                      ) : (
                        <div className="space-y-1">
                            <p className="text-sm font-bold text-foreground">اضغط لرفع الملف</p>
                            <p className="text-xs">يجب ألا يتجاوز حجم الملف 5 ميجابايت</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                  {uploadState.status === "uploading" && (
                    <motion.div key="uploading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 w-full">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="flex items-center gap-2 animate-pulse">جاري الرفع...</span>
                        <span>{uploadState.progress}%</span>
                      </div>
                      <Progress value={uploadState.progress} className="h-2 rounded-full" />
                    </motion.div>
                  )}
                  {uploadState.status === "success" && (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-2 text-green-600">
                      <CheckCircle2 className="w-10 h-10" />
                      <span className="text-sm font-black">جاهز للإرسال!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {uploadState.file && uploadState.status !== "uploading" && (
                  <button className="absolute top-3 left-3 p-1.5 rounded-full bg-background hover:bg-muted shadow-sm hover:text-destructive transition-all" onClick={(e) => { e.stopPropagation(); setUploadState({ status: "idle", progress: 0, file: null }); }}>
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <DialogFooter className="pt-6 sm:justify-start gap-3">
               <Button type="submit" className="w-full h-12 text-base font-black bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20" disabled={form.formState.isSubmitting || uploadState.status === "uploading"}>
                {form.formState.isSubmitting ? (
                    <> <Loader2 className="w-5 h-5 animate-spin ml-2" /> جاري الإرسال... </>
                ) : (
                    "إرسال طلب الانضمام"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyModal;
