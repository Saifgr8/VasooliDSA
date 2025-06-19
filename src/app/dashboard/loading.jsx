// app/dashboard/loading.js
export default function Loading() {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-500"></div>
        <p className="ml-4 text-xl">Loading dashboard...</p>
      </div>
    );
  }