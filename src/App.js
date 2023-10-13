import "./App.css";
import "animate.css";
import { AuthProvider } from "./utilities/AuthContext";
import AppContent from "./components/AuthContent/AppContent";

function App() {
  // Ensure that the AuthProvider wraps the entire component hierarchy
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}


export default App;
