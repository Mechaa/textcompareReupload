import { Component, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  textarea: string;
  textarea2: string;
  textarea3: string;
  //Button Press
  compare(): void {
    //start async operations that compares text areas and inject html the strings
    const start1 = callback => {
      var result = this.compareValues(this.textarea, this.textarea2);
      var stringResult = this.highlight(result, this.textarea, "areaone");
      callback(stringResult);
    };
    const start2 = callback => {
      var result = this.compareValues(this.textarea2, this.textarea);
      var stringResult = this.highlight(result, this.textarea2, "areatwo");
      callback(stringResult);
    };
    //inputs result into divs
    var inputText = document.getElementById("areaOne");
    start1(text => (inputText.innerHTML = text));
    inputText = document.getElementById("areaTwo");
    start2(text => (inputText.innerHTML = text));
  }

  ///
  /*Method for injecting HTML into strings at the error locations.
/*
*/
  highlight(errors: Array<number>, allText: string, cssClass: string): string {
    var i;
    var startarray = 0;
    var completedString = "";
    //for loop that iterate through all non connected errors.
    for (i = 0; i < errors.length; i++) {
      var currentNumber = errors[i];
      var count = 0;
      var noSpace = true;
      //finds the end of the current error
      while (noSpace) {
        count++;
        if (currentNumber + count == errors[i + 1]) {
          i++;
        } else {
          noSpace = false;
        }
      }
      //Checks if this is the last error
      if (typeof errors[i + 1] == "undefined") {
        completedString +=
          allText.substring(startarray, currentNumber) +
          "<span class = '" + cssClass + "'>" +
          allText.substring(currentNumber, errors[i] + 1) +
          "</span>" +
          allText.substring(errors[i] + 1);
      } else {
        completedString +=
          allText.substring(startarray, currentNumber) +
          "<span class = '" + cssClass + "'>" +
          allText.substring(currentNumber, errors[i] + 1) +
          "</span>" +
          allText.substring(errors[i], errors[i + 1]);
      }
    }
    //if there is no errors, just return text
    if (completedString === "") {
      return allText;
    }
    // innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
    return completedString;
  }

  //Method compares each character placement in strings.
  compareValues(value: string, value2: string): Array<number> {
    var array = Array.from(value);
    var array2 = Array.from(value2);
    var result = [];
    var i;
    for (i = 0; i < array.length; i++) {
      if (array[i] !== array2[i]) {
        result.push(i);
      }
    }
    return result;
  }
}
