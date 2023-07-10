import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { store } from "./redux/store";
import MaterialManager from "./components/MaterialManager"

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MaterialManager />
      </div>
    </Provider>
  );
}

export default App;
