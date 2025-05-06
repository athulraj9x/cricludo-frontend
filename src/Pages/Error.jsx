import React from 'react';
const BuggyComponent = () => {
  throw new Error('Test error from BuggyComponent');
};
export default BuggyComponent;