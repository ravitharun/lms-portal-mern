import React, { useEffect, useState } from 'react';

function Footer() {
  const [year, setYear] = useState(null);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYear(currentYear);
  }, []);

  return (
    <footer className="bg-gray-800 text-white py-1 mt-10 fixed bottom-0 w-full h-8 mt-1">
      <div className="container mx-auto text-center max-w-screen-md px-4">
        {year ? (
          <p className="text-xs font-medium " >© {year} Global Tech University</p>
        ) : (
          <p className="text-xs font-medium">Loading Year...</p>
        )}
      </div>
    </footer>
  );
}

export default Footer;
