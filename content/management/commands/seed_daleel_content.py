from django.core.management.base import BaseCommand
from content.models import Scholarship, Company, TeamMember
from courses.models import Category, Course, CourseDetail


class Command(BaseCommand):
    help = "Seed Daleel's initial courses, course details, scholarships, companies and team members."

    def handle(self, *args, **options):
        categories = {
            "كورسات للتأهيل المهني": Category.objects.get_or_create(name="كورسات للتأهيل المهني")[0],
            "كورسات للتأهيل النفسي": Category.objects.get_or_create(name="كورسات للتأهيل النفسي")[0],
            "كورسات للأطفال": Category.objects.get_or_create(name="كورسات للأطفال")[0],
        }

        courses = [
            (1, "كورس خدمة العملاء", "كورسات للتأهيل المهني", "مبتدئ", "شهرين", "1000", 120, "م.فادي شحاتة"),
            (2, "كورس اللغة الانجليزية", "كورسات للتأهيل المهني", "متوسط", "شهرين", "1000", 150, "م.فاطمة احمد"),
            (3, "كورس ICDL", "كورسات للتأهيل المهني", "متوسط", "شهرين", "1000", 90, "م.فادي شحاتة"),
            (4, "كورس البرمجة", "كورسات للتأهيل المهني", "مبتدئ", "شهرين", "1000", 80, "م.عبد الرحمن محمد"),
            (5, "كورس تعديل السلوك", "كورسات للتأهيل النفسي", "متوسط", "45 دقيقة", "100", 20, "د.ايمان حمدي"),
            (6, "كورس التخاطب", "كورسات للتأهيل النفسي", "متوسط", "45 دقيقة", "100", 50, "د.عبدالرازق السيد"),
            (7, "كورس صعوبات التعلم", "كورسات للتأهيل النفسي", "متقدم", "45 دقيقة", "100", 30, "د.إيمان حمدي"),
            (8, "كورس تنمية المهارات", "كورسات للتأهيل النفسي", "مبتدئ", "45 دقيقة", "100", 100, "د.إيمان حمدي"),
        ]
        details = {
            1: {
                "description": "دورة متخصصة لتمكين ذوي الهمم من التميز في مجال خدمة العملاء، مع التركيز على مهارات التواصل الشامل واستخدام التقنيات المساعدة في بيئة العمل.",
                "content": ["مقدمة في خدمة العملاء الشاملة", "فهم احتياجات العملاء المتنوعة", "مهارات التواصل", "استخدام أدوات التكنولوجيا المساعدة", "حل المشكلات", "تطبيقات عملية"],
                "requirements": ["الرغبة في التطوير المهني", "مهارات تواصل أساسية"],
                "audience": ["ذوي الهمم الباحثين عن فرص عمل", "الراغبين في تطوير مهاراتهم المهنية", "المقبلين على الاندماج في سوق العمل"],
            },
            5: {"description": "برنامج تدريبي متخصص في تعديل السلوك يقدم بصورة عملية ومبسطة.", "content": [], "requirements": [], "audience": []},
        }
        for pk, title, category, level, duration, price, students, instructor in courses:
            course, created = Course.objects.get_or_create(id=pk, defaults={
                "title": title, "category": categories[category], "level": level, "duration": duration,
                "price": price, "students": students, "instructor": instructor,
            })
            if not created:
                course.category = categories[category]
                course.save(update_fields=["category"])
            if pk in details:
                CourseDetail.objects.update_or_create(course=course, defaults=details[pk])

        scholarships = [
            ("منحة التميز الأكاديمي", "وزارة التعليم", "2026-06-30", "المملكة العربية السعودية", ["معدل تراكمي 3.5 فأعلى", "شهادة إعاقة معتمدة", "خطاب توصية"], "منحة دراسية كاملة للطلاب ذوي الإعاقة المتفوقين أكاديمياً لدراسة البكالوريوس في الجامعات السعودية."),
            ("منحة التكنولوجيا المساعدة", "شركة تقنية", "2026-05-15", "عن بُعد", ["اهتمام بمجال التقنية", "مهارات أساسية في الحاسب", "مقال شخصي"], "منحة لدراسة تطوير التكنولوجيا المساعدة وتطبيقات إمكانية الوصول."),
            ("منحة الفنون والإبداع", "مؤسسة الفنون", "2026-08-01", "الرياض", ["ملف أعمال فنية", "رسالة تحفيز", "شهادة إعاقة"], "منحة لدعم المبدعين من ذوي الإعاقة في مجالات الفنون البصرية والتصميم."),
        ]
        for title, org, deadline, location, requirements, description in scholarships:
            Scholarship.objects.get_or_create(title=title, defaults={"organization": org, "deadline": deadline, "location": location, "requirements": requirements, "description": description})

        companies = [
            ("Amazon Egypt", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200", "https://www.amazon.eg", "التجارة الإلكترونية", "مدينة نصر، القاهرة", "+٥٠٠٠ موظف", "الشركة الأكبر عالمياً في التجارة الإلكترونية والحوسبة السحابية.", "أمازون مصر تسعى لتكون الشركة الأكثر اهتماماً بالعملاء في العالم. نحن نوفر بيئة عمل شاملة تدعم التنوع والابتكار.", "www.amazon.eg"),
            ("Vodafone", "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200", "https://www.vodafone.com.eg", "الاتصالات", "القرية الذكية، الجيزة", "+١٠٠٠٠ موظف", "الشركة الرائدة في مجال الاتصالات والخدمات الرقمية.", "فودافون مصر هي المشغل رقم ١ للمحمول في مصر وتلتزم بخلق بيئة عمل ميسرة.", "www.vodafone.com.eg"),
            ("Talabat", "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1200", "https://www.talabat.com", "خدمات التوصيل", "المعادي، القاهرة", "+٢٠٠٠ موظف", "المنصة الرائدة لطلب الطعام والبقالة عبر الإنترنت.", "طلبات هي منصة التوصيل الأسرع نمواً في الشرق الأوسط وتؤمن بقوة الشمول.", "www.talabat.com"),
            ("Raya Holding", "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200", "https://www.rayaholding.com", "الاستثمار والتكنولوجيا", "مدينة ٦ أكتوبر", "+١٢٠٠٠ موظف", "مجموعة استثمارية رائدة تدير محفظة متنوعة من الشركات.", "راية القابضة تعمل في التكنولوجيا ومراكز الاتصال والخدمات المالية وتولي اهتماماً خاصاً بدمج ذوي الهمم.", "www.rayaholding.com"),
            ("Aman", "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200", "https://www.aman.eg", "الخدمات المالية", "التل الكبير، الإسماعيلية", "+٣٠٠٠ موظف", "الشركة الأكبر في مجال الخدمات المالية غير المصرفية.", "أمان للمدفوعات الإلكترونية والخدمات المالية تهدف إلى تعزيز الشمول المالي.", "www.aman.eg"),
            ("Americana", "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200", "https://www.americana-food.com", "الأغذية والمطاعم", "الإسماعيلية", "+٢٠٠٠٠ موظف", "الشركة الرائدة في مجال الصناعات الغذائية والمطاعم.", "أمريكانا من أكبر الشركات في المنطقة وتدعم التوظيف الشامل.", "www.americana-foods.com"),
            ("IBS", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200", "https://www.ibs-egypt.com", "الاستشارات والتقنية", "مدينة نصر، القاهرة", "+٥٠٠ موظف", "حلول تقنية متطورة وخدمات إدارية متكاملة.", "IBS متخصصة في الاستشارات الإدارية والحلول التقنية للشركات الكبرى.", "www.ibs-egypt.com"),
            ("Sunway", "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=1200", "https://www.sunway.eg", "اللوجستيات", "بورسعيد، مصر", "+١٠٠٠ موظف", "خدمات لوجستية وسلاسل إمداد عالمية.", "صن واي لوجستيكس توفر حلولاً مبتكرة في النقل والتخزين وتدعم الكوادر الطموحة.", "www.sunway.eg"),
        ]
        for name, banner, website_url, industry, location, team_size, short_description, description, website in companies:
            Company.objects.get_or_create(name=name, defaults={"banner": banner, "website": website_url or website, "industry": industry, "location": location, "team_size": team_size, "short_description": short_description, "description": description})

        team = [
            ("إيمان أحمد", "CEO & Founder", "Eman.webp", "" , 1),
            ("أحمد حسين", "Consultant", "Ahmed.webp", "", 2),
            ("إبراهيم جمال", "Voice over", "Ibrahim.webp", "", 3),
            ("محمد حسام", "Technical", "Mohamed.webp", "", 4),
            ("مصطفى سيد", "Technical", "Mostafa.webp", "", 5),
            ("آيات وسيم", "HR Generalist", "Ayat.webp", "object-[center_5%]", 6),
            ("د. عبدالرازق السيد", "Speech Therapist", "AbdelRazk.webp", "", 7),
            ("د. إيمان حمدي", "SEN Specialist", "EmanHamdy2.jpeg", "object-[center_15%]", 8),
            ("أ. فاطمة أحمد", "English Instructor", "Fatma .jpeg", "object-[center_35%]", 9),
        ]
        for name, role, filename, position, order in team:
            TeamMember.objects.get_or_create(name=name, role=role, defaults={"image": f"/media/team/{filename}", "position": position, "sort_order": order})

        self.stdout.write(self.style.SUCCESS("Daleel content seeded successfully."))
