import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  set_local_storage()
  return (
    <div className="home">
      <Link className="btn btn-white btn-big" to="/game">
        Jouer
      </Link>
      <Link className="btn btn-white btn-big" to="/stats">
        Statistiques
      </Link>
    </div>
  );
};


function set_local_storage() {
  if (localStorage.getItem("streak") === null){
    localStorage.setItem("streak", "0");
  }
  if (localStorage.getItem("tried") === null){
    localStorage.setItem("tried", "0");
  }
  if (localStorage.getItem("found") === null){
    localStorage.setItem("found", "0");
  }
  if (localStorage.getItem("word_tried") === null){
    localStorage.setItem("word_tried", "0");
  }
  if (localStorage.getItem("average") === null){
    localStorage.setItem("average", "-");
  }
}