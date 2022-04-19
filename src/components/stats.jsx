import React from "react";

export const Stats = () => {
  return (
    <div class="stat">
      <h2>MOT TROUVE : <span class="number">{get_local_storage("found")}</span></h2>
      <h2>SERIE ACTUEL : <span class="number">{get_local_storage("streak")}</span></h2>
      <h2>TENTATIVES MOYENNES : <span class="number">{get_local_storage("average")}</span> MOTS</h2>
    </div>
  )
}

function get_local_storage(key){
  return localStorage.getItem(key)
}