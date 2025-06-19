import { Suspense } from "react";

export default function DashboardLayout({ children }) {
  return (
    <Suspense>
      {" "}
      {/* No fallback prop here, as loading.js handles it */}
      {children}
    </Suspense>
  );
}
