import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss']
})
export class WelcomeScreenComponent implements OnInit {

  languageOptions : Array<string> = ["Engilsh","French","German","Italian"];
  isNotEnglish: boolean;
  
  constructor() { }

  ngOnInit() {
    this.isNotEnglish = false;
  }

  changeOption(option){
    if(option !== "English"){
      this.isNotEnglish = true;
    }
    else{
      this.isNotEnglish = false;
    }
  }



}
