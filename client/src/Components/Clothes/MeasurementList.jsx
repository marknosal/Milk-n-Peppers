import React from 'react';
import { List, ListContent, ListItem } from 'semantic-ui-react';
import "../../index.css";


export default function MeasurementList({ clothing }) {
  const propsToMap = ['inseam', 'chest', 'waist', 'hips'];
  const nonZeroVals = propsToMap
    .filter(prop => clothing[prop] !== 0)
    .map(prop => ({
      name: prop.charAt(0).toUpperCase() + prop.slice(1),
      value: clothing[prop],
    }));

  return (
    <>
      {nonZeroVals.length > 0 && (
        <List size='massive'>
          <ListItem floated='right'>
            <ListContent floated='right'>
              <strong>Measurements</strong>
            </ListContent>
          </ListItem>
        </List>
      )}

      <List size='huge'>
        {nonZeroVals.map(({ name, value }) => (
          <ListItem key={name}>
            <ListContent floated='right'>
              <strong>{name}:</strong> {value}
            </ListContent>
          </ListItem>
        ))}
      </List>
    </>
  );
}