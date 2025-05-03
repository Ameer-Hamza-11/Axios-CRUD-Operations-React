import React from 'react';
import { Crud } from './Page/Crud';

const App = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-black py-10 px-6 flex justify-center items-start">
      <div className="w-full max-w-6xl">
        <Crud />
      </div>
    </section>
  );
};

export default App;
