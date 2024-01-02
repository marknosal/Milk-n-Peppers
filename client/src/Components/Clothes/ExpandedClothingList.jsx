import React from 'react';
import { List, ListContent, ListItem } from 'semantic-ui-react';
import "../../index.css";


export default function ExpandedClothingList({ clothing }) {
  const propsToMap = ['inseam', 'chest', 'waist', 'hips'];
  const nonZeroVals = propsToMap
    .filter(prop => clothing[prop] !== 0)
    .map(prop => ({
      name: prop.charAt(0).toUpperCase() + prop.slice(1),
      value: clothing[prop],
    }));

  return (
    <List size='huge'>
      {nonZeroVals.map(({ name, value }) => (
        <ListItem key={name}>
            <ListContent floated='right'>
                <strong>{name}:</strong> {value}
            </ListContent>
        </ListItem>
      ))}
    </List>
  );
}