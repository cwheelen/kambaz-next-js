"use client"
import PassingFunctions from "./PassingFunctions";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }
  return (
    <div id="wd-passing-functions">
      <h2>Lab 4</h2>
      
      <PassingDataOnEvent />
      <ClickEvent />
      <PassingFunctions theFunction={sayHello} />
    </div>
);}
