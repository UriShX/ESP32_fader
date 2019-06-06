var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

document.getElementById("setButton").onclick = setMinMax;

function setMinMax() {
  var boxMin = document.getElementById("min");
  var boxMax = document.getElementById("max");
  var slideMin = slider.getAttribute("min");
  var slideMax = slider.getAttribute("max");
  if (parseInt(boxMin.value) >= parseInt(boxMax.value)) {
    alert("Minimum value must be set lower than maximum value!");
    boxMin.value = slideMin;
    boxMax.value = slideMax;
    return;
  }
  if (boxMin.value != slideMin) {
    if (parseInt(slider.value) < boxMin.value) {
      slider.value = boxMin.value;
      output.innerHTML = slider.value;
      //alert(slider.value + "\t" + boxMin);
    }
  slideMin = slider.setAttribute("min", boxMin.value);
  }
  if (boxMax != slideMax.value) {
    if (parseInt(slider.value) > boxMax.value) {
      slider.value = boxMax.value;
      output.innerHTML = slider.value;
      //alert(slider.value + "\t" + boxMax);
    }
    slideMax = slider.setAttribute("max", boxMax.value);
  }
};
