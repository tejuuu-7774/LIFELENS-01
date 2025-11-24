import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import JournalsList from "./pages/JournalsList";
import AddJournal from "./pages/AddJournal";
import ViewJournal from "./pages/ViewJournal";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/journals"
        element={
          <ProtectedRoute>
            <JournalsList />
          </ProtectedRoute>
        }
      />
      
      <Route
          path="/journals/add"
          element={
            <ProtectedRoute>
              <AddJournal />
            </ProtectedRoute>
          }
        />

      <Route 
          path="/journals/:id" 
          element={
            <ProtectedRoute>
              <ViewJournal />
            </ProtectedRoute>
          } 
      />
    </Routes>
  );
}

export default App;
