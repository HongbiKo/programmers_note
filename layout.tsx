// Layout.tsx
import Footer from '../common/Footer';
import Header from '../common/Header';

interface LayoutProps {
  children: React.ReactNode; // 리액트로 만든 모든 컴포넌트들이 배치될 수 있다
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout


// App.tsx

import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ThemeSwitcher from './components/header/ThemeSwitcher'; 
import { BookStoreThemeProvider } from './context/themeContext';

function App() {
  
  return(
    <BookStoreThemeProvider>
        <ThemeSwitcher />
        <Layout>
          <Home />
        </Layout>
    </BookStoreThemeProvider>

    /** 2번 방법
    <Layout children={<Home />} />  
     */
  );
}

export default App;
