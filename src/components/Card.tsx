import { Component } from 'react';
import { CardProps } from '../types';

class Card extends Component<CardProps> {
  render() {
    const { item } = this.props;
    return (
      <ul>
        <li>
          <span>Name:</span>
          <span>{item.name}</span>
        </li>
        <li>
          <span>Gender:</span>
          <span>{item.gender}</span>
        </li>
        <li>
          <span>Birth year:</span>
          <span>{item.birth_year}</span>
        </li>
        <li>
          <span>Height:</span>
          <span>{item.height}cm</span>
        </li>
        <li>
          <span>Weight:</span>
          <span>{item.mass}kg</span>
        </li>
      </ul>
    );
  }
}

export default Card;
