import { Link } from "react-router-dom";

// ✅ استيراد الأيقونات بشكل منفصل لتقليل الباندل
import Phone from "lucide-react/dist/esm/icons/phone";
import Mail from "lucide-react/dist/esm/icons/mail";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import logo from "../../../public/logoFina2.webp";

const footerLinks = [
  {
    title: "روابط سريعة",
    links: [
      { label: "الرئيسية", path: "/" },
      { label: "من نحن", path: "/about" },
      { label: "الكورسات", path: "/courses" },
      // { label: "المتجر", path: "/store" },
    ],
  },
  {
    title: "خدماتنا",
    links: [
      { label: "المنح الدراسية", path: "/scholarships" },
      // { label: "الأجهزة المساعدة", path: "/store" },
      { label: "الكورسات التعليمية", path: "/courses" },
      { label: "تواصل معنا", path: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="gradient-navy text-primary-foreground"
      role="contentinfo"
    >
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-heading font-bold mb-4"
            >
              {/* Logo */}
              <Link to="/" aria-label="دليل - الصفحة الرئيسية">
                <img
                  src={logo}
                  alt="دليل الشعار"
                  className="h-12 w-12"
                  loading="lazy"
                />
              </Link>
              <span>دليل</span>
            </Link>

            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              منصة شاملة لدعم وتمكين ذوي الإعاقة من خلال التعليم والتكنولوجيا
              والخدمات المتكاملة.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.facebook.com/profile.php?id=61556817412722"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-sm"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </a>
              <a
                href="https://www.instagram.com/daleel2345?igsh=MXJtcm8yeTFocml1Zg=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-sm"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.008 3.81.056 1 .046 1.72.21 2.394.473a4.903 4.903 0 011.83 1.192 4.902 4.902 0 011.191 1.83c.263.674.428 1.393.472 2.393.048 1.066.056 1.42.056 3.81s-.008 2.784-.056 3.81c-.046 1-.21 1.72-.472 2.394a4.904 4.904 0 01-1.191 1.83 4.903 4.903 0 01-1.83 1.191c-.674.263-1.393.428-2.393.472-1.066.048-1.42.056-3.81.056s-2.784-.008-3.81-.056c-1-.046-1.72-.21-2.394-.472a4.904 4.904 0 01-1.83-1.191 4.903 4.903 0 01-1.192-1.83c-.263-.674-.428-1.393-.472-2.393C2.008 14.784 2 14.43 2 12s.008-2.784.056-3.81c.046-1 .21-1.72.472-2.394a4.903 4.903 0 011.192-1.83 4.902 4.902 0 011.83-1.191c.674-.263 1.393-.428 2.393-.472C9.53 2.008 9.884 2 12.315 2zm0 2.22c-2.484 0-2.82.009-3.774.053-.94.043-1.472.2-1.812.332a2.68 2.68 0 00-.99 0 2.68 2.68 0 00-.992.645 2.68 2.68 0 00-.645.992c-.131.34-.29.872-.332 1.812-.044.954-.053 1.29-.053 3.774s.009 2.82.053 3.774c.043.94.2 1.472.332 1.812.16.415.385.768.645 1.028a2.68 2.68 0 001.028.645c.34.131.872.29 1.812.332.954.044 1.29.053 3.774.053s2.82-.009 3.774-.053c.94-.043 1.472-.2 1.812-.332a2.682 2.682 0 001.028-.645 2.68 2.68 0 00.645-1.028c.131-.34.29-.872.332-1.812.044-.954.053-1.29.053-3.774s-.009-2.82-.053-3.774c-.043-.94-.2-1.472-.332-1.812a2.68 2.68 0 00-.645-1.028 2.68 2.68 0 00-1.028-.645c-.34-.131-.872-.29-1.812-.332-.954-.044-1.29-.053-3.774-.053zm0 3.78a4.22 4.22 0 100 8.44 4.22 4.22 0 000-8.44zm0 6.22a2 2 0 110-4 2 2 0 010 4zm4.845-7.782a1.04 1.04 0 100 2.08 1.04 1.04 0 000-2.08z" clipRule="evenodd" /></svg>
              </a>
              <a
                href="https://www.linkedin.com/company/daleel-institution/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAb21jcAS45BxleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAaeA2pGpCEEknlEdWIqIF85wswwBLc1o9dnJje0RuPpea_CPCMYfxIZVxV0bGw_aem_nPHp6dODAYBFrEvxXXbaPg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-sm"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
              </a>
              <a
                href="https://www.tiktok.com/@daleel.institution?lang=en&is_from_webapp=1&sender_device=mobile&sender_web_id=7659502391734306321"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-sm"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.525.02c1.31 0 2.57.17 3.77.49V4.6a6.83 6.83 0 01-3.69-.99v9.06a5.55 5.55 0 11-5.55-5.55c.34 0 .68.03 1.02.09V11.3a3.46 3.46 0 101.44 2.87V0h3.01zm6.06 6.06c-.63 0-1.25-.13-1.83-.37V3.88c.55.22 1.14.33 1.83.33v1.87z" /></svg>
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-heading font-bold text-lg mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-primary-foreground/70 hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">تواصل معنا</h3>

            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm  text-primary-foreground/70">
                <Phone
                  className="w-4 h-4 text-primary flex-shrink-0"
                  aria-hidden="true"
                />
                <a
                  href="https://wa.me/201155845125"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                  dir="ltr"
                >
                  01155845125
                </a>
              </li>

              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Mail
                  className="w-4 h-4 text-primary flex-shrink-0"
                  aria-hidden="true"
                />
                <span>hr@daleelpwd.com</span>
              </li>

              <li className="flex items-center gap-3 text-sm  text-primary-foreground/70">
                <MapPin
                  className="w-4 h-4 text-primary flex-shrink-0"
                  aria-hidden="true"
                />
                <span> القاهرة </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-sm text-white/50">
          <p>© {new Date().getFullYear()} دليل. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
