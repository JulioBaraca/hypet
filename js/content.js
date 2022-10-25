// console.clear();

let contentTitle;

console.log(document.cookie);
function dynamicBrSection(ob) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";

  let boxLink = document.createElement("a");
  // boxLink.href = '#'
  boxLink.href = "../html/contentDetails.html?" + ob.id;
  // console.log('link=>' + boxLink);

  let imgTag = document.createElement("img");
  // imgTag.id = 'image1'
  // imgTag.id = ob.photos
  imgTag.src = ob.preview;

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3 = document.createElement("h3");
  let h3Text = document.createTextNode(ob.name);
  h3.appendChild(h3Text);

  let h4 = document.createElement("h4");
  let h4Text = document.createTextNode(ob.brand);
  h4.appendChild(h4Text);

  let h2 = document.createElement("h2");
  let h2Text = document.createTextNode("R$  " + ob.price);
  h2.appendChild(h2Text);

  boxDiv.appendChild(boxLink);
  boxLink.appendChild(imgTag);
  boxLink.appendChild(detailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(h4);
  detailsDiv.appendChild(h2);

  return boxDiv;
}

//  TO SHOW THE RENDERED CODE IN CONSOLE
// console.log(dynamicClothingSection());

// console.log(boxDiv)

let mainContainer = document.getElementById("mainContainer");
let containerBr = document.getElementById("containerBr");
let containerEu = document.getElementById("containerEu");
let containerPa = document.getElementById("containerPa");
let containerRe = document.getElementById("containerRe");
// mainContainer.appendChild(dynamicClothingSection('hello world!!'))

// BACKEND CALLING

let httpRequest = new XMLHttpRequest();

httpRequest.onreadystatechange = function() {
  if (this.readyState === 4) {
    if (this.status == 200) {
      // console.log('call successful');
      contentTitle = JSON.parse(this.responseText);
      if (document.cookie.indexOf(",counter=") >= 0) {
        var counter = document.cookie.split(",")[1].split("=")[1];
        document.getElementById("badge").innerHTML = counter;
      }
      for (let i = 0; i < contentTitle.length; i++) {
        if (contentTitle[i].isBr) {
          console.log(contentTitle[i]);
          containerBr.appendChild(
            dynamicBrSection(contentTitle[i])
          );
        }
        if (contentTitle[i].isEuropeu) {
          console.log(contentTitle[i]);
          containerEu.appendChild(
            dynamicBrSection(contentTitle[i])
          );
        }
        if (contentTitle[i].isPais) {
          console.log(contentTitle[i]);
          containerPa.appendChild(
            dynamicBrSection(contentTitle[i])
          );
        }
        if (contentTitle[i].isRetro) {
          console.log(contentTitle[i]);
          containerRe.appendChild(
            dynamicBrSection(contentTitle[i])
          );
        }
      }
    } else {
      console.log("call failed!");
    }
  }
};
httpRequest.open(
  "GET",
  "https://632f3f07b7314fc02f52a09f.mockapi.io/home",
  true
);
httpRequest.send();