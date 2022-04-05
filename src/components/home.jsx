import React from "react";
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div class="home">
      <Link class="btn btn-white btn-big" to="/game">Jouer</Link>
      <Link class="btn btn-white btn-big" to="/stats">Statistiques</Link>
    </div>
  )
}