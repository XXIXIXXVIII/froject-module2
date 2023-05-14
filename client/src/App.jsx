import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privateRouter, publicRouter } from "./router/index.jsx";
import DefaultLayout from "./layout/DefaultLayout.jsx";
import PrivateRouter1 from "./router/PrivateRouter.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRouter1 />}>
            {privateRouter.map((item, index) => {
              let Layout = item.layout || DefaultLayout;
              const Page = item.component;
              return (
                <Route
                  key={index}
                  exact
                  path={item.path}
                  element={<Layout children={<Page />} />}
                />
              );
            })}
          </Route>
          {publicRouter.map((item, index) => {
            let Layout = item.layout || DefaultLayout;
            const Page = item.component;
            return (
              <Route
                key={index}
                exact
                path={item.path}
                element={<Layout children={<Page />} />}
              />
            );
          })}
        </Routes>
      </Router>
    </>
  );
}

export default App;
