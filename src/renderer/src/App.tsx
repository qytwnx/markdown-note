import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import PageLoading from '@renderer/components/page-loading';
import Header from '@renderer/components/header';
import { useAppStore } from '@renderer/store';
import Footer from '@renderer/components/footer';
import { MantineProvider } from '@mantine/core';
import { ContextMenuProvider } from 'mantine-contextmenu';
import '@mantine/core/styles.layer.css';
import 'mantine-contextmenu/styles.layer.css';

const App = (): JSX.Element => {
  const [isDark, setIsDark] = useAppStore((state) => [
    state.isDark,
    state.setIsDark
  ]);

  const handleLoadThemeDarkStatus = async () => {
    if (isDark !== undefined) {
      window.api.themeDarkToggle(isDark ? 'dark' : 'light');
      return;
    }
    const status = await window.api.themeDarkStatus();
    setIsDark(status);
  };

  useEffect(() => {
    handleLoadThemeDarkStatus();
  }, []);

  return (
    <>
      <div className="w-full h-full">
        <Header />
        <div className="w-full h-[calc(100vh-75px)] overflow-x-hidden overflow-y-auto z-50">
          <MantineProvider defaultColorScheme="auto">
            <ContextMenuProvider>
              <Suspense fallback={<PageLoading />}>
                <Outlet />
              </Suspense>
            </ContextMenuProvider>
          </MantineProvider>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
