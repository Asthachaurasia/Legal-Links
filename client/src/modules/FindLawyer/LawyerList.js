 

// export default LawyerList;
// import React from 'react';
// import LawyerCard from './LawyerCard';

// const LawyerList = ({ lawyers }) => {
//   return (
//     <div style={styles.cardContainer} className='bg-[#f6f8fb] mt-24 mx-24 shadow-inner'>
//       {lawyers.map((lawyer) => (
//         <LawyerCard key={lawyer.id} lawyer={lawyer} />
//       ))}
//     </div>
//   );
// };

// const styles = {
//   cardContainer: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'flex-start',  // Align to start of the row
//     alignItems: 'flex-start',      // Align items at the top
//     gap: '20px'                    // Add some spacing between cards
//   },
// };

// export default LawyerList;


import React from 'react';
import LawyerCard from './LawyerCard';

const LawyerList = ({ lawyers }) => {
  return (
    <div style={styles.gridContainer} className="mt-24 mx-24 shadow-inner bg-secondary rounded-lg">
      {lawyers && lawyers.length > 0 ? (
        lawyers.map((lawyer) => (
          <LawyerCard key={lawyer.id} lawyer={lawyer} />
        ))
      ) : (
        <div style={styles.fallbackContainer}>
          
          <p style={styles.noLawyersMessage}>No lawyer available</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(348px, 1fr))', // Responsive grid layout
    gap: '20px', // Spacing between items
    padding: '20px', // Padding for the grid container
    justifyItems: 'center', // Center items horizontally
  },
  fallbackContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
  },
  fallbackImage: {
    width: '150px',
    height: '150px',
    marginBottom: '10px',
  },
  noLawyersMessage: {
    fontSize: '18px',
    color: '#555',
    textAlign: 'center',
  },
};

export default LawyerList;
