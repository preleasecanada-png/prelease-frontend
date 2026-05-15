import { React, useContext, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "@/styles/template.css";
import "@/styles/globals.css";
import "@/styles/responsive.css";
import "@/styles/enhanced-ui.css";
import "@/styles/animations.css";
import "@/styles/modern-ui.css";
import { Urbanist } from 'next/font/google';
import Footer from '@/component/Footer';
import Header from '@/component/Header';
import SEO from '@/component/SEO';
import ContextApiState from '@/ContextApi/ContextApiState';
import ChatProvider from '@/ContextApi/ChatContext';
import { PagesProgressBar as ProgressBar, useRouter } from 'next-nprogress-bar';
import { usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthGuard from '@/component/AuthGuard';
import FloatingChatWidget from '@/component/FloatingChatWidget';
import AIAssistantWidget from '@/component/AIAssistantWidget';
import OnboardingGuide from '@/component/OnboardingGuide';
const urbanist = Urbanist({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})
function App({ Component, pageProps }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  useEffect(() => {
    const email = window.localStorage.getItem('email');
    const token = window.localStorage.getItem('token');
    // Only refresh token if user is logged in (has email + token)
    if (!email || !token) return;
    try {
      const formData = new FormData();
      formData.append('email', email);
      fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/token-save`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.user?.verify_status === 1) {
            window?.localStorage?.setItem('token', data?.token);
            window?.localStorage?.setItem('role', data?.user?.role);
            window?.localStorage?.setItem('user_picture', data?.user?.picture || '');
            window?.localStorage?.setItem('user_name', data?.user?.first_name || '');
            window.dispatchEvent(new Event('login'));
          }
        })
        .catch((err) => {
          console.error('Token refresh error:', err);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
    <AuthGuard>
      <SEO />
      <ProgressBar
        height="5px"
        color="#D80621"
        options={{ showSpinner: false }}
        shallowRouting />
      <main className={`${urbanist.className}`}>
        <ContextApiState>
          <ChatProvider>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID}>
          {pathname !== '/properties' ? <Header isScrolled={isScrolled} /> : ''}
          {/* <Header isScrolled={isScrolled} />  */}
          <div className={pathname !== '/' && pathname !== '/properties' && pathname !== '/login' && pathname !== '/sign-up' && pathname !== '/forget-password' && pathname !== '/reset-password' && pathname !== '/verification' ? 'page-content-offset' : ''}>
            <Component {...pageProps} isScrolled={isScrolled} />
          </div>
          {pathname !== '/properties' && pathname !== '/chats' ? <Footer /> : ''}
            </GoogleOAuthProvider>

          {pathname !== '/properties' && <FloatingChatWidget />}
          {pathname !== '/properties' && <AIAssistantWidget />}
          {pathname !== '/properties' && <OnboardingGuide />}
          </ChatProvider>
        </ContextApiState>
        <Toaster position="bottom-center" />
      </main>
      </AuthGuard>

    </>
  )
}
export default App;