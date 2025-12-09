import React from 'react';
import MemorizationApp from './components/MemorizationApp';
import { WEEKLY_VERSE } from './constants';

const App: React.FC = () => {
  return (
    <div className="bg-purple-100 min-h-screen flex flex-col items-center py-6 px-4">
      <MemorizationApp verse={WEEKLY_VERSE} />
    </div>
  );
};

export default App;