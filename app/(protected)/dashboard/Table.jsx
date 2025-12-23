import React from "react";
import { Tabs } from "@/components/ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import DashboardTable from "./DashboardTable";
import TimelineForm from "./TimeLineForm";

export default function Table() {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <Tabs defaultValue="products" className="w-full">
          <div className="border-b border-gray-200 px-6">
            <TabsList className="flex space-x-2">
              <TabsTrigger 
                value="products"
                className="relative px-6 py-3 text-sm font-medium transition-all duration-200
                  data-[state=active]:text-blue-600 data-[state=active]:border-b-2 
                  data-[state=active]:border-blue-600 data-[state=active]:font-semibold
                  text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-t-lg
                  data-[state=active]:bg-blue-50/50
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <span>Products</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="timeline"
                className="relative px-6 py-3 text-sm font-medium transition-all duration-200
                  data-[state=active]:text-blue-600 data-[state=active]:border-b-2 
                  data-[state=active]:border-blue-600 data-[state=active]:font-semibold
                  text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-t-lg
                  data-[state=active]:bg-blue-50/50
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Timeline</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent 
              value="products" 
              className="mt-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg"
            >
              <div className="animate-in fade-in duration-300">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Products Dashboard</h2>
                  <p className="text-gray-600 text-sm mt-1">Manage and monitor your product inventory</p>
                </div>
                <DashboardTable />
              </div>
            </TabsContent>

            <TabsContent 
              value="timeline" 
              className="mt-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg"
            >
              <div className="animate-in fade-in duration-300">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Timeline Configuration</h2>
                  <p className="text-gray-600 text-sm mt-1">Create and manage your project timelines</p>
                </div>
                <TimelineForm />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}