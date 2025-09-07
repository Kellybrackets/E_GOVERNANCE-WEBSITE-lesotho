"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomepageTest() {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple Navigation */}
      <nav className="bg-white shadow-md border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#002F6C] to-[#007849] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <h1 className="text-xl font-bold text-[#002F6C]">Government of Lesotho</h1>
            </div>
            <div className="flex space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="text-[#002F6C]">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-[#007849] text-white">Register</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Simple Hero */}
      <section className="bg-gradient-to-br from-[#002F6C] to-[#007849] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Government of Lesotho</h1>
          <p className="text-xl mb-8">Digital Services Portal</p>
          <Button className="bg-white text-[#002F6C] px-8 py-3">
            Get Started
          </Button>
        </div>
      </section>

      {/* Simple Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#002F6C] mb-4">Our Services</h2>
            <p className="text-gray-600">Access government services online</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <h3 className="text-xl font-bold mb-4">Identity Services</h3>
              <p className="text-gray-600">Apply for ID, passport, and more</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <h3 className="text-xl font-bold mb-4">Health Services</h3>
              <p className="text-gray-600">Access health records and services</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <h3 className="text-xl font-bold mb-4">Education</h3>
              <p className="text-gray-600">School records and certificates</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}