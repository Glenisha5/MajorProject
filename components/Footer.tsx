"use client"

import React, { useEffect, useState } from "react"
import { Facebook, Instagram, Linkedin, X } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Footer() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // while not mounted, assume light theme to avoid hydration mismatch
  const isDark = mounted ? resolvedTheme === "dark" : false

  const containerClasses = isDark
    ? "w-full bg-black text-gray-300 border-t border-white/10 pt-10 pb-6"
    : "w-full bg-white text-gray-700 border-t border-black/10 pt-10 pb-6"

  const headingClass = isDark ? "font-semibold text-white mb-3" : "font-semibold text-gray-900 mb-3"
  const linkHoverClass = isDark ? "hover:text-white" : "hover:text-gray-900"
  // Use subtle white or black divider depending on theme
  const dividerClass = isDark ? "border-t border-white/10 my-6" : "border-t border-black/10 my-6"
  const copyrightClass = isDark ? "text-sm text-gray-400" : "text-sm text-gray-600"

  return (
    <footer className={containerClasses}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Policies */}
          <div>
            <h3 className={headingClass}>Policies</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className={linkHoverClass}>Privacy Policy</a></li>
              <li><a href="#" className={linkHoverClass}>Terms &amp; Conditions</a></li>
              <li><a href="#" className={linkHoverClass}>Refund Policy</a></li>
              <li><a href="#" className={linkHoverClass}>Copyright</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className={headingClass}>Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className={linkHoverClass}>FAQs</a></li>
              <li><a href="#" className={linkHoverClass}>Customer Support</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className={headingClass}>Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className={linkHoverClass}>About Us</a></li>
              <li><a href="#" className={linkHoverClass}>Contact Us</a></li>
            </ul>
          </div>

        </div>

        {/* Divider Line */}
        <div className={dividerClass}></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

         
          {/* Copyright */}
          <p className={copyrightClass}>
            © 2025 EasyConstruct, Inc. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="#" className={linkHoverClass}><Facebook size={22} /></a>
            <a href="#" className={linkHoverClass}><Instagram size={22} /></a>
            <a href="#" className={linkHoverClass}><X size={22} /></a>
            <a href="#" className={linkHoverClass}><Linkedin size={22} /></a>
          </div>

        </div>
      </div>
    </footer>
  );
}
