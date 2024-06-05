import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import PageLoading from '@renderer/components/page-loading';
import Header from '@renderer/components/header';
import { useAppStore } from '@renderer/store';

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
      <div className="w-screen h-screen">
        <Header />
        <div className="w-full h-[calc(100vh-39px)] overflow-auto">
          <Suspense fallback={<PageLoading />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default App;
