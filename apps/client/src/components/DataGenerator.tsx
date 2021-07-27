import React from 'react';

import Button from './Button';
import Heading from './Heading';

interface IDataGeneratorProps {
  onClick: () => void;
}

const DataGenerator = ({ onClick }: IDataGeneratorProps) => (
  <>
    <Heading text="Push the button" />
    <Button label="Generate Data" onClick={onClick} />
  </>
);

export default DataGenerator;
