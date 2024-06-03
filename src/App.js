// routes
import Router from "./routes";
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';

function App() {

  window.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  return (
    <ThemeProvider>
      {/* <ThemeSettings>
        {" "}
        <Router />{" "}
      </ThemeSettings> */}
      <Router />
      
    </ThemeProvider>
  );
}

export default App;
