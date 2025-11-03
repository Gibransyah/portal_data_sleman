"use client";

import { ContactInfo, DashboardLink, SocialMedia } from "@/types";
import {
  MapPin,
  Phone,
  Mail,
  LayoutDashboard,
  Database,
  Users,
} from "lucide-react";

interface FooterProps {
  contactInfo?: ContactInfo;
  dashboardLinks?: DashboardLink[];
  socialMedia?: SocialMedia;
}

export default function Footer({
  contactInfo,
  dashboardLinks,
  socialMedia,
}: FooterProps) {
  const defaultContact: ContactInfo = {
    address: "Sleman, Daerah Istimewa Yogyakarta",
    addressDetail:
      "Jalan Parasamya, Beran, Tridadi, Sleman, Daerah Istimewa Yogyakarta, Kode Pos 55511.",
    phone: "(0274) 868405",
    email: "pemdasleman@slemankab.go.id",
  };

  const defaultDashboardLinks: DashboardLink[] = [
    {
      title: "Dashboard Sleman",
      items: ["Tentang", "Eksplorasi Data", "Executive Dashboard"],
    },
    {
      title: "Ekosistem Data Sleman",
      items: ["Open Data Sleman", "Satu Data Sleman", "Satu Peta Sleman"],
    },
  ];

  const defaultSocial: SocialMedia = {
    linkedin: "#",
    instagram: "#",
    youtube: "#",
  };

  const contact = contactInfo || defaultContact;
  const dashboard = dashboardLinks || defaultDashboardLinks;
  const social = socialMedia || defaultSocial;

  return (
    <footer
      className="
        w-full 
        bg-blue-800 text-white 
        dark:bg-blue-950 dark:text-blue-100
        border-t border-blue-700 dark:border-blue-900
        transition-colors duration-500
        mt-16
      "
    >
      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* LOGO */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 bg-white text-blue-700 dark:bg-blue-500 dark:text-white rounded-full flex items-center justify-center text-lg font-bold shadow-sm">
                ▲
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-semibold text-sm tracking-wide">
                  DASHBOARD
                </span>
                <span className="font-bold text-xl">SLEMAN</span>
              </div>
            </div>
            <p className="text-sm text-blue-100/90 dark:text-blue-300">
              Pusat data dan informasi Kabupaten Sleman untuk kebijakan berbasis
              data dan transparansi publik.
            </p>
          </div>

          {/* KONTAK */}
          <div>
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="w-5 h-5 mt-1 text-blue-200 dark:text-blue-400" />
              <div>
                <h4 className="font-bold">Alamat</h4>
                <p className="text-sm text-blue-100/90 dark:text-blue-300 mt-1">
                  {contact.addressDetail}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 mb-4">
              <Phone className="w-5 h-5 mt-1 text-blue-200 dark:text-blue-400" />
              <div>
                <h4 className="font-bold">Telepon</h4>
                <p className="text-sm text-blue-100/90 dark:text-blue-300 mt-1">
                  {contact.phone}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 mt-1 text-blue-200 dark:text-blue-400" />
              <div>
                <h4 className="font-bold">Email</h4>
                <p className="text-sm text-blue-100/90 dark:text-blue-300 mt-1">
                  {contact.email}
                </p>
              </div>
            </div>
          </div>

          {/* LINK DASHBOARD */}
          <div className="space-y-6">
            {dashboard.map((section, index) => (
              <div key={index}>
                <div className="flex items-center gap-2 mb-3">
                  {section.title === "Dashboard Sleman" ? (
                    <LayoutDashboard className="w-5 h-5 text-blue-200 dark:text-blue-400" />
                  ) : (
                    <Database className="w-5 h-5 text-blue-200 dark:text-blue-400" />
                  )}
                  <h4 className="font-bold">{section.title}</h4>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-sm text-blue-100/90 dark:text-blue-300 hover:text-blue-200 dark:hover:text-blue-400 transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* SOSIAL MEDIA */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-blue-200 dark:text-blue-400" />
              <h4 className="font-bold">Ikuti Kami</h4>
            </div>
            <div className="flex gap-3">
              {/* LinkedIn */}
              <a
                href={social.linkedin}
                className="w-10 h-10 bg-white/20 dark:bg-blue-900 rounded-lg flex items-center justify-center hover:bg-white/30 dark:hover:bg-blue-800 transition-colors"
              >
                <span className="text-xs font-bold text-white dark:text-blue-300">
                  in
                </span>
              </a>

              {/* Instagram */}
              <a
                href={social.instagram}
                className="w-10 h-10 bg-white/20 dark:bg-blue-900 rounded-lg flex items-center justify-center hover:bg-white/30 dark:hover:bg-blue-800 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-white dark:text-blue-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href={social.youtube}
                className="w-10 h-10 bg-white/20 dark:bg-blue-900 rounded-lg flex items-center justify-center hover:bg-white/30 dark:hover:bg-blue-800 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-white dark:text-blue-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-blue-700 dark:border-blue-900 py-4">
        <p className="text-center text-xs md:text-sm text-blue-100/90 dark:text-blue-400">
          © 2025 Pemerintah Kabupaten Sleman — Semua Hak Dilindungi.
        </p>
      </div>
    </footer>
  );
}
