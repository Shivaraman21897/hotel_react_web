import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy load all pages/components
const Layout = lazy(() => import("./components/Layout"));
const BookingForm = lazy(() => import("./components/BookingForm"));
const BookingSummaryPage = lazy(() => import("./pages/BookingSummaryPage"));

function App() {
  return (
    <Router>
      {/* <Container sx={{ py: 4}}> */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<BookingForm />} />
          </Route>
          <Route path="summary" element={<BookingSummaryPage />} />
        </Routes>
      </Suspense>
      {/* </Container> */}
    </Router>
  );
}

export default App;
