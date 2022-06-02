import 'devextreme/dist/css/dx.material.orange.light.compact.css';
import './assets/devextreme/dx.material.votapoint.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css'
import './style.css';
import config from "devextreme/core/config";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {Toaster} from "react-hot-toast";
import AppRouter from "./routers/AppRouter";

config({
    editorStylingMode: 'outlined',
});

function App() {
  return (
    <>
        <Provider store={store}>
            <Toaster position="bottom-right" reverseOrder={false} toastOptions={{
                duration: 2000,
                style: {border: '1px solid #372a28', padding: '16px',},
                iconTheme: {primary: '#ffc61a', secondary: '#372a28',},
            }}/>
            <AppRouter/>
        </Provider>

    </>
  );
}

export default App;
