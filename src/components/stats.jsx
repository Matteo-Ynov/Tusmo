import React from "react";

export const Stats = () => {
  return (
    <div className="stat">
      <h2>MOTS TROUVES : <span className="number">{get_local_storage("found")}</span></h2>
      <h2>SERIE ACTUELLE : <span className="number">{get_local_storage("streak")}</span></h2>
      <h2>TENTATIVES MOYENNES : <span className="number">{get_local_storage("average")}</span> ESSAIS</h2>
    </div>
  )
}

function get_local_storage(key){
  return localStorage.getItem(key)
}